# Ajustes de apertura, nitidez y enlaces

## Ajustes finales

Se sustituyeron las tomas suaves del montaje por planos más enfocados de las mismas películas. Las cuatro fuentes disponibles en la carpeta de materiales son copias HEVC de 1280×720. La comparación de los mismos instantes confirmó que la exportación publicada ya conservaba el detalle disponible. En la prueba a 390×844 y DPR 3, el vídeo de 540×720 cubría 1170×1572 píxeles físicos, una ampliación de 2,18 veces en el navegador. La exportación de 1080×1440 reduce el escalado que hace el navegador a 1,09. El escalado previo no añade detalle nativo; la mejora de detalle viene de la selección de tomas. Se conserva el plano de Doble y se mantienen los 12 s, 30 fps y bucle sin audio. Las características finales están en MEDIOS.md.

La apertura de 3,5 s mantiene la presentación de 0,3 s y dedica el segundo adicional a abrir la máscara. El desvanecimiento se acompasa con la apertura y la salida de seguridad es de 5,5 s. Se conserva la opción de omitir, la aparición una vez por sesión y la preferencia de movimiento reducido.

«Explorar la obra» usa el naranja de acento en todos los estados, con el mismo subrayado en hover y foco. Se retiró el rótulo inferior y se mantuvo el control de reproducción. Perfil presenta los dos párrafos suministrados. Perfil, Contacto y pie usan el nuevo correo oficial con `mailto:`.

## Revisión anterior (`0dc9c19`)

Actualización puntual del 11 de noviembre de 2026. Se conserva el diseño cinematográfico aprobado: composición, paleta, fuentes, estructura, fotografía y películas. La versión pública `a481889` se abrió y grabó antes de modificarla.

## Apertura de 2,5 segundos

Se mantienen las cuatro máscaras, su recorrido, el pequeño marco DLF y la misma curva de desaceleración. La nueva secuencia tiene 0,3 s de presentación y 2,2 s de apertura. El marco se desvanece proporcionalmente y el botón Omitir permanece disponible durante la secuencia.

CSS lleva la secuencia; un listener inline cierra únicamente al recibir su `animationend`. Se eliminaron el cierre condicionado a `poster.decode()` y los temporizadores anteriores de 900/1800 ms. La salida de seguridad excepcional es de 4500 ms, posterior a la secuencia normal. Descargar o preparar el póster y el vídeo no espera a la apertura.

La sesión se registra al iniciar; no se repite tras navegar o recargar. El botón puede omitirla antes de cargar el módulo externo. `prefers-reduced-motion` muestra la página directamente y cambiar esa preferencia durante la apertura la cancela. Sin JavaScript no se oculta el contenido.

Pruebas reales del build local en Chrome: normal 2568 ms, caché 2518 ms, póster retrasado 5 s 2539 ms, póster fallido 2537 ms y módulo externo fallido 2548 ms. Los pequeños márgenes incluyen pintado y planificación del navegador. La omisión inicial y a mitad de secuencia funcionan.

## Nitidez del hero

Las cuatro fuentes inspeccionadas son originales de 1280×720. La exportación anterior móvil reducía su recorte nativo de 540×720 a 480×640 y usaba compresión CRF23, unos 391 kb/s. Al cubrir una caja de 390×524 CSS en DPR3 se ampliaba sobre 1170×1572 píxeles físicos. No había un filtro CSS de desenfoque ni se utilizaban las películas ya optimizadas como fuente: se combinaban compresión, reducción y ampliación de pantalla.

Los nuevos montajes se generan directamente de los originales con H.264/yuv420p, CRF14, preset slow, 30 fps, faststart y sin audio, reescalado ni sharpening. Conservan los planos, encuadres y 12 segundos. Las comparaciones original/antes/después a 1,5, 4,5, 7,5 y 10,5 s muestran más detalle en cabello, rostro y tejidos. No se ha utilizado IA generativa.

| Montaje    | Resolución | Bitrate medio |      Tamaño |
| ---------- | ---------- | ------------- | ----------: |
| Móvil      | 540×720    | 2,17 Mb/s     | 3 257 199 B |
| Escritorio | 1280×720   | 5,65 Mb/s     | 8 478 241 B |

El recorte vertical solo contiene 540 px nativos de ancho; exportarlo a 900–1080 px sin nuevas fuentes no añadiría detalle. La revisión DPR3 es emulación de alta densidad en Chrome, no una prueba en un iPhone físico. Safari/iOS no está disponible en este entorno.

SHA256 confirma 358 archivos restantes idénticos, incluidas las películas completas, previews, pósters y fotografía. El build ocupa unos 362,9 MB.

## Interfaz sin flechas

Se eliminaron símbolos Unicode, elementos de flecha y círculos decorativos en portada, archivo, fichas, perfil, contacto, menú, pie, apertura, reproductor, página 404 y alternativas sin JavaScript. Los accesos usan texto y estados de subrayado/contraste/foco. Los controles del hero dicen «Pausar video» y «Reanudar video»; los controles nativos de las películas se conservan.

La auditoría del DOM y pseudoelementos de 11 rutas a 390 y 1440 px no encontró flechas ni desbordamiento. La regresión de las seis películas en escritorio y Doble en móvil DPR3 pasó reproducción, avance, búsqueda, pausa, volumen, pantalla completa, cierre y restitución de foco. No se solicitan películas antes del clic.

## Evidencias

`npm run check` pasó con 18 archivos y cero errores; `npm test` pasó 2/2; el build genera 11 páginas estáticas. Las comprobaciones y grabaciones de este ajuste están en `qa-local/hero-refinement/`, fuera de Git: before, candidates, local-verify, local-capture y playback-local. La revisión posterior al despliegue utiliza siempre la URL oficial y guarda sus evidencias públicas en esa misma carpeta. Las métricas Lighthouse documentadas en VERIFICACION.md pertenecen al rework anterior y no se presentan como mediciones de estos vídeos nuevos.
