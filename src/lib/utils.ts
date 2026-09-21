export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function cleanAndCapitalize(name: string): string {
  return name
    .replace(/[_-]+/g, " ") // Reemplaza guiones bajos y medios por espacio
    .replace(/[^a-zA-Z0-9. ]/g, "") // Elimina otros caracteres especiales excepto el punto
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase()) // Capitaliza cada palabra
    .trim();
}
