# Estado vigente — 30 de octubre de 2026

Por petición expresa del titular se retira la exclusión municipal: las 431 fichas tienen `index,follow` en producción y se incluyen en los sitemaps (445 URLs con las páginas principales). La página 404 y las compilaciones de prueba mantienen `noindex`. Las siete revisiones editoriales registradas se conservan como dato, sin afirmar que las otras 424 hayan recibido esa revisión. La habilitación no acredita indexación ni posiciones en Google.

El informe que sigue documenta la auditoría anterior y sus medidas históricas; la política de exclusión municipal que describe queda sustituida por el estado vigente anterior.

---

# Auditoría SEO y tratamiento del riesgo — versión 2.2.0

Fecha: 30 de octubre de 2026. Alcance: fuente y compilación estática. La revisión alojada es privada; el dominio definitivo facilitado es `https://cerrajerourgente247.com`. No se dispone de acceso a Search Console. No se han verificado todavía respuestas HTTP o posiciones del alojamiento público del usuario.

## Qué problema se está tratando

La versión 2.0.1 tenía 424 fichas con el mismo patrón principal de artículo al retirar nombres y teléfonos. Los títulos y canónicas propias no resolvían esa debilidad editorial. La cifra procedía de una comparación de texto del proyecto, no de un diagnóstico o penalización de Google.

No se han generado sinónimos aleatorios ni casos ficticios para alterar esa medición. Tampoco se presenta una lista de calles como una garantía de valor editorial o de posicionamiento.

## Cambios aplicados

1. Se conservan las 431 URLs, sus contactos regionales y los enlaces de navegación.
2. Las fichas pendientes se excluyen mediante `noindex,follow` y se retiran de los sitemaps. `robots.txt` permite su rastreo para que el buscador pueda leer la directiva.
3. Solo siete fichas con contexto municipal y revisión editorial explícita quedan habilitadas para indexación de producción: Bilbao, Barakaldo, Vitoria-Gasteiz, Donostia / San Sebastián, Madrid, Coslada y San Fernando de Henares.
4. Las explicaciones técnicas largas se concentran en las siete páginas de servicio; las fichas municipales incorporan un resumen, referencias de ubicación y el aviso contextual de WhatsApp.
5. Se incorporan calles y barrios de registros públicos, cruzados por código de municipio y mostrados con su fuente. Elegir una referencia permite incorporarla al mensaje antes de enviarlo.

## Referencias locales

- 2.919 referencias de calles en 392 municipios.
- 1.000 referencias de barrios del callejero en 206 municipios, además de las zonas municipales contrastadas de las fichas con contexto editorial.
- Datos de Eustat para Álava, Bizkaia y Gipuzkoa. Se usan únicamente tipos identificados como calle, avenida, plaza, paseo, alameda, travesía o barrio; no se convierten entidades, núcleos, polígonos o códigos estadísticos en barrios ficticios.
- Callejero completo oficial de la Comunidad de Madrid, distribución `Callejero_Completo_V124.dbf`, para sus 179 municipios.
- La selección no se presenta como un listado de obras realizadas, sedes, averías habituales o calles más importantes. No se publican números de portal, domicilios individuales, coordenadas ni otros campos del registro de origen.

Los datos se conservan en `data/local-references.json`, con procedencia y fecha de consulta. El importador reproducible está en `scripts/import-local-references.py`. Una descarga incompleta, un municipio ausente o un código fuera del conjunto esperado impiden la importación.

## Control editorial de indexación

`data/local-indexing.json` tiene exclusión por defecto y una lista explícita de municipios revisados. Añadir una calle o un barrio a los datos no cambia esa lista. Para ampliar la indexación debe revisarse información específica útil para contratar el servicio: cobertura real, condiciones, coordinación del acceso, preguntas locales y, si se dispone de ellas, intervenciones propias documentadas con autorización. No se inventan tiempos, sedes, precios ni experiencias de clientes.

La producción incluye 21 URLs en los sitemaps: siete fichas municipales y catorce páginas principales. Las otras 424 fichas no están en ellos y llevan `noindex`. Las páginas auxiliares quedan fuera del sitemap y la página 404 sigue excluida de indexación. La vista privada y los despliegues de prueba llevan exclusión global.

