import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cleanAndCapitalize } from '@/lib/utils';
import { getCatalog, type Product } from '@/lib/catalog';
import { pageMetadata, graph, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import ProductClient from './ProductClient';

// Imagen genérica que se usa cuando un producto aún no tiene foto propia;
// como imagen para compartir es peor que la imagen de marca.
const PLACEHOLDER_IMAGE = '/images/products/medicamento/standar.jpg';

async function findProduct(rawId: string): Promise<Product | null> {
  try {
    return await getCatalog().getById(decodeURIComponent(rawId));
  } catch (error) {
    console.error('Error loading products:', error);
    return null;
  }
}

// Recorta la descripción a un largo razonable para el resultado de búsqueda,
// sin cortar palabras a la mitad.
function summarize(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

// Se generan todas las fichas al compilar (el catálogo es un archivo local);
// un id inexistente sigue respondiendo 404.
export async function generateStaticParams() {
  try {
    return (await getCatalog().list()).map((p) => ({ id: p.id }));
  } catch {
    return [];
  }
}

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await findProduct(id);
  if (!product) return { title: 'Producto no encontrado', robots: { index: false } };

  const name = cleanAndCapitalize(product.name);
  const description = product.description
    ? summarize(product.description)
    : `${name}: producto veterinario disponible en Dogtoralia Vet. Consulta disponibilidad por WhatsApp.`;
  const hasOwnImage = product.imageUrl && product.imageUrl !== PLACEHOLDER_IMAGE;

  return pageMetadata({
    title: name,
    description,
    path: `/product/${product.id}`,
    keywords: [name, product.subCategory, product.category, 'Dogtoralia Vet'].filter(Boolean),
    image: hasOwnImage ? { url: product.imageUrl, alt: name } : undefined, // sin foto propia: imagen de marca
  });
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  // notFound() lanza una excepción especial de Next.js, así que se llama
  // fuera de cualquier try/catch para que no se registre como error.
  const product = await findProduct(id);

  if (!product) return notFound();

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbJsonLd([
            { name: 'Inicio', path: '/home' },
            { name: 'Tienda', path: '/store' },
            { name: cleanAndCapitalize(product.name), path: `/product/${product.id}` },
          ])
        )}
      />
      <ProductClient
        product={{
          id: product.id,
          name: product.name,
          imageUrl: product.imageUrl || '',
          description: product.description || '',
        }}
      />
    </>
  );
}
