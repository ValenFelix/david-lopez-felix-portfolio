# David López Félix · Sala azul / luz ámbar

Portafolio cinematográfico estático con Astro y TypeScript. Inicio, Obra, Perfil, Contacto y seis fichas generan HTML independiente bajo `/david-lopez-felix-portfolio/`.

Sitio: https://valenfelix.github.io/david-lopez-felix-portfolio/

## Desarrollo

Requiere Node.js 24 o posterior. Ejecuta `npm ci`, `npm run dev`, `npm run check`, `npm test`, `npm run build` y `npm run preview`.

La base se configura en `astro.config.mjs`. `SITE_BASE=/` permite otra raíz, pero el despliegue oficial mantiene el prefijo del repositorio. Todas las rutas pasan por `localPath`.

## Dirección y contenido

Bodoni Moda y Manrope autoalojadas; azul tinta, marfil y acentos naranja. La portada utiliza un montaje silencioso de doce segundos a partir de películas suministradas. La selección editorial de tres obras es independiente del orden de los originales. Obra contiene seis portadas auténticas distintas. La apertura se puede omitir y respeta movimiento reducido. La navegación funciona sin JavaScript.

`src/data/portfolio.ts` centraliza títulos, estado editorial, duración, créditos comprobados, imágenes, reproductores y contacto. No se publican biografías ni créditos inventados. Solo se conoce que David es estudiante de cine. Los títulos pendientes llevan una nota editorial en su ficha. Los roles publicados se comprobaron en créditos de los originales; los años y sinopsis desconocidos permanecen vacíos.

La fotografía real conserva identidad y composición. Se redimensionó y comprimió a WebP sin IA generativa ni retoque facial. Los fotogramas conservan el color del material suministrado.

## Contacto

Instagram activo: https://www.instagram.com/david.lf12/ . El correo `david@contacto.com` se muestra como provisional, sin enlace de envío. Para sustituirlo, cambia `profile.email` en `src/data/portfolio.ts` y, una vez confirmado que recibe mensajes, establece `emailProvisional: false`; el componente activa `mailto:` en Perfil, Contacto y el pie.

## Medios

Los originales están fuera del repositorio y no se modifican. Se permiten únicamente derivados web en `public/media/`, sin Git LFS. Los manifiestos públicos contienen rutas relativas, tamaños, duraciones y procedencia temporal de fotogramas, sin rutas locales privadas, cookies ni inventarios de Drive.

Esta primera iteración incluye cinco películas MP4 completas (Azul, Comezón, Mujer muñeca, Tallas y la pieza audiovisual) y un fragmento de treinta segundos de Doble. El botón de Doble indica «Ver fragmento». La película completa de Doble está en preparación, todavía no activada en esta iteración.

Los MP4 usan H.264, AAC, píxeles compatibles y faststart; conservan proporción y cadencia. Las películas no se solicitan hasta pulsar reproducir. Solo se activa un preview decorativo a la vez. Hero y previews no tienen audio; se pausan fuera de pantalla o con la pestaña oculta. El reproductor nativo admite pausa, búsqueda, volumen y pantalla completa, y libera el medio al cerrar.

El modelo también admite fuentes públicas de YouTube, Vimeo o Drive, y HLS local con carga diferida de hls.js. La fuente externa debe comprobarse sin iniciar sesión antes de activarla. No se inventan enlaces. Un fallo muestra una alternativa claramente identificada, no una reproducción supuestamente verificada.

## Publicación

Settings → Pages → GitHub Actions. El workflow `Publish portfolio` se ejecuta manualmente desde Actions. Realiza `npm ci`, comprobaciones, pruebas, build y despliegue. Un push por sí solo no publica. Verifica el SHA del run y vuelve a abrir la URL oficial después de cada despliegue.

GitHub Pages limita el sitio a 1 GB y aplica un límite flexible de transferencia de 100 GB/mes; los archivos Git normales deben ser menores de 100 MiB. Se adopta margen inferior a 90 MiB por archivo. Consulta los límites actuales: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits . Este portafolio no usa Git LFS. Ante crecimiento de tráfico, migra las fuentes completas a alojamiento audiovisual externo.

## Revisión

`VERIFICACION.md` registra qué se ha comprobado realmente. Las capturas y los informes completos se conservan en `qa-local/`, excluido de Git. Las licencias de fuentes están en `public/fonts/`. Los materiales audiovisuales mantienen los derechos de sus titulares.
