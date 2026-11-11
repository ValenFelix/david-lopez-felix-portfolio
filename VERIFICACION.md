# Verificación del rework cinematográfico

Revisión del 11 de noviembre de 2026. Se abrió el sitio oficial antes de modificarlo y las cuatro referencias en navegador. Se tomaron y abrieron capturas durante las iteraciones, no solo al terminar. Los informes antiguos de Lighthouse no se reutilizan.

## Ciclos de revisión

La primera publicación del rework corresponde a `a099863129813b510c6a3984f73e1b5a4a010aef`, workflow `43056668692`, terminado correctamente. Se revisaron visualmente Inicio, Obra, Perfil, Contacto y Azul en la URL oficial a 1440 y 390 px. Todos respondieron 200, con imágenes cargadas y sin desbordamiento ni errores de JavaScript.

La siguiente iteración corrige un plano del hero que cortaba parte de una cara en móvil mediante un montaje vertical con encuadres propios. También corrige la solicitud de pantalla completa: el navegador rechazaba el elemento dialog como destino; ahora utiliza la raíz del documento. Las pruebas requieren comprobar fullscreenElement real. El nombre accesible del monograma incluye su texto visible DLF.

## Pruebas locales completadas

- `npm run check`: 18 archivos, cero errores/advertencias/hints.
- `npm test`: 2/2 pruebas existentes aprobadas.
- `npm run build`: 11 páginas estáticas, más sitemap. Artefacto medido: 353 438 120 bytes; ningún archivo alcanza 90 MiB.
- 25 combinaciones de cinco páginas y anchos 320, 390, 768, 1440 y 1920 px: sin desbordamientos horizontales.
- Axe WCAG 2/2.1 A/AA: cero infracciones detectadas en cinco rutas a 390 y 1440 px.
- Navegación, rutas directas, recarga, atrás/adelante, menú móvil con Escape/foco, apertura omitible y una vez por sesión.
- Movimiento reducido, navegación móvil sin JS, error de vídeo, autoplay rechazado y salida del loader con imágenes retrasadas cuatro segundos.
- Hero y preview enfocado se pausan fuera de pantalla; un único preview activo; sin descarga de previews con movimiento reducido.
- Las cinco películas MP4 reproducen y avanzan realmente; búsqueda, pausa, volumen, fullscreen, cierre y restitución de foco comprobados. Duraciones completas medidas.
- Doble completo: HLS nativo y hls.js comprobados al inicio, 15:20 y 30:20; duración 30:41. Ninguna solicitud antes del clic; solo 3–4 segmentos iniciales de 307. Cierre sin peticiones posteriores ni reproductor residual.
- HLS: manifiesto inválido, plataforma incompatible e importación interrumpida muestran alternativa honesta o cancelan la carga correctamente.
- Decodificación integral de Doble (vídeo y audio) sin errores; todas las referencias del manifiesto existen, VOD/ENDLIST presentes, sin segmentos huérfanos.

Lighthouse móvil nuevo contra el build local: rendimiento 97, accesibilidad 100, buenas prácticas 100 y SEO 100. FCP 1,7 s, LCP 2,5 s, TBT 0 ms, CLS 0,001. Incluye 887 KiB de transferencia registrada. Es una medición de laboratorio, no una garantía sobre cualquier conexión.

## Alcance y evidencias

Chrome 157 en Windows, con viewports emulados: no dispositivos físicos ni Safari/iOS. Se comprobó avance y búsqueda real de los vídeos; no se afirma haber visto íntegramente todas las películas en navegador. La decodificación integral y el muestreo de escenas son verificaciones diferentes. La foto real conserva composición e identidad, sin IA generativa.

Capturas, informes y grabaciones están en `qa-local/`, excluido de Git. Entre ellos: `rework/iteration-public-1/`, `rework/functional-iteration-3/functional-report.json`, `hls-complete/report.json`, `hls-player/report.json` y `rework/lighthouse-final/`. Los tamaños y estados editoriales se detallan en `MEDIOS.md`.

La comprobación pública de la segunda iteración y su grabación final se añadirán tras completar el nuevo despliegue. No se confunde la prueba local con la verificación en producción.
