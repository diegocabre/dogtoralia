import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";

const locationEmails = {
  "Puente Alto": "dogtoralia.cl@gmail.com",
  "Santiago Centro": "dogtoraliavet@gmail.com",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, location } = body;

    // Obtener el correo de destino según la ubicación
    const destinationEmail =
      locationEmails[location as keyof typeof locationEmails];

    if (!destinationEmail) {
      throw new Error("Ubicación no válida");
    }

    const subject = `Nuevo mensaje de contacto - ${location}`;
    const text = `
            Nombre: ${name}
            Email: ${email}
            Teléfono: ${phone}
            Ubicación: ${location}
            Mensaje: ${message}
        `;
    const html = `
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${phone}</p>
            <p><strong>Ubicación:</strong> ${location}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${message}</p>
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
