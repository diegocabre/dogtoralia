import { NextResponse } from "next/server";

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const USER_ID = process.env.INSTAGRAM_USER_ID;

const INSTAGRAM_API_URL = `https://graph.instagram.com/${USER_ID}/media?fields=id,media_type,media_url,permalink,thumbnail_url&access_token=${ACCESS_TOKEN}`;

export async function GET() {
  if (!ACCESS_TOKEN || !USER_ID) {
    return NextResponse.json({ error: "Faltan credenciales en .env" }, { status: 500 });
  }

  try {
    const response = await fetch(INSTAGRAM_API_URL);
    const data = await response.json();

    if (!data || !data.data) {
      return NextResponse.json({ error: "No se encontraron publicaciones" }, { status: 500 });
    }

    // 🔹 Filtrar solo imágenes y carruseles (excluir videos)
    const mediaItems = data.data
      .filter((item: any) => item.media_type === "IMAGE" || item.media_type === "CAROUSEL_ALBUM") // 🔹 Excluir videos
      .slice(0, 10) // 🔹 Solo los 10 últimos posts
      .map((item: any) => ({
        id: item.id,
        type: item.media_type,
        url: item.media_url,
        thumbnail: item.thumbnail_url || item.media_url,
        link: item.permalink,
      }));

    return NextResponse.json(mediaItems);
  } catch (error) {
    console.error("Error al obtener medios de Instagram:", error);
    return NextResponse.json({ error: "Error al obtener medios de Instagram" }, { status: 500 });
  }
}

