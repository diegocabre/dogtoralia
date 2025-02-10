import { PrismaClient, Age, Size, Status } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Poblando la base de datos con productos de prueba...");

  // ✅ Crear Categorías
  const category = await prisma.category.create({
    data: { name: "Alimentos" },
  });

  // ✅ Insertar Productos con `age` y `size`
  await prisma.product.createMany({
    data: [
      {
        name: "Alimento Premium para Perros",
        description: "Alimento de alta calidad para todas las razas.",
        price: 29.99,
        categoryId: category.id,
        status: Status.CONFIRMED,
        age: Age.ADULT, // 🔹 Agregar Edad
        size: Size.MEDIUM, // 🔹 Agregar Tamaño
      },
      {
        name: "Alimento Orgánico para Gatos",
        description: "Alimento saludable y natural para gatos.",
        price: 19.99,
        categoryId: category.id,
        status: Status.CONFIRMED,
        age: Age.PUPPY, // 🔹 Agregar Edad
        size: Size.SMALL, // 🔹 Agregar Tamaño
      },
    ],
  });

  console.log("✅ Datos de prueba insertados correctamente.");
}

main()
  .catch((e) => {
    console.error("❌ Error poblando la base de datos:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
