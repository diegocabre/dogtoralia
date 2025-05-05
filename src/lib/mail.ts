import nodemailer from "nodemailer";

const getTransporter = (location: string) => {
  const isPuenteAlto = location === "Puente Alto";
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: isPuenteAlto
        ? process.env.EMAIL_USER_PUENTE_ALTO
        : process.env.EMAIL_USER_CENTRO,
      pass: isPuenteAlto
        ? process.env.EMAIL_PASSWORD_PUENTE_ALTO
        : process.env.EMAIL_PASSWORD_CENTRO,
    },
  });
};

export async function sendEmail({
  to,
  subject,
  text,
  html,
  location,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
  location: string;
}) {
  try {
    const transporter = getTransporter(location);
    const info = await transporter.sendMail({
      from:
        location === "Puente Alto"
          ? process.env.EMAIL_USER_PUENTE_ALTO
          : process.env.EMAIL_USER_CENTRO,
      to,
      subject,
      text,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}
