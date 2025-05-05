export interface Product {
  id: string; // UPC/EAN code
  externalId?: string; // External ID if exists
  name: string; // Product name
  category: string; // Main category (Medicamento, Shampoos, etc.)
  subCategory: string; // Sub-category (Antiparasitario, Antibiótico, etc.)
  price: number; // Price in CLP
  iva: number; // IVA percentage
  imageUrl: string; // URL to product image
  stock: number; // Stock quantity
  description?: string; // Additional product description
  requiresPrescription: boolean; // If it requires prescription
}

export type ProductCategory = "Medicamento" | "Shampoos";
export type MedicineSubCategory =
  | "Antiparasitario"
  | "Antibiótico"
  | "Suplemento"
  | "Analgésico-Antiinflamatorio"
  | "Protector hepático"
  | "Antiemético"
  | "Homeopático"
  | "Solución ótica"
  | "Higiene bucal";

export type ShampooSubCategory =
  | "Shampoo medicado"
  | "Shampoo"
  | "Shampoo seco";
