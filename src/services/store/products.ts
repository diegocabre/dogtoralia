import { db } from "@/lib/firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  Query,
  CollectionReference,
} from "firebase/firestore";
import { Product } from "@/types/product";

const PRODUCTS_COLLECTION = "products";

export async function addProduct(
  product: Omit<Product, "id">
): Promise<string> {
  try {
    // Add product to Firestore
    const productData = {
      ...product,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(
      collection(db, PRODUCTS_COLLECTION),
      productData
    );
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

export async function getProducts(category?: string): Promise<Product[]> {
  try {
    let q: Query | CollectionReference = collection(db, PRODUCTS_COLLECTION);

    if (category && category !== "all") {
      q = query(
        collection(db, PRODUCTS_COLLECTION),
        where("category", "==", category)
      );
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Product)
    );
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
}

export async function searchProducts(searchTerm: string): Promise<Product[]> {
  try {
    const products = await getProducts();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
}

export async function updateProduct(
  productId: string,
  updates: Partial<Product>
): Promise<void> {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    await updateDoc(productRef, updates);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function deleteProduct(productId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

// Función auxiliar para generar la ruta de la imagen local
export function getProductImagePath(
  productId: string,
  category: string
): string {
  return `/images/products/${category.toLowerCase()}/${productId}.jpg`;
}
