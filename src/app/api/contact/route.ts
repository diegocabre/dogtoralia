import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";
import { contactSchema, escapeHtml } from "@/lib/security/validation";
import { getClientIp, rateLimit } from "@/lib/security/rateLimit";
import { locationList } from "@/data/locations";

// Máximo 5 mensajes cada 10 minutos por IP
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request.headers);
    const { success: withinLimit } = rateLimit(
      `contact:${ip}`,
      RATE_LIMIT_MAX,
      RATE_LIMIT_WINDOW_MS
    );

    if (!withinLimit) {
      return NextResponse.json(
        {
          success: false,
          error: "Demasiadas solicitudes. Inténtalo de nuevo en unos minutos.",
        },
        { status: 429 }
      );
    }

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
