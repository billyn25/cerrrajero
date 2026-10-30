# Cerrajería urgente 24h

Web estática propia para Álava, Bizkaia, Gipuzkoa y Madrid. Sin dependencias externas de JavaScript ni CSS. Las páginas se generan como HTML completo; no necesitan JavaScript para leer los servicios, recorrer la cobertura ni contactar desde una provincia.

## Desarrollo y despliegue

Requiere Node 22 o superior.

```sh
npm run build
npm run check
```

En Netlify: importar este repositorio, comando `npm run build && npm run check`, directorio de publicación `dist`. `netlify.toml` ya lo configura. No hay que subir `node_modules` ni instalar paquetes.

## Qué editar

| Archivo | Contenido |
|---|---|
| `data/site.json` | Marca, teléfonos, dominio y titular |
| `data/services.json` | Los seis servicios, contenido y preguntas |
| `data/coverage.json` | Cuatro provincias, agrupaciones y 431 municipios |
| `build.mjs` | Estructura global, metadatos, JSON-LD y sitemaps |
| `local-pages.mjs` | Contenido y estructura de las fichas locales |
| `data/local-context.json` | Contexto local contrastado y sus fuentes |
| `assets/style.css` | Diseño industrial de grafito y amarillo, con portada panorámica y servicios desplegables; móvil y escritorio |
| `assets/app.js` | Menú, ayuda de averías, buscador y contacto por zona |

Teléfono norte: **641 58 93 94**. Teléfono Madrid: **614 78 99 45**. Titular indicado por el propietario: **D.C.G**. WhatsApp usa los mismos números.

La portada y las páginas generales permiten elegir el contacto. Las páginas provinciales contactan directamente con su teléfono. El directorio permite preparar la consulta de cada municipio en WhatsApp sin enviarla automáticamente.

## Dominio e indexación

El origen canónico se obtiene por orden de `SITE_URL`, `data/site.json → domain` y la variable `URL` de Netlify. Para un dominio definitivo, configurar `domain` o `SITE_URL` con el origen HTTPS, sin barra final ni rutas, y volver a desplegar. Si se cambia de dominio, añadir la redirección 301 del dominio anterior en el alojamiento.

`indexable` está habilitado. La indexación solo se activa cuando hay origen HTTPS, teléfono y titular configurados. Sin origen, o con `SITE_PREVIEW=1`, la compilación incorpora `noindex,follow` y un sitemap vacío para no exponer versiones duplicadas. El dominio definitivo configurado es `https://cerrajerourgente247.com`; prevalece sobre `URL` de Netlify. No definir `SITE_URL` con un dominio temporal. Antes de enviar el sitemap a Search Console, comprobar el dominio final y que la página pública devuelva `index,follow`. Los despliegues de prueba de Netlify se excluyen de indexación.

Los sitemaps contienen las páginas de contenido principal y las fichas municipales, sin las páginas auxiliares o 404. No se incluyen fechas de actualización falsas. Los enlaces internos usan rutas estables terminadas en `/`.

## Páginas locales y SEO

Hay **431 páginas municipales** en `/cerrajero/{provincia}/{municipio}/`: Álava 51, Bizkaia 113 (incluido Usansolo), Gipuzkoa 88 y Madrid 179. Se generan 447 páginas en total, contando portada, provincias, servicios y páginas auxiliares.

Las páginas municipales son HTML estático completo, no anclas ni títulos creados solo con JavaScript. Cada una tiene title, descripción, H1, canonical cuando existe dominio, migas y `Service.areaServed` de su municipio. Todas permiten contactar directamente con el teléfono regional y preparar una consulta de WhatsApp con municipio, problema y acceso. El directorio provincial, el buscador y la portada enlazan a las URLs reales.

Las fichas comparten estructura y explicaciones técnicas de los servicios: no se presenta esa parte común como contenido editorial único. Las siete localidades revisadas tienen contexto y preguntas propias; las demás incorporan referencias oficiales cuando están disponibles, sin inventar barrios ni supuestos sobre sus viviendas. Para ampliar información local, aportar datos verificables del servicio y trabajos reales autorizados; no añadir diferencias ficticias ni texto aleatorio para aparentar originalidad.

El listado completo y los códigos se conservan en `data/municipios-ine.json`, con fuente y fecha de referencia. Se contrasta con el recuento del INE y se distribuye a partir del dataset de CodeForSpain. Las denominaciones bilingües se conservan en una sola URL; no se crean páginas duplicadas para sinónimos.

