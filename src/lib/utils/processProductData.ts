interface RawProduct {
  "UPC/EAN": string;
  "External ID": string;
  Category: string;
  "Sub-Category": string;
  "Product Name (+ brand + size / weight)": string;
  "Price (incl VAT)": string;
  IVA: string;
}

export function processPrice(priceStr: string): number {
  // Remove currency symbol, spaces, and dots, then replace comma with dot
  return parseInt(priceStr.replace(/[$ ,.]/g, ""));
}

export function processIVA(ivaStr: string): number {
  return parseInt(ivaStr.replace("%", ""));
}

export function determineRequiresPrescription(
  category: string,
  subCategory: string
): boolean {
  // Los medicamentos generalmente requieren receta, excepto algunos casos específicos
  if (category === "Medicamento") {
    const noRecetaSubCategories = ["Higiene bucal", "Suplemento"];
    return !noRecetaSubCategories.includes(subCategory);
  }
  return false;
}

export function processRawProduct(rawProduct: RawProduct) {
  return {
    id: rawProduct["UPC/EAN"],
    externalId: rawProduct["External ID"] || undefined,
    name: rawProduct["Product Name (+ brand + size / weight)"],
    category: rawProduct["Category"],
    subCategory: rawProduct["Sub-Category"],
    price: processPrice(rawProduct["Price (incl VAT)"]),
    iva: processIVA(rawProduct["IVA"]),
    requiresPrescription: determineRequiresPrescription(
      rawProduct["Category"],
      rawProduct["Sub-Category"]
    ),
    stock: 10, // Valor por defecto
    imageUrl: "", // Se actualizará cuando se suba la imagen
  };
}
