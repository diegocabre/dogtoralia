/**
 * Verifica en Cloudflare el token que el widget Turnstile entregó al
 * navegador. El token es de un solo uso y expira a los 5 minutos.
 */
export async function verifyTurnstile(token: unknown, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // En desarrollo el cliente usa la clave de prueba de Cloudflare; en producción sin clave se rechaza
    if (process.env.NODE_ENV !== "production") return true;
    console.error("Falta TURNSTILE_SECRET_KEY: se rechazan los envíos del formulario");
    return false;
  }
  if (typeof token !== "string" || token === "" || token.length > 2048) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip !== "unknown") body.set("remoteip", ip);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(5000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (error) {
    console.error("No se pudo verificar Turnstile:", error);
    return false;
  }
}
