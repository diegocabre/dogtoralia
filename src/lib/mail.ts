import { Resend } from "resend";

/**
 * Envío de correo con Resend en vez de Gmail + nodemailer.
 *
 * Ventajas frente al método anterior (contraseñas de aplicación de Gmail):
 * - No depende de contraseñas de Gmail que hay que rotar manualmente.
 * - Mejor entregabilidad (menos probabilidad de caer en spam) al enviar
 *   desde tu propio dominio verificado (dogtoraliavet.cl) en vez de
 *   relaying a través de una cuenta personal de Gmail.
 * - Panel con historial de envíos y estado de entrega.
 *
 * Requiere la variable de entorno RESEND_API_KEY (se agrega en .env y en
 * Vercel → Settings → Environment Variables) y, opcionalmente,
 * CONTACT_FROM_EMAIL con un remitente de tu dominio ya verificado en
 * Resend (por ejemplo notificaciones@dogtoraliavet.cl). Si no se define,
 * se usa un remitente de respaldo.
 */

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const DEFAULT_FROM = "Dogtoralia <notificaciones@dogtoraliavet.cl>";

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
  /** Se mantiene por compatibilidad con quien llama esta función; ya no
   * se usa para elegir la cuenta de Gmail (eso era el comportamiento
   * anterior), pero no se elimina el parámetro para no romper llamadas
   * existentes. */
  location?: string;
}) {
  if (!resend) {
    console.error(
      "RESEND_API_KEY no está configurada. No se puede enviar el correo."
    );
    return {
      success: false,
      error: "Servicio de correo no configurado (falta RESEND_API_KEY)",
    };
  }

  try {
    const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Error de Resend al enviar correo:", error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}
