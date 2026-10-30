# Auditoría SEO de la versión 2.0.1

Fecha: 30 de octubre de 2026. Alcance: fuente y compilación estática del repositorio. La web de revisión es privada; no se ha recibido el dominio definitivo ni acceso a Search Console. No es una auditoría de posicionamiento o de respuestas HTTP del futuro alojamiento público.

## Resultado principal

La estructura técnica funciona en las comprobaciones locales, pero **no se puede certificar que Google indexe las 431 páginas ni que no aplique ajustes de calidad**. La principal debilidad editorial sigue siendo la similitud de contenido entre muchas fichas municipales.

## Comprobaciones y cambios

| Área | Resultado |
|---|---|
| Cobertura | 431 municipios: Álava 51, Bizkaia 113, Gipuzkoa 88, Madrid 179 |
| Portada | Ampliada de 32 a 48 enlaces municipales visibles: 12 por provincia |
| Descubrimiento | Todos los municipios enlazados desde su provincia y presentes en los sitemaps de producción; máximo 2 enlaces desde portada |
| Títulos y descripciones | Únicos; un H1 por página |
| Contenido accesible | HTML estático completo; el buscador no es la única vía para llegar a las fichas |
| Datos estructurados | JSON-LD analizable; municipio correcto en `Service.areaServed`, sin reseñas ni direcciones inventadas |
| Contacto | Norte y Madrid comprobados en cada ficha; consultas de WhatsApp con contexto municipal |
| Canónicas | Propias en producción con origen configurado; la página 404 ya no propone una canonical pública |
| Sitemap | Índice y cinco ficheros con 444 URLs de contenido principal; sin 404, privacidad o información auxiliar |
| URL alternativas | Añadidas redirecciones 301 forzadas de las rutas `index.html` a la ruta limpia para Netlify |
| Errores | Página 404 marcada `noindex,follow`; no existe un comodín que convierta todas las URLs desconocidas en la portada con respuesta 200 |
| Vistas de prueba | Sin indexación; no se anuncian como la web pública |
| Recursos | CSS, JS, logo y datos de búsqueda con versión para evitar caché del contenido anterior |

## Riesgo editorial pendiente

`npm run audit:seo` compara el texto de los artículos tras sustituir los nombres de lugares y teléfonos. Encuentra 11 patrones: siete fichas con contexto municipal adicional y cuatro grupos compartidos de 176, 111, 87 y 50 fichas. En conjunto, **424 fichas comparten el patrón principal del artículo con otras**.

La medición no incluye las diferencias de ruta, título, teléfono regional y enlaces de otras localidades como contenido editorial distintivo. Tampoco pretende reproducir el algoritmo de Google. Muestra una limitación real: los metadatos únicos y una canonical propia no convierten por sí solos el contenido compartido en información local sustancialmente diferente.

La documentación de Google explica que puede agrupar páginas con contenido principal muy similar y elegir otra canonical. También advierte sobre páginas locales creadas principalmente para captar consultas similares sin valor adicional suficiente. La repetición por sí sola no acredita una penalización, pero no debe presentarse esta estructura como libre de riesgo.

Mejora recomendada: ampliar el contexto verificado de cada zona donde el servicio se presta realmente: límites de cobertura, condiciones de atención y desplazamiento, accesos útiles, información específica de contratación, trabajos propios documentados con autorización y dudas locales reales. Los barrios y calles deben proceder de fuentes municipales. Cambiar sinónimos, reordenar párrafos o inventar casos no soluciona esa debilidad.

## Verificación pendiente del dominio público

Al configurar el dominio se deben revisar respuestas 200 de las páginas, 404 de una URL inexistente, redirecciones de `index.html`, dominio principal y variantes www/HTTP, etiquetas `index,follow`, canónicas y sitemap con un único origen. Después, Search Console permitirá comprobar la canonical elegida por Google, las páginas descubiertas e indexadas y las exclusiones. Un sitemap correcto no obliga a Google a indexar todas las URLs.

## Fuentes

- [Canonicalización y contenido duplicado — Google](https://developers.google.com/search/docs/crawling-indexing/canonicalization?hl=es)
- [Políticas de spam y páginas puerta — Google](https://developers.google.com/search/docs/essentials/spam-policies?hl=es)
- [Redirecciones forzadas y archivos existentes — Netlify](https://docs.netlify.com/manage/routing/redirects/redirect-options/)
- [Recuento de municipios — INE](https://www.ine.es/daco/daco42/codmun/cod_num_muni_provincia_ccaa.htm)
