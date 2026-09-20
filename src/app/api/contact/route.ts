import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";
import { contactSchema, escapeHtml } from "@/lib/security/validation";
import { getClientIp, rateLimit } from "@/lib/security/rateLimit";

const locationEmails = {
  "Puente Alto": "dogtoralia.cl@gmail.com",
  "Santiago Centro": "dogtoraliavet@gmail.com",
};

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

    const body = await request.json();
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

    const destinationEmail =
      locationEmails[location as keyof typeof locationEmails];

    if (!destinationEmail) {
      return NextResponse.json(
        { success: false, error: "Ubicación no válida" },
        { status: 400 }
      );
    }

    const subject = `Nuevo mensaje de contacto - ${location}`;
    const text = `
            Nombre: ${name}
            Email: ${email}
            Teléfono: ${phone || "No proporcionado"}
            Ubicación: ${location}
            Mensaje: ${message}
        `;
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
      location,
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