Los sitemaps son un índice en `/sitemap.xml` con cinco ficheros. La versión 2.1.0 permite indexar siete fichas revisadas y trece páginas principales: 20 URLs en total. Las otras 424 fichas conservan su URL y contacto, pero llevan `noindex,follow` y quedan fuera del sitemap. `data/local-indexing.json` controla la selección, con exclusión por defecto. Añadir nombres de calles no activa la indexación.

Las referencias públicas se conservan en `data/local-references.json`, importadas con `scripts/import-local-references.py`. Incluyen 2.919 calles seleccionadas en 392 municipios y 1.000 barrios del registro en 206 municipios. Los barrios municipales adicionales mantienen su fuente en `data/local-context.json`; el texto revisado está en `data/local-editorial.json`. No se confunden distritos o entidades con barrios. La nueva ficha local concentra el contexto y la preparación del aviso; las explicaciones técnicas extensas están en las páginas de servicio.

No se afirman sedes locales, reseñas, años de experiencia, precios, minutos de llegada ni trabajos de clientes no aportados. La apertura sin daños se describe de forma condicionada. No hay estrellas ficticias. Los datos estructurados no garantizan resultados enriquecidos. Tener páginas por municipio tampoco garantiza indexación o posiciones; la cobertura real, la calidad, la reputación y las políticas de Google siguen importando.

Referencias: [políticas de spam de Google](https://developers.google.com/search/docs/essentials/spam-policies?hl=es), [recuento oficial de municipios](https://www.ine.es/daco/daco42/codmun/cod_num_muni_provincia_ccaa.htm).

## Imágenes y privacidad

`assets/hero.webp`: imagen ilustrativa creada con IA para este proyecto, no presentada como trabajo real. Prompt: fotografía editorial horizontal de una puerta de madera oscura de vivienda europea, manilla de níquel, escudo y mano con llaves, luz cálida, sin textos ni logos. Generada con la herramienta integrada de imágenes.

`assets/bombin.webp`: imagen ilustrativa de bombín, llaves y escudo creada con IA para el proyecto. Prompt: fotografía editorial de componentes de cierre sin marca sobre banco de trabajo oscuro; sin textos, logos ni certificaciones. Generada con la herramienta integrada de imágenes.

`assets/puerta.webp`: fotografía de cerradura inteligente procedente de Unsplash, Sebastian Scholz (Nuki), origen `https://images.unsplash.com/photo-1558002038-1055907df827`.

Todos los recursos visuales se sirven localmente. El buscador no envía consultas a terceros. No se añaden analítica, cookies publicitarias ni formularios. Las llamadas y enlaces de WhatsApp son acciones explícitas del visitante. La identificación de privacidad usa los datos aportados por el titular; conviene revisar su suficiencia antes de explotación pública.

La versión única de `package.json` se añade a CSS, JavaScript, logo y datos de búsqueda para que una actualización no siga mostrando recursos antiguos en caché.

## Auditoría SEO

La revisión de contenido y técnica está en [AUDITORIA_SEO.md](AUDITORIA_SEO.md). La portada muestra 48 municipios, 12 por provincia, configurables en `data/home-municipalities.json`. `npm run audit:seo` informa de la revisión editorial y del alcance de los callejeros oficiales; los metadatos únicos no garantizan que Google indexe cada ficha.

## Verificación

`npm run check` comprueba títulos y descripciones únicos, un H1 por página, JSON-LD válido, recursos y anclas internas, destinos de los municipios y teléfonos de cada provincia. La compilación de producción debe verificarse con el dominio definitivo antes de enviar a indexar.

## Dominio definitivo

Usar `cerrajerourgente247.com` como dominio principal en Netlify y activar su certificado HTTPS. Añadir `www.cerrajerourgente247.com` como alias. Las redirecciones HTTP y www están generadas en `_redirects`, pero DNS y TLS deben estar activos en el alojamiento. Para la vista privada compilar con `SITE_PREVIEW=1 npm run build`; para producción ejecutar `npm run build && npm run check`. Tras conectar DNS, comprobar `/`, una ficha, `/robots.txt`, `/sitemap.xml` y una ruta inexistente (404 real). Enviar `https://cerrajerourgente247.com/sitemap.xml` a Search Console una vez verificado. No se dispone de acceso al registrador ni a Search Console desde este proyecto.
