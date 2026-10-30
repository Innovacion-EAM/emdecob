/**
 * Utilidades de rutas para el despliegue.
 *
 * Next.js aplica `basePath` automáticamente a `next/link`, pero NO a las rutas
 * de `public/` usadas en `next/image`, `<video>`, `poster` o `url()` del CSS.
 * En GitHub Pages el sitio vive en `/emdecob`, así que esas rutas deben
 * prefijarse explícitamente con `asset()`.
 *
 * `NEXT_PUBLIC_BASE_PATH` se define en `next.config.ts`:
 *   - GitHub Pages  -> "/emdecob"
 *   - local / dev   -> ""
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
