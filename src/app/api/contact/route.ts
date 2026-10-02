import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";
import { contactSchema, escapeHtml } from "@/lib/security/validation";
import { RATE_LIMITS, enforceRateLimit } from "@/lib/security/rateLimit";
import { locationList } from "@/data/locations";

export async function POST(request: Request) {
  try {
    // Máximo 5 mensajes cada 10 minutos por IP
    const limited = await enforceRateLimit(request, RATE_LIMITS.contact);
    if (limited) return limited;

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Datos inválidos" },
        { status: 400 }
      );
    }
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Datos inválidos",
        },
        { status: 400 }
      );
    }

    const { name, email, phone, message, location } = parsed.data;

    const destinationEmail = locationList.find(
      (l) => l.name === location
    )?.email;

    if (!destinationEmail) {
      return NextResponse.json(
        { success: false, error: "Ubicación no válida" },
        { status: 400 }
      );
    }

    const subject = `Nuevo mensaje de contacto - ${location}`;
    const text = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Teléfono: ${phone || "No proporcionado"}`,
      `Ubicación: ${location}`,
      `Mensaje: ${message}`,
    ].join("\n");
    const html = `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Teléfono:</strong> ${escapeHtml(phone || "No proporcionado")}</p>
      <p><strong>Ubicación:</strong> ${escapeHtml(location)}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `;

    const result = await sendEmail({
      to: destinationEmail,
      subject,
      text,
      html,
      replyTo: email,
    });

    if (!result.success) {
      throw new Error("Error al enviar el correo");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en el endpoint de contacto:", error);
    return NextResponse.json(
      { success: false, error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
