import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "";

    console.log("📌 Categoría recibida:", category);

    const products = await prisma.product.findMany({
      where: {
        category: {
          name: category,
        },
      },
      include: {
        category: true,
        images: true,
      },
    });

    console.log("✅ Productos obtenidos:", products.length);

    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Error en API /api/products:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
