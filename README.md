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
| `data/coverage.json` | Cuatro provincias, agrupaciones y 165 municipios |
| `build.mjs` | Estructura HTML, metadatos, JSON-LD y sitemap |
| `assets/style.css` | Diseño marfil, grafito y cobre; móvil y escritorio |
| `assets/app.js` | Menú, ayuda de averías, buscador y contacto por zona |

Teléfono norte: **641 58 93 94**. Teléfono Madrid: **614 78 99 45**. Titular indicado por el propietario: **D.C.G**. WhatsApp usa los mismos números.

La portada y las páginas generales permiten elegir el contacto. Las páginas provinciales contactan directamente con su teléfono. El directorio permite preparar la consulta de cada municipio en WhatsApp sin enviarla automáticamente.

## Dominio e indexación

El origen canónico se obtiene por orden de `SITE_URL`, `data/site.json → domain` y la variable `URL` de Netlify. Para un dominio definitivo, configurar `domain` o `SITE_URL` con el origen HTTPS, sin barra final ni rutas, y volver a desplegar. Si se cambia de dominio, añadir la redirección 301 del dominio anterior en el alojamiento.

`indexable` está habilitado. La indexación solo se activa cuando hay origen HTTPS, teléfono y titular configurados. Sin origen, la compilación local y la vista privada incorporan `noindex,follow` y un sitemap vacío para no exponer versiones duplicadas. Netlify proporciona `URL` para activar automáticamente canonical y sitemap al desplegar. Antes de enviar el sitemap a Search Console, comprobar el dominio final y que la página pública devuelva `index,follow`. Los despliegues de prueba de Netlify se excluyen de indexación.

El sitemap contiene las 13 páginas de contenido principal, no la página 404 ni las páginas auxiliares. No se incluyen fechas de actualización falsas. Los enlaces internos usan rutas estables terminadas en `/`.

## Criterio editorial y SEO

No se generan páginas cambiando únicamente el nombre del pueblo. Hay cuatro páginas provinciales y un directorio navegable de municipios. **Los municipios del directorio todavía no tienen páginas independientes:** sus enlaces apuntan a su entrada provincial y permiten preparar una solicitud local. Para crear futuras páginas municipales, incorporar información contrastada y específica del servicio real (alcance, acceso, disponibilidad, trabajos propios autorizados y preguntas locales), revisarla manualmente y enlazarla desde la provincia. No activar nuevas páginas solo para multiplicar palabras clave.

No se afirman sedes locales, reseñas, años de experiencia, precios, minutos de llegada ni trabajos de clientes que no se hayan aportado. La apertura sin daños se describe de forma condicionada. No hay `aggregateRating` ni estrellas ficticias. Los datos estructurados describen el servicio y la cobertura sin inventar direcciones. No garantizan resultados enriquecidos.

Referencias editoriales: [políticas de spam de Google](https://developers.google.com/search/docs/essentials/spam-policies?hl=es) y [orientaciones sobre contenido generado con IA](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content).

## Imágenes y privacidad

`assets/hero.webp`: imagen ilustrativa creada con IA para este proyecto, no presentada como trabajo real. Prompt: fotografía editorial horizontal de una puerta de madera oscura de vivienda europea, manilla de níquel, escudo y mano con llaves, luz cálida, sin textos ni logos. Generada con la herramienta integrada de imágenes.

`assets/puerta.webp`: fotografía de cerradura inteligente procedente de Unsplash, Sebastian Scholz (Nuki), origen `https://images.unsplash.com/photo-1558002038-1055907df827`.

Todos los recursos visuales se sirven localmente. El buscador no envía consultas a terceros. No se añaden analítica, cookies publicitarias ni formularios. Las llamadas y enlaces de WhatsApp son acciones explícitas del visitante. La identificación de privacidad usa los datos aportados por el titular; conviene revisar su suficiencia antes de explotación pública.

## Verificación

`npm run check` comprueba títulos y descripciones únicos, un H1 por página, JSON-LD válido, recursos y anclas internas, destinos de los municipios y teléfonos de cada provincia. La compilación de producción debe verificarse con el dominio definitivo antes de enviar a indexar.
