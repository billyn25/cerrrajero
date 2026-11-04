# Cerrajería: cobertura y revisión editorial — 4 noviembre 2026

431 municipios conservados en el directorio y el buscador. 161 páginas municipales propias, 270 localidades agrupadas. Sitemap de producción: 177 URLs, frente a las 445 anteriores. Incluye ahora las dos páginas de información y privacidad que ya eran indexables y estaban fuera del sitemap anterior.

| Provincia | Municipios | Páginas propias |
|---|---:|---:|
| Álava | 51 | 9 |
| Bizkaia | 113 | 35 |
| Gipuzkoa | 88 | 34 |
| Madrid | 179 | 83 |

## Selección y cobertura

Todos los municipios con al menos 5.000 habitantes mantienen página. Se conservan al menos ocho de los más poblados por provincia y se añaden referencias si hay municipios a más de 25 km de las seleccionadas. Cada pueblo agrupado se asigna al destino más próximo dentro de su provincia. Los datos se cruzan por código INE; la edición y fuente geográfica figuran en data/municipal-geography.json y coverage-manifest.json. Las distancias son en línea recta, no tiempos ni recorridos de desplazamiento.

Las variantes con barra, sin barra e index.html redirigen mediante 301 directo. El sitemap conserva las rutas de los cinco hijos originales, actualizado solo con los destinos finales. Todas las páginas conservan canonical propio. Las previews siguen cerradas a indexación.

## Revisión de contenido

- Eliminada la sección de personajes ficticios y sus retratos. La explicación práctica de problemas ya existía en el selector de diagnóstico; se conserva sin simular clientes.
- Sustituidas frases de relleno por preguntas y explicaciones concretas sobre acceso, cierre, disponibilidad y condiciones. Se mantienen las siete revisiones locales con fuente, sin atribuir trabajos, experiencia o sedes no acreditados.
- Las páginas municipales empiezan por apertura y cerraduras; después muestran calles y referencias, el aviso y las condiciones. Los títulos y H1 indican «Cerrajero urgente 24 horas en [municipio]».
- El formulario permite seleccionar los pueblos cubiertos y cargar su propio callejero. Al cambiar de pueblo se borra la referencia anterior; el mensaje y los botones de WhatsApp usan el nombre real con el número de su zona. No se envían mensajes automáticamente.
- Ocho enlaces a municipios próximos con página propia, dentro de la misma provincia. Cobertura cercana visible sin JavaScript y códigos postales de Madrid en las localidades agrupadas.

## Fotografías

Sustituidas las imágenes principales de llaves/puerta y bombines por fotografías documentadas de Pexels y Wikimedia Commons. data/media-sources.json registra autor, origen, licencia, conversión y SHA-256. Los créditos se muestran donde corresponde, incluidas las condiciones CC BY-SA 3.0. Las imágenes se publican como referencias del servicio, sin atribuirlas a trabajos del negocio ni a localidades concretas. Se conserva la foto específica de mirilla WiFi.

## Validación y límites

Compilación y comprobaciones del inventario completo antes de consolidar, pruebas de selección, auditoría final de todas las páginas y enlaces, fragmentos, schema, canonical, títulos únicos, CP, redirecciones y teléfonos. Pruebas de navegador en Chromium y WebKit a 320, 390, 768 y 1440 px: búsqueda, pueblo agrupado, callejero propio, mensaje y destinatario, menú y cobertura sin JS.

La revisión no acredita una penalización ni identifica la causa de una caída sin datos de Search Console. La apariencia «humana» no es un criterio técnico medible ni sustituye la experiencia y los trabajos reales. Google explica que el uso apropiado de IA no vulnera por sí mismo sus políticas: https://developers.google.com/search/blog/2023/02/google-search-and-ai-content . Esta intervención elimina contenido simulado y concentra información útil; no garantiza posiciones.

Tras publicar, comprobar la lectura de https://cerrajerourgente247.com/sitemap.xml y comparar impresiones, clics, consultas e indexación. No se ha presentado una solicitud de Search Console desde este proyecto.
