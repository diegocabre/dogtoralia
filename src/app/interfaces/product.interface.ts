// 📌 interface/product.interface.ts

export type Weigh = '7kg' | '15kg' | '20kg';
export type Age = 'PUPPY' | 'ADULT' | 'SENIOR';
export type Size = 'XSMALL' | 'SMALL' | 'MEDIUM' | 'LARGE';
export type Status = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export interface ProductImage {
  url: string;
  altText?: string;
}

export interface Product {
    // id: string;
  slug: string;
  name: string;
  weight?: Weigh[] | null;
  description: string;
  age: Age;
  size: Size;
  price: number;
  quantity?: number;
  images: ProductImage[];
  category: 'MEDICAMENTOS' | 'ACCESORIOS' | 'ALIMENTOS';
  status: Status;
}

export interface Category {
  name: 'MEDICAMENTOS' | 'ACCESORIOS' | 'ALIMENTOS';
  products: Product[];
}
