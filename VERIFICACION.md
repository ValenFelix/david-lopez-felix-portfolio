# Verificación del rework cinematográfico

Revisión del 11 de noviembre de 2026. La auditoría pública completa descrita aquí corresponde a `541fb46f1b7df8e11011d245de045a6d55f0b686`, publicado mediante el workflow [43058966091](https://github.com/ValenFelix/david-lopez-felix-portfolio/actions/runs/43058966091), terminado correctamente. URL examinada sin iniciar sesión: https://valenfelix.github.io/david-lopez-felix-portfolio/ .

## Revisión visual e iteraciones

Antes de modificar código se abrió la versión publicada y las cuatro referencias indicadas: Ligthelm, Bourdin, Pons Jewell y Haycock. Se observaron principios de jerarquía, protagonismo de imagen y separación de archivo/perfil; no se incorporaron materiales de esas webs ni se afirma haber probado sus reproductores.

Se hicieron ciclos locales y públicos de implementación, captura, inspección y corrección. La primera publicación (`a099863`, run `43056668692`) se abrió en las cinco vistas principales a 1440 y 390 px. La revisión detectó un plano del hero que recortaba parcialmente una cara en móvil: se sustituyó por un montaje vertical con encuadres propios, revisado en los cuatro planos. También se corrigió el botón de pantalla completa, cuyo destino dialog era rechazado por Chrome.

La segunda publicación se revisó de nuevo: Inicio, Obra, Perfil, Contacto y Azul a 1440 y 390 px, abriendo las capturas reales. La portada, tipografía, imágenes distintas, galería asimétrica, retrato independiente y contacto cargan correctamente. No hay errores de assets ni desbordamientos en esas capturas. Se conserva la fotografía real sin modificar su identidad ni composición.

El ajuste de cierre desactiva explícitamente las transiciones nativas entre documentos con movimiento reducido. La prueba real del build comprueba `pagereveal.viewTransition`: presente con preferencia normal, ausente con reduce; la animación calculada pasa de `page-in` a `none`. El diseño normal y los medios permanecen iguales a los auditados.

## Pruebas y reproducción

| Comprobación                             | Resultado                                                                                                 |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `npm run check`                          | 18 archivos, cero errores, advertencias o hints                                                           |
| `npm test`                               | 2/2 pruebas existentes aprobadas                                                                          |
| `npm run build`                          | 11 páginas estáticas más sitemap                                                                          |
| 10 rutas × 320, 390, 768, 1440 y 1920 px | 50 combinaciones sin overflow horizontal                                                                  |
| Axe WCAG 2/2.1 A/AA                      | 20 evaluaciones, cero infracciones detectadas                                                             |
| Rutas profundas, recarga, atrás/adelante | Correctas bajo la base del repositorio                                                                    |
| Menú móvil                               | Escape, foco y navegación correctos                                                                       |
| Apertura                                 | Omitible, una vez por sesión; salida segura con imágenes retrasadas 4 s                                   |
| Movimiento reducido y JS desactivado     | Contenido y navegación disponibles; sin loops automáticos                                                 |
| Error de vídeo y autoplay rechazado      | Póster y navegación conservados                                                                           |
| Previews y hero                          | Un preview activo; pausa fuera de pantalla; sin precarga de películas                                     |
| Contacto                                 | Instagram exacto; correo visible como provisional, sin mailto                                             |
| Originales e historial                   | Sin originales privados en Git; retrato previo sin cambios; commit inicial conserva relación de antecesor |

Las seis películas completas reproducen fotogramas y avanzan temporalmente desde la URL pública. Se verificaron búsqueda, pausa, volumen, pantalla completa real, cierre, eliminación del medio y restitución del foco. Los MP4 corresponden a Azul (398,129 s), Comezón (411,690 s), Mujer muñeca (359,050 s), Tallas (193,237 s) y Pieza audiovisual (54,625 s).

Doble completo (1841,13 s) se probó con HLS nativo, hls.js/MSE y viewport táctil de 390 px: inicio, 15:20 y 30:20, incluyendo fotogramas decodificados después de cada salto. Ninguna solicitud HLS antes del clic; solo 3–4 segmentos al comenzar, de 307. MIME correctos y peticiones parciales HTTP 206 verificadas en manifiesto, inicialización y segmentos del principio, medio y final. No hubo errores JS, HTTP o de reproducción. El cierre no deja peticiones ni reproductor residual.

Además se probaron manifiesto inválido, plataforma incompatible y cierre durante importación del módulo HLS. Se ofrece el fragmento alternativo claramente identificado o se cancela la carga, sin presentar una reproducción inexistente. La decodificación integral de Doble, vídeo y audio, terminó sin errores; VOD/ENDLIST presentes, todos los segmentos existen y no hay huérfanos.

## Lighthouse nuevo sobre la URL oficial

Ejecutado el 11 de noviembre de 2026 a las 16:34:57 UTC con Lighthouse 13.4.1, perfil móvil simulado 412×823, densidad 1,75, RTT 150 ms, red nominal 1,6 Mbps y ralentización CPU 4×. Son resultados nuevos de este rework, no las métricas anteriores.

| Medición                     |     Resultado |
| ---------------------------- | ------------: |
| Rendimiento                  |        98/100 |
| Accesibilidad                |       100/100 |
| Buenas prácticas             |       100/100 |
| SEO                          |       100/100 |
| FCP / LCP                    | 1,1 s / 1,5 s |
| Total Blocking Time          |        140 ms |
| Cumulative Layout Shift      |             0 |
| Transferencia registrada     |     662 216 B |
| Interfaz sin medios de vídeo |     320 166 B |

El único vídeo solicitado inicialmente fue el montaje móvil; no se solicitaron películas completas ni HLS. La transferencia es la registrada durante esa ejecución, no el tamaño total de todos los medios. El build ocupa aproximadamente 353,4 MB y el mayor archivo 58 650 588 B. Los pesos individuales y el criterio editorial se detallan en `MEDIOS.md`.

## Evidencias y límites de la revisión

Chrome 157 sobre Windows, con viewports emulados; no dispositivos físicos ni Safari/iOS. Se comprobó reproducción y búsqueda reales, sin afirmar que se hayan visto todas las películas de principio a fin en navegador. La decodificación integral y el muestreo de escenas son verificaciones diferentes. Axe y Lighthouse no equivalen a una certificación completa de accesibilidad ni garantizan métricas de usuarios reales.

Los informes locales excluidos de Git están en `qa-local/`:

- `rework/captures-public-final/`: cinco vistas, escritorio y móvil, primeras pantallas y página completa.
- `rework/functional-public-final/functional-report.json`: 50 combinaciones y accesibilidad. Una aserción de recarga se ajustó para aceptar HTTP 304 de caché, además de 200.
- `rework/functional-public-final-playback/functional-report.json`: seis reproducciones y escenarios de fallo, con esa aserción corregida.
- `hls-production/report.json` y `headers-range-report.json`: HLS público nativo, MSE y móvil.
- `rework/lighthouse-public-final/mobile.report.html` y `.json`: auditoría nueva.
- `rework/recording-public-final/recorrido-portafolio.mp4`: grabación real de apertura, Obra/hover, Perfil, Contacto, reproducción/búsqueda de Azul y cierre; sin audio capturado.
- `reduced-navigation-report.json`: comprobación explícita de transiciones y movimiento reducido.

El correo sigue siendo provisional y varias denominaciones editoriales esperan confirmación. No son fallos de publicación ni se han completado con datos inventados. El sitio y los seis reproductores están publicados y verificados.
