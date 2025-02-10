interface SeedProduct {
  //todo: id: string
    name: string;
    description: string;
    age: 'PUPPY' | 'ADULT' | 'SENIOR';
    weight?: string[];
    size: 'XSMALL' | 'SMALL' | 'MEDIUM' | 'LARGE';
    price: number;
    quantity?: number;
    images: SeedProductImage[];
    category: 'MEDICAMENTOS' | 'ACCESORIOS' | 'ALIMENTOS';
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  }
  
  interface SeedProductImage {
    url: string;
    altText?: string;
  }
  
  interface SeedCategory {
    name: 'MEDICAMENTOS' | 'ACCESORIOS' | 'ALIMENTOS';
    products: SeedProduct[];
  }
  
  export const seedData: SeedCategory[] = [
    {
      name: 'MEDICAMENTOS',
      products: [
        {
          name: "Antiparasitario Canino",
          description: "Medicamento para desparasitar perros de todas las edades.",
          age: 'PUPPY',
          size: 'SMALL',
          price: 25.99,
          status: 'CONFIRMED',
          category: 'MEDICAMENTOS',
          quantity: 10,
          images: [
            { url: "1cee6-spray-dental-oxyfresh.jpeg", altText: "Antiparasitario para perros" },
            { url: "dopiral-suspension600x6002096.jpg", altText: "Caja del antiparasitario" },
          ],
        },
        {
          name: "Antibiótico para Gatos",
          description: "Antibiótico especializado para infecciones en gatos adultos.",
          age: 'ADULT',
          size: 'MEDIUM',
          price: 30.50,
          status: 'CONFIRMED',
          category: 'MEDICAMENTOS',
          quantity: 20,
          images: [
            { url: "dopiral-suspension600x6002096.jpg", altText: "Antibiótico en caja" },
            { url: "1cee6-spray-dental-oxyfresh.jpeg", altText: "Blister de pastillas" },
          ],
        },
      ],
    },
    {
      name: 'ACCESORIOS',
      products: [
        {
          name: "Collar Reflectante",
          description: "Collar de seguridad para perros y gatos con material reflectante.",
          age: 'ADULT',
          size: 'MEDIUM',
          price: 15.50,
          status: 'CONFIRMED',
          category: 'ACCESORIOS',
          quantity: 5,
          images: [
            { url: "Drontal puppy.jpg", altText: "Collar reflectante" },
            { url: "Drontal puppy.jpg", altText: "Collar en uso" },
          ],
        },
        {
          name: "Juguete Mordedor",
          description: "Juguete resistente ideal para perros cachorros en crecimiento.",
          age: 'PUPPY',
          size: 'LARGE',
          price: 12.99,
          status: 'CONFIRMED',
          category: 'ACCESORIOS',
          quantity: 15,
          images: [
            { url: "Ehliprofeno_600px.png", altText: "Juguete mordedor de goma" },
            { url: "Ehliprofeno_600px.png", altText: "Juguete en forma de hueso" },
          ],
        },
      ],
    },
    {
      name: 'ALIMENTOS',
      products: [
        {
          name: "Alimento Premium para Gatos",
          description: "Alimento balanceado para gatos adultos con ingredientes naturales.",
          age: 'ADULT',
          size: 'LARGE',
          weight: ['7kg', '15kg', '20kg'],
          price: 40.00,
          status: 'CONFIRMED',
          category: 'ALIMENTOS',
          quantity: 10,
          images: [
            { url: "EHLIQUANTEL_FORTE_1_COMPRIMIDO.png", altText: "Bolsa de alimento para gatos" },
            { url: "EHLIQUANTEL_FORTE_1_COMPRIMIDO.png", altText: "Comida servida en plato" },
          ],
        },
        {
          name: "Alimento Húmedo para Perros",
          description: "Lata de alimento húmedo con carne y vegetales para perros adultos.",
          age: 'ADULT',
          size: 'MEDIUM',
          price: 18.75,
          status: 'CONFIRMED',
          category: 'ALIMENTOS',
          quantity: 5,
          images: [
            { url: "Endogard 600x600 px.png", altText: "Lata de comida para perros" },
            { url: "Endogard 600x600 px.png", altText: "Comida servida en plato" },
          ],
        },
      ],
    },
  ];
  