import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
// import { Product } from "@/types/product";

const productsData = [
  {
    id: "7702123000907",
    name: "ADVANTAGE GATO TRATAMIENTO ANTIPULGAS HASTA 4 KG",
    category: "Medicamento",
    subCategory: "Antiparasitario",
    price: 10990,
    iva: 19,
    requiresPrescription: true,
    stock: 10, // Valor por defecto, ajustar según necesidad
  },
  {
    id: "4007221042914",
    name: "ADVANTAGE GATO TRATAMIENTO ANTIPULGAS 4-8 KG",
    category: "Medicamento",
    subCategory: "Antiparasitario",
    price: 11500,
    iva: 19,
    requiresPrescription: true,
    stock: 10,
  },
  // ... Aquí irían todos los productos de tu lista
];

async function uploadProducts() {
  try {
    for (const product of productsData) {
      // Por ahora usaremos una imagen temporal
      const tempImageUrl = `/images/products/${product.id}.jpg`;

      const productData = {
        ...product,
        imageUrl: tempImageUrl,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "products"), productData);
      console.log(`Producto agregado: ${product.name}`);
    }
    console.log("Todos los productos han sido agregados exitosamente");
  } catch (error) {
    console.error("Error al subir productos:", error);
  }
}

// Ejecutar la función
uploadProducts();
