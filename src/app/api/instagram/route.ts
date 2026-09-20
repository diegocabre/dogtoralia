import { NextResponse } from "next/server";

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  media_type?: string;
}

interface InstagramResponse {
  data: InstagramPost[];
  error?: {
    message: string;
    type: string;
    code: number;
  };
}

/**
 * Antes, el navegador del visitante llamaba directo a la API de
 * Instagram con el token en la URL (NEXT_PUBLIC_...), lo que dejaba el
 * token visible para cualquiera que abriera las herramientas de
 * desarrollador. Ahora el navegador llama a esta ruta interna, y es el
 * servidor el que usa el token — nunca sale al cliente.
 *
 * Nota: el token de Instagram debe renovarse periódicamente (los
 * de "larga duración" duran ~60 días y hay que refrescarlos antes de
 * que expiren). Ver SEGURIDAD.md para más detalle.
 */
export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json(
      { data: [], error: "not_configured" },
      { status: 200 }
    );
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_url,permalink,caption,media_type&access_token=${token}`,
      { next: { revalidate: 3600 } } // cachea 1 hora, no golpea la API en cada visita
    );

    const data: InstagramResponse = await response.json();

    if (!response.ok || data.error) {
      console.error("Instagram API error:", data.error?.message);
      return NextResponse.json(
        { data: [], error: "token_expired" },
        { status: 200 }
      );
    }

    const imagePosts = (data.data || []).filter(
      (post) => post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM"
    );

    return NextResponse.json({ data: imagePosts });
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    return NextResponse.json(
      { data: [], error: "fetch_failed" },
      { status: 200 }
    );
  }
}
