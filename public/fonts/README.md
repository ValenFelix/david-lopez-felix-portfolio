# Tipografías

Los títulos editoriales utilizan EB Garamond 500; los textos, navegación y metadatos conservan Manrope variable (400–800). Las fuentes se autoalojan en WOFF2 y utilizan rutas relativas y `font-display: swap`.

- Bodoni Moda: https://github.com/google/fonts/tree/main/ofl/bodonimoda ; licencia SIL OFL 1.1 en Bodoni-Moda-OFL.txt. Dos WOFF2: 71 280 bytes. Se conservan como archivos de la versión anterior, pero no se cargan ni se utilizan.
- Manrope: https://github.com/google/fonts/tree/main/ofl/manrope ; licencia SIL OFL 1.1 en Manrope-OFL.txt. Dos WOFF2: 39 692 bytes.

Distribuciones obtenidas de Google Fonts el 11 de noviembre de 2026, sin modificar los binarios. Los archivos de Instrument Serif de la versión anterior se conservan, pero no se cargan ni se utilizan en esta versión.

Refinamiento del 17 de noviembre de 2026, también desde la distribución oficial de Google Fonts bajo SIL OFL 1.1:

- EB Garamond 500: https://github.com/google/fonts/tree/main/ofl/ebgaramond ; licencia `eb-garamond-OFL.txt`. Se conserva intacto el subconjunto de 2 784 bytes para `DAVID LÓPEZ FÉLIX`, aprobado tras compararlo visualmente con Libre Caslon Display 400 y Archivo 500.
- Noto Serif 500: https://github.com/google/fonts/tree/main/ofl/notoserif ; licencia `noto-title-OFL.txt`. Subconjunto para `люθρonske`, 1 728 bytes.
- Noto Serif JP 500: https://github.com/google/fonts/tree/main/ofl/notoserifjp ; licencia `noto-symbol-OFL.txt`. Subconjunto para `々` (U+3005), 1 092 bytes.

Los dos subconjuntos Noto se aplican solo al título multiescritura, incluidas galería, ficha, siguiente obra y reproductor. `project.titleFont` activa esa presentación. Estos archivos y el subconjunto del nombre se obtuvieron mediante el parámetro `text` de la API CSS2 de Google Fonts; se comprobaron sus tablas de caracteres. No hay peticiones de fuentes a servidores externos en producción. Si se cambia el texto de esos títulos, deben regenerarse los subconjuntos.

La unificación editorial utiliza `eb-garamond-editorial.css` en todas las páginas, con los subconjuntos latin (25 264 bytes) y latin-ext (64 076 bytes) de EB Garamond 500 v33. Proceden de `https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500&display=swap`, la misma versión oficial que el nombre aprobado. Incluyen minúsculas, acentos y signos para los títulos del sitio. En Inicio, la hoja del nombre original se carga después para conservar su representación aprobada. No se han cambiado sus tamaños, peso, interletraje, interlineado ni animaciones.
