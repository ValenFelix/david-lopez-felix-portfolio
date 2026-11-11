# Medios web y procedencia

Los originales permanecen fuera del repositorio, sin modificar. Se inspeccionaron metadatos, hojas de contacto y créditos. Solo se publican derivados autorizados, sin rutas locales, identificadores de Drive ni credenciales.

| Obra / denominación editorial | Duración medida | Completa web                      |                 Bytes |
| ----------------------------- | --------------: | --------------------------------- | --------------------: |
| Azul                          |           06:38 | MP4 H.264/AAC 1280×720, 30 fps    |            58 650 588 |
| Comezón                       |           06:52 | MP4 H.264/AAC 1280×720, 30 fps    |            39 136 704 |
| Mujer muñeca                  |           05:59 | MP4 H.264/AAC 1280×720, 30 fps    |            36 586 894 |
| Tallas                        |           03:13 | MP4 H.264/AAC 1280×720, 23,98 fps |            12 645 162 |
| Pieza audiovisual             |           00:55 | MP4 H.264/AAC 1280×720, 24 fps    |            11 746 423 |
| Doble                         |           30:41 | HLS H.264/AAC 1280×720, 30 fps    | 181 314 484 agregados |

Doble consta de 307 segmentos fMP4, un archivo de inicialización y el manifiesto VOD. El mayor segmento ocupa 1 014 491 bytes; la suma no es un archivo único. El reproductor usa HLS nativo cuando existe y carga hls.js bajo demanda en otros navegadores compatibles. El buffer MSE se limita a unos 20–30 s; no descarga la película completa al abrir la ficha. Se conserva un fragmento alternativo MP4 de 30 s y 7 224 953 bytes.

Los MP4 usan faststart, píxeles yuv420p y audio AAC. No se fuerza 24 fps ni se amplían las fuentes. La duración exacta en segundos, dimensiones y pesos figuran en `public/media/media-manifest.json`.

## Elementos decorativos

- Hero escritorio: montaje de 12 s, 1920×1080, 20 121 267 bytes, bitrate medio 13,41 Mb/s, sin audio.
- Hero móvil: montaje de 12 s, 1080×1440, 13 171 927 bytes, bitrate medio 8,78 Mb/s, sin audio; encuadres propios por plano que conservan los rostros.
- Seis previews de 6 s, sin audio: entre 82 157 y 302 376 bytes cada uno. Solo un preview activo, cargado mediante interacción y pausado al salir de pantalla.
- 28 fotogramas WebP del rework: 1 406 704 bytes agregados. Las portadas incluyen versiones de 640 y 1280 px; fuentes de 1080p también tienen 1920 px. No se utiliza el fotograma inicial ni se generan imágenes con IA.

Los vídeos agregados ocupan 381 630 861 bytes, incluyendo loops, previews, completas y alternativa de Doble. El build ocupa aproximadamente 384,5 MB, por debajo de 1 GB; su archivo mayor ocupa 58 650 588 bytes. Los presupuestos no sustituyen el límite mensual de transferencia de Pages: si aumenta la audiencia, se puede sustituir la fuente completa por alojamiento audiovisual externo sin rehacer las fichas.

La comparación del montaje anterior con las fuentes suministradas en los mismos instantes dio una similitud estructural de 0,990–0,994. La suavidad restante provenía del foco de algunas tomas y de ampliar el recorte de 540×720 a 1170×1572 píxeles en la prueba móvil de alta densidad. Se eligieron planos más cercanos y mejor enfocados de Azul, Mujer muñeca y Comezón; se mantuvo el de Doble. Se exportó directamente desde las copias suministradas de 1280×720, con un escalado Spline36 para reducir el remuestreo en pantalla. Las dimensiones de salida no representan resolución nativa adicional. Ambas versiones usan H.264/yuv420p, CRF14, preset slow, 30 fps y faststart, sin realce artificial ni IA. No se usaron las películas optimizadas para la web como fuente.

## Criterio editorial

Las portadas y fotogramas se extrajeron de momentos seleccionados tras revisar hojas de contacto. Las posiciones temporales se documentan en el manifiesto. El montaje de portada es una selección visual para el sitio, no una nueva película atribuida a David.

En los créditos se comprobó el nombre completo de David en fotografía de Azul, guion y dirección de Comezón, y dirección de arte compartida/jefatura de producción de Doble. No se publican roles de las otras obras cuando solo aparece un nombre abreviado que podría requerir confirmación. Mujer muñeca tiene título comprobado en pantalla; las restantes denominaciones permanecen explícitamente editoriales hasta su confirmación. No se inventan año, sinopsis, escuela, premios ni experiencia.

La fotografía del perfil mantiene su composición y rasgos originales; únicamente se redimensionó y comprimió con herramientas fotográficas tradicionales. No se aplicó IA generativa ni reconstrucción facial.

Límites oficiales consultados: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits y https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github . Git LFS no sirve estos medios en Pages.
