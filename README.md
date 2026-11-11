# David López Félix · Portafolio

Portafolio cinematográfico estático realizado con Astro, TypeScript y CSS. Diseño en azul noche, marfil y naranja, con Manrope e Instrument Serif autoalojadas.

Sitio público en https://valenfelix.github.io/david-lopez-felix-portfolio/.

## Desarrollo

Requiere Node.js 24 o posterior.

```sh
npm ci
npm run dev
npm run check
npm test
npm run build
npm run preview
```

El servidor muestra la dirección local con la base `/david-lopez-felix-portfolio/`. Para desarrollar o compilar en la raíz de un dominio, establece `SITE_BASE=/` en el entorno. Actualiza también `site` en `astro.config.mjs` si cambia el dominio.

## Contenido

`src/data/portfolio.ts` contiene el perfil, contacto y las obras. Los datos desconocidos se representan con `null`. Los cinco títulos provenientes de nombres de archivo se identifican como títulos de trabajo. «Pieza audiovisual» es una descripción de una pieza cuyo título sigue pendiente, con duración observada de aproximadamente 55 segundos. El orden editorial y la obra destacada se editan en este archivo.

El contacto permanece oculto mientras `email` sea `null` y `socialLinks` esté vacío. Al completar esos campos aparecen la sección y su enlace en la navegación.

La fotografía de David se ha convertido a WebP con redimensionado tradicional, sin reconstrucción generativa, retoque facial ni modificación del color. Las tres versiones conservan la composición completa. Los fotogramas de la pieza audiovisual proceden del material suministrado, a los 3, 26 y 40 segundos.

## Vídeos

La versión inicial incluye fichas y fotogramas. **La reproducción pública está pendiente de enlaces autorizados.** Los archivos de origen requieren autenticación. Sus inventarios, identificadores y enlaces privados se mantienen fuera del repositorio.

Para activar una película, añade al campo `video` de la obra el proveedor y su identificador público. Los proveedores implementados son `youtube`, `vimeo` y, como puente para archivos comprobados públicamente, `drive`.

```ts
video: { provider: 'youtube', id: 'IDENTIFICADOR_REAL' }
```

Verifica el enlace sin iniciar sesión antes de publicarlo. Los vídeos no listados de YouTube son accesibles para quien tenga el enlace. El adaptador de Vimeo admite vídeos con URL numérica pública; si se utiliza un vídeo no listado con hash, hay que añadir soporte para ese parámetro antes de activarlo.

El reproductor se crea únicamente al pulsar «Ver película», en un diálogo con cierre y pantalla completa. Cerrar elimina el iframe y restituye el foco. No se realiza precarga del proveedor. El evento de carga del iframe no demuestra que la película se reproduzca.

Los originales de vídeo se conservan fuera del proyecto. `.gitignore` excluye vídeos, audios, inventarios privados y materiales de producción. No se utiliza Git LFS.

## Imágenes

Los derivados web están en `public/images/`. Para añadir fotogramas a otra obra, exporta versiones WebP de calidad visual alta, utiliza el campo `poster` y describe su contenido mediante `posterAlt`. La interfaz permite el recorte de tarjetas; el reproductor conserva el encuadre proporcionado por el proveedor.

## Publicación

En GitHub, el repositorio usa **Settings → Pages → GitHub Actions**. El workflow `Publish portfolio` ejecuta instalación reproducible, comprobación de tipos, pruebas y build, y despliega el resultado en Pages. Se inicia manualmente desde **Actions → Publish portfolio → Run workflow**. Los cambios de código requieren otra ejecución del workflow para publicarse.

Las fichas generan directorios HTML reales, por lo que se pueden abrir o recargar directamente. El sitio incluye canonical, Open Graph, sitemap y página 404. Todas las rutas usan la base configurada.

## Pendientes editoriales

- Enlaces públicos de reproducción de las seis piezas.
- Confirmación de títulos, créditos y años de producción.
- Correo y redes de contacto.
- Fotogramas de las cinco obras que todavía carecen de imagen.
- Confirmación de la pieza destacada y del orden del archivo.

Las licencias OFL y procedencia de las fuentes se encuentran en `public/fonts/`. Los materiales audiovisuales permanecen sujetos a los derechos de sus respectivos titulares.
