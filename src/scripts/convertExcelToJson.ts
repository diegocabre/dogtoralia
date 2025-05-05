import XLSX from "xlsx";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ExcelRow {
  "UPC/EAN": string;
  name: string;
  Category: string;
  "Sub-Category": string;
  " Price (incl VAT)\nStandard": string | number;
  IVA: string | number;
  Description?: string;
}

function sanitizeFileName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9_.]/g, "_")
    .replace(/_{2,}/g, "_")
    .substring(0, 63);
}

const excelPath = path.join(__dirname, "../data/medicamentos.xlsx");
const outputPath = path.join(__dirname, "../data/products.json");

const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rows = XLSX.utils.sheet_to_json(sheet) as ExcelRow[];

function cleanPrice(price: string | number): number {
  if (typeof price === "string") {
    return parseInt(price.replace(/[$ ,.]/g, ""));
  }
  return Math.round(price);
}

function cleanIva(iva: string | number): number {
  let value = 0;
  if (typeof iva === "string") {
    value = parseInt(iva.replace("%", ""));
  } else {
    value = Math.round(iva);
  }
  // Si el valor es 0, retorna 19 por defecto
  return value === 0 ? 19 : value;
}

function requiresPrescription(category: string, subCategory: string): boolean {
  if (category === "Medicamento") {
    const noReceta = ["Higiene bucal", "Suplemento"];
    return !noReceta.includes(subCategory);
  }
  return false;
}

const products = rows.map((row) => ({
  id: row["UPC/EAN"],
  name:
    (row["name"] && row["name"].replace(/[^a-zA-Z0-9_.]/g, "_")) ||
    "producto_sin_nombre",
  category: row["Category"],
  subCategory: row["Sub-Category"],
  price: cleanPrice(row[" Price (incl VAT)\nStandard"]),
  iva: cleanIva(row["IVA"]),
  requiresPrescription: requiresPrescription(
    row["Category"],
    row["Sub-Category"]
  ),
  stock: 10,
  imageUrl: `/images/products/${sanitizeFileName(row["Category"])}/${
    row["UPC/EAN"]
  }.jpg`,
  description: row["Description"] || "",
  scopes: [],
  apiResources: [],
  proxies: [],
}));

fs.writeFileSync(outputPath, JSON.stringify(products, null, 2), "utf-8");
console.log("¡Archivo products.json generado con éxito!");
