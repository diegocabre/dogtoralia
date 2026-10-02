import { NextResponse } from "next/server";
import { getCatalog } from "@/lib/catalog";
import { RATE_LIMITS, enforceRateLimit } from "@/lib/security/rateLimit";

export async function GET(request: Request) {
  const limited = await enforceRateLimit(request, RATE_LIMITS.products);
  if (limited) return limited;

  try {
    return NextResponse.json(await getCatalog().list());
  } catch (error) {
    console.error("API productos: no se pudo leer el catálogo", error);
    return NextResponse.json(
      { error: "No se pudieron cargar los productos" },
      { status: 500 }
    );
  }
}
