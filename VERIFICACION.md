Verificación realizada el 11 de noviembre de 2026 sobre la versión pública correspondiente al commit `80b0c4c7110c4ebfd9cbef67baf6f08a1233264e`.

La versión final incorpora únicamente un ajuste posterior de espaciado del pie cuando falta contacto, en el commit `d5cc6efb35ae32ce11ac38162f9889ab3baf7782`. Se confirmó que el despliegue `43048955408` terminó correctamente con ese commit y se comprobó de nuevo la URL pública a 390 y 1440 px. El pie compacto carga con el relleno, margen y borde redundantes eliminados, la página responde HTTP 200 y no hay desbordamientos ni errores de JavaScript. Las capturas finales de portada se actualizaron con esta versión. La auditoría completa y Lighthouse descritos a continuación corresponden al commit anterior.

El despliegue de GitHub Actions `43048108345` terminó correctamente. La portada y las seis fichas respondieron con HTTP 200 en una sesión de Chrome independiente, sin autenticar. Una ruta inexistente devolvió HTTP 404. [Sitio publicado](https://valenfelix.github.io/david-lopez-felix-portfolio/)

El workflow ejecutó `npm ci`, `npm run check`, `npm test` y `npm run build` antes del despliegue. Las dos pruebas unitarias comprueban el dominio de privacidad mejorada de YouTube y el rechazo de proveedores o identificadores inválidos.

| Comprobación | Resultado |
| --- | --- |
| Anchos de 320, 390, 768, 1440 y 1920 px | Sin desbordamiento horizontal |
| Acceso directo y recarga de las seis fichas | Correctos bajo el prefijo del repositorio |
| Compilación adicional con `SITE_BASE=/` | Portada y seis fichas accesibles y recargables desde la raíz, con enlaces correctos |
| Imágenes y fuentes autoalojadas | Cargadas correctamente |
| Navegación a Obra y Sobre mí | Destinos correctos |
| Contacto | Omitido mientras falten datos confirmados |
| Errores de página o solicitudes fallidas | Ninguno durante las pruebas |
| Solicitudes a proveedores externos antes de reproducir | Cero |
| Iframes en la carga inicial | Cero |
| Preferencia de movimiento reducido | Desplazamiento suave desactivado |
| Axe, reglas WCAG 2/2.1 A y AA, a 390 y 1440 px | Cero infracciones detectadas, 17 comprobaciones aprobadas |

Se revisaron visualmente capturas reales de la portada en escritorio y móvil, una ficha de proyecto y el diálogo de cine. La prueba responsive utiliza emulación de viewport en Chrome 157 sobre Windows. La revisión no incluye dispositivos físicos ni otros motores de navegador.

El diálogo se comprobó con un contenido sintético interceptado dentro del navegador de pruebas. Pasaron apertura, cierre, reapertura, cierre con Escape, restitución del foco, límite de un iframe y eliminación del iframe al cerrar. Esta prueba confirma la interacción del componente. La reproducción de las películas, su audio y la pantalla completa del proveedor quedan pendientes de enlaces públicos autorizados y operativos. Las fichas publicadas indican que la reproducción todavía está pendiente.

Lighthouse 13.4.1 se ejecutó contra la URL pública el 11 de noviembre de 2026 a las 16:26, hora de Madrid. Se usó el perfil móvil estándar, viewport de 412 × 823, densidad 1.75, red simulada de 1.6 Mbps con RTT de 150 ms y ralentización de CPU de 4×.

| Medición móvil | Resultado |
| --- | --- |
| Rendimiento | 98/100 |
| Accesibilidad | 100/100 |
| Buenas prácticas | 100/100 |
| SEO | 100/100 |
| First Contentful Paint | 1.345 s |
| Largest Contentful Paint | 1.645 s |
| Cumulative Layout Shift | 0 |
| Total Blocking Time | 0 ms |
| Speed Index | 3.904 s |
| Transferencia registrada | 328625 bytes, aproximadamente 321 KiB |

Estas mediciones corresponden a una ejecución de laboratorio. La conformidad completa con WCAG y las métricas de usuarios reales requieren una evaluación adicional.

Los informes completos y las capturas se conservan localmente en `qa-local/`, excluido de Git. Los resultados de navegador finales están en `qa-local/production-final/browser-report.json`, el informe de rutas raíz en `qa-local/root-report.json` y los informes de Lighthouse en `qa-local/lighthouse-mobile.report.json` y `qa-local/lighthouse-mobile.report.html`.
