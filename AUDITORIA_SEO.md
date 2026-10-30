# Auditoría del sitio — 30 de octubre de 2026

Versión 2.4.2. Dominio configurado: https://cerrajerourgente247.com. Revisión de código, compilación y navegación local. La consulta pública de portada, robots y sitemap no ha permitido verificar el alojamiento del dominio; no se atribuye ese fallo a una causa DNS o TLS sin más evidencia.

## Resultado y correcciones

- Las 431 fichas municipales están habilitadas para indexación por instrucción expresa del titular. El índice de sitemaps incluye 445 URLs: 431 municipales y 14 principales. No significa que Google las haya indexado.
- La revisión encontró que el buscador no incluía barrios. Se añaden las zonas municipales y los barrios documentados a sus datos, sin crear páginas de barrio vacías.
- Se retira la selección de ocho enlaces de barrio de portada. Los barrios y zonas se conservan en sus fichas municipales y son localizables mediante el buscador.
- Getxo no tenía barrios en la importación del callejero. Se añaden Las Arenas, Algorta, Romo, Neguri y Andra Mari, contrastados con el Ayuntamiento de Getxo: https://www.getxo.eus/es/turismo/descubre-getxo/Historia-getxo.
- Se evita mostrar un encabezado vacío de barrios cuando todas sus referencias ya figuran en las zonas municipales.
- Se prueban en navegador las búsquedas Algorta → Getxo, Gros → Donostia y Salburua → Vitoria-Gasteiz.

## Cobertura de referencias

| Provincia | Municipios | Con calles | Con barrios del callejero | Con contexto municipal adicional |
| --- | ---: | ---: | ---: | ---: |
| Álava | 51 | 49 | 23 | 1 |
| Bizkaia | 113 | 87 | 107 | 3 |
| Gipuzkoa | 88 | 77 | 76 | 1 |
| Madrid | 179 | 179 | 0 | 3 |

Hay 2.919 referencias de calles en 392 municipios y 1.000 referencias de barrios del callejero en 206. No son cantidades de nombres globalmente únicos. Las zonas de ocho fichas municipales se muestran aparte; no se suman indiscriminadamente distritos, barrios y entidades. Los datos de Eustat y de la Comunidad de Madrid conservan su atribución visible.

El cero en Madrid corresponde al campo barrios de la importación del callejero, no a una ausencia de barrios en la provincia. Madrid capital, Coslada y San Fernando de Henares cuentan con contexto adicional contrastado. Los otros 176 municipios de Madrid siguen necesitando esa investigación municipal; tener calles no completa los barrios. Otros municipios, como Getxo, requieren fuentes municipales porque la importación de vías no recoge todos sus barrios urbanos.

## Controles superados

- 448 páginas: un H1 por página, títulos y descripciones diferentes, enlaces, recursos y anclas internos existentes.
- 431 URLs municipales distintas, contactos regionales y WhatsApp correctos, sin fichas huérfanas. Municipios accesibles en dos enlaces desde portada como máximo.
- 80 municipios enlazados desde portada: 48 visibles y 32 en cuatro desplegables nativos +/−, con enlaces presentes en el HTML. Se mantiene la búsqueda por barrios y zonas documentados.
- Siete servicios en las cuatro provincias, antes del directorio; mirilla WiFi enlazada desde las fichas y seleccionable en el borrador de WhatsApp.
- Canónicas, migas JSON-LD y sitemaps apuntan al dominio definitivo. No hay marcado de puntuaciones ni reseñas inventadas.
- La página 404 y las vistas de prueba siguen excluidas; producción permite indexar las 431 fichas. Robots permite el rastreo.
- Redirecciones preparadas para HTTP, www e index.html en Netlify. Su funcionamiento efectivo requiere comprobarlas en el alojamiento público.
- Fotos locales y recursos sin dependencias externas en tiempo de ejecución. Foto de servicio visible en las fichas también en móvil. No se atribuyen imágenes ilustrativas a trabajos realizados.

## Qué falta, por prioridad

1. **Verificar producción:** respuestas 200, 301 y 404 reales, certificado, dominio principal, sitemap con sus 445 URLs y ausencia de cabeceras X-Robots-Tag noindex. La compilación no acredita cómo responde el alojamiento ni posibles variables de entorno de Netlify. Confirmar que SITE_PREVIEW no está activo y CONTEXT es de producción.
2. **Ampliar barrios contrastados:** especialmente los 176 municipios de Madrid sin contexto adicional, además de huecos urbanos en otras provincias. No convertir carreteras, entidades o polígonos automáticamente en barrios.
3. **Revisión editorial local:** solo siete fichas tienen contenido específico revisado registrado. Las otras 424 comparten buena parte de la estructura y los textos. Abrir la indexación por petición del titular no elimina ese límite. No generar variaciones sin utilidad para alterar una cifra de similitud.
4. **Evidencia del servicio:** fotografías propias autorizadas y casos reales documentados cuando el titular los aporte. No se inventan intervenciones, oficinas, testimonios, tarifas ni plazos de llegada.
5. **Imagen de mirilla resuelta:** se incorpora la foto de equipo IMOU facilitada por el titular, en la página de servicio y su desplegable de portada; se identifica como ejemplo de equipo.
6. **Search Console y rendimiento real:** verificar propiedad, enviar el sitemap, inspeccionar portada/provincias/muestras locales y revisar cobertura e impresiones. No hay acceso a esos datos ni medición pública de Core Web Vitals en esta auditoría.

## Reproducción

`npm run build && npm run check && npm run audit:seo` comprueba producción. `SITE_PREVIEW=1 npm run build && SITE_PREVIEW=1 npm run check` comprueba exclusión de la revisión privada. La política de indexación está en data/local-indexing.json; su lista de revisión editorial no limita la indexación cuando default es index.
