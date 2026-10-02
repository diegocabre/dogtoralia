import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { RATE_LIMITS, enforceRateLimit } from "@/lib/security/rateLimit";

export async function GET(request: Request) {
  const limited = await enforceRateLimit(request, RATE_LIMITS.products);
  if (limited) return limited;

  try {
    const filePath = path.join(process.cwd(), "src/data/products.json");
    const data = await fs.readFile(filePath, "utf-8");
    const products = JSON.parse(data);
    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: "No se pudieron cargar los productos" },
      { status: 500 }
    );
  }
}