## Comprobaciones

- 431 municipios, sin URLs duplicadas; títulos y descripciones propios y un H1 por página.
- Enlaces y recursos internos válidos. Todos los municipios accesibles en un máximo de dos enlaces desde portada.
- 48 municipios visibles en la portada, 12 por provincia.
- Teléfono y WhatsApp regional correctos en todas las fichas; selección de referencia incluida en el borrador, sin envío automático.
- JSON-LD con municipio correcto, sin reseñas ni direcciones inventadas.
- Sitemaps sin URLs con `noindex`; canónica propia sin trasladar indiscriminadamente todas las fichas a la provincia.
- Redirecciones de `index.html` preparadas para Netlify y página 404 excluida.

`npm run check` valida las directivas de las 431 fichas y su coherencia con los sitemaps en una compilación de producción. `npm run audit:seo` informa de la cobertura de referencias y del estado editorial.

## Límites que siguen existiendo

La medida reduce la exposición del bloque repetitivo; no garantiza indexación, ausencia de acciones de calidad ni posiciones de las siete fichas habilitadas. Todas siguen necesitando mantenimiento y evidencia del servicio real. No puede afirmarse que las 424 fichas pendientes estén listas para competir en búsquedas locales mientras no pasen esa revisión.

Al disponer del dominio público habrá que verificar respuestas 200/404, redirecciones, etiquetas, canónicas, dominio principal y Search Console. Si una ficha pendiente ya estuviera indexada, su exclusión no sería instantánea: el buscador tendría que volver a rastrearla.

## Fuentes

- [Políticas de spam — Google](https://developers.google.com/search/docs/essentials/spam-policies?hl=es)
- [Contenido útil y fiable — Google](https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=es)
- [Controlar la indexación con noindex — Google](https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=es)
- [Callejero de Euskadi — Open Data Euskadi / Eustat](https://opendata.euskadi.eus/catalogo/-/callejero-comunidad-autonoma-del-pais-vasco/)
- [Callejero completo — Comunidad de Madrid](https://web.comunidad.madrid/iestadis/fijas/estructu/general/territorio/estructu_descargas.htm)

## Cierre con dominio definitivo

Canónicas, datos estructurados, Open Graph y sitemaps usan `https://cerrajerourgente247.com`. Se generan redirecciones permanentes de HTTP y www al dominio HTTPS sin www. La compilación de vista privada usa `SITE_PREVIEW=1` para excluirla de indexación incluso con dominio configurado. Los despliegues de prueba de Netlify también se excluyen.

Queda pendiente comprobar el dominio en producción: DNS, certificado, redirección del subdominio Netlify y respuestas HTTP públicas. No se atribuye un resultado de velocidad o Core Web Vitals sin medición pública.

La información del titular disponible es D.C.G y los teléfonos facilitados. No se han inventado nombre completo, NIF ni domicilio profesional. Por instrucción del titular se conserva únicamente D.C.G; esta auditoría técnica no acredita la suficiencia de la información legal.

## Bloque visual de consultas

La portada incorpora tres ejemplos expresamente identificados como ilustrativos, con bustos vectoriales. No se atribuyen opiniones, puntuaciones, identidades ni experiencias a clientes reales y no se añade marcado de reseñas.

## Fotos y estrellas de servicio

Las 431 fichas incluyen una fotografía visible también en móvil dentro de apertura de puertas. Se presenta como referencia del servicio, sin atribuirla a una intervención local. La portada añade cinco estrellas asociadas a cinco puntos a confirmar antes de contratar; no hay puntuación ni marcado Review/AggregateRating. Iñaki, Marta y Aitor se identifican como personajes ficticios. Se conserva la política de indexación: 7 fichas habilitadas, 424 pendientes excluidas.

## Mirillas digitales WiFi

Servicio añadido con página propia, enlace desde portada y pie, enlace y opción de consulta en las 431 fichas. Compatibilidad y prestaciones se expresan por modelo; no se promete grabación o nube gratuita ni compatibilidad universal. Referencia técnica consultada: [ficha oficial EZVIZ DP2C](https://www.ezviz.com/es/product/dp2c/40069). La fotografía de puerta es contextual, no se presenta como un modelo de mirilla.
