# Auditoría SEO · Landing de Mía

Revisión del 13/11/2026 sobre el código de `main` (con los cambios sin commit de esta etapa) y la web publicada en `mia-neon-two.vercel.app`. Se recorrió la página renderizada en desktop (1440 px) y en mobile (375 px), el build de producción y las páginas legales.

Cada punto tiene prioridad, qué pasa, por qué importa y cómo se corrige.

| Prioridad | Qué significa |
| --- | --- |
| 🔴 Crítica | Impide o limita mucho que Google (y otros) indexen y muestren bien la web |
| 🟠 Alta | Afecta posicionamiento, Core Web Vitals o cómo se ve la web al compartirla |
| 🟡 Media | Mejora real, pero no bloquea |
| ⚪ Baja | Detalle o limpieza |

## Estado al 13/11/2026

Se hizo todo lo que depende del código. **Nada está publicado**: se sube junto con el cambio de DNS del lunes.

**Hecho**
- Prerender de las cuatro páginas (1), `robots.txt` y `sitemap.xml` (2).
- Canonical, Open Graph con imagen propia ([og-mia.jpg](public/og-mia.jpg)) y datos estructurados en el `<head>` (3, 4, 5).
- Título y descripción nuevos (6): «Mía · Consultora para empresarias en Barcelona».
- Intro una sola vez por visita, sin parpadeo del telón al volver (7).
- Fotos en dos tamaños con `srcset` (el celular baja la de 900 px) y medidas en los logos (8).
- Espacios en el H1 y en los títulos numerados; «Hacer operativo lo sensible» como H3; el perfil del equipo con H2 (9, 10).
- Favicon ICO, íconos PNG, `site.webmanifest` y página 404 propia (12, 13).
- Animaciones en su versión liviana y cargadas aparte (14).
- Formspree nombrado en la política de privacidad (15).
- Borrados los doce archivos sin uso; el build bajó 306 KB (18).

**Para el lunes, con el DNS** (en el panel de Vercel, no en el código)
1. Agregar `miaconsultora.es` y `www.miaconsultora.es` al proyecto; dejar `miaconsultora.es` como principal y `www` redirigiendo (308) a ella.
2. Redirigir `mia-neon-two.vercel.app` al dominio. Se puede agregar en [vercel.json](vercel.json) un redirect con `"has": [{ "type": "host", "value": "mia-neon-two.vercel.app" }]`, **recién cuando el dominio ya responda**, para no mandar a la gente a la web vieja.
3. Verificar el dominio en Google Search Console y enviar `https://miaconsultora.es/sitemap.xml`.
4. Probar la vista previa al compartir con <https://www.opengraph.xyz/> y los datos estructurados con <https://search.google.com/test/rich-results>.

**Pendiente de Marina**
- NIF para el aviso legal y la política de privacidad.
- Lucía con o sin tilde (en la web va sin; en LinkedIn, con).
- Validar las palabras clave del título y la descripción.

**Opcional**
- Teléfono del footer: hoy llama (en Mac abre FaceTime); en Contacto ya va a WhatsApp.
- `preload` del video del hero: pasarlo de `auto` a `none` libera red para la foto principal, pero retrasa el arranque de la película (18).

---

## Resumen

| # | Punto | Prioridad |
| --- | --- | --- |
| 1 | ~~El HTML llega vacío: todo el contenido depende de JavaScript~~ ✅ Resuelto | 🔴 |
| 2 | ~~No hay `robots.txt` ni `sitemap.xml`~~ ✅ Resuelto | 🔴 |
| 3 | Dominio: `miaconsultora.es` sirve la web vieja y no hay canonical — **🟡 Código listo (canonical); falta el lunes: DNS y redirecciones en Vercel** | 🔴 |
| 4 | Sin Open Graph ni imagen para compartir — **✅ Resuelto** | 🟠 |
| 5 | Sin datos estructurados (Schema.org) — **✅ Resuelto** | 🟠 |
| 6 | Título sin palabras clave ni ubicación; descripción un poco larga — **✅ Resuelto (validar palabras clave con Marina)** | 🟠 |
| 7 | La intro retrasa el contenido principal (LCP) en cada visita — **✅ Resuelto** | 🟠 |
| 8 | Imágenes sin `width`/`height` ni versiones por tamaño — **✅ Resuelto** | 🟠 |
| 9 | El H1 se lee sin espacios («sólidade dirigirtu») — **✅ Resuelto** | 🟡 |
| 10 | Jerarquía de encabezados: correcta, con ajustes menores — **✅ Resuelto** | 🟡 |
| 11 | Textos alternativos de imágenes — **✅ Revisado (falta Lucia / Lucía)** | 🟡 |
| 12 | Favicon solo en SVG; falta ícono para Apple y manifest — **✅ Resuelto** | 🟡 |
| 13 | Sin página 404 propia — **✅ Resuelto** | 🟡 |
| 14 | Paquete de JavaScript grande y fuentes sin precargar — **✅ Resuelto** | 🟡 |
| 15 | Páginas legales: NIF pendiente y números pegados a los títulos — **🟡 Falta el NIF** | 🟡 |
| 16 | Search Console, perfil de Google y medición — **⏳ Después del lunes** | 🟡 |
| 17 | Enlaces: todo bien, con dos detalles — **⏳ Decidir el teléfono del footer** | ⚪ |
| 18 | Archivos sin uso y videos — **✅ Resuelto (falta decidir el `preload` del video del hero)** | ⚪ |

---

## 🔴 1. El HTML llega vacío: todo el contenido depende de JavaScript

> ✅ **Resuelto.** `npm run build` ahora prerenderiza las cuatro páginas: compila el sitio, compila
> [entry-server.tsx](src/entry-server.tsx) para Node y [scripts/prerender.mjs](scripts/prerender.mjs) escribe el HTML
> dentro de `#root`. En el navegador, [montar.ts](src/lib/montar.ts) hidrata ese HTML (en desarrollo, renderiza
> desde cero). El HTML sale con la versión mobile y, al hidratar, cada parte pasa a la del tamaño real.
> Lo que sigue es el diagnóstico original.

**Qué pasa.** `index.html` solo trae `<div id="root"></div>`. Los títulos, los textos y los enlaces aparecen cuando se ejecuta el JavaScript (React). En el HTML que se descarga hay **0** encabezados.

**Por qué importa.**
- Google renderiza JavaScript, pero en una segunda pasada, más lenta y no siempre completa.
- Bing, los buscadores con IA (ChatGPT, Perplexity) y las vistas previas de WhatsApp, LinkedIn o Instagram **no ejecutan JavaScript**: ven una página en blanco.

**Cómo se corrige.** Prerenderizar la página al compilar: generar en el build un `index.html` que ya traiga todo el contenido, y que después React «tome» en el navegador (hidratación). Con Vite hay dos caminos:
- un script de build con `react-dom/server` (`renderToString`) que escribe el HTML dentro de `#root` y cambia `createRoot` por `hydrateRoot` en [main.tsx](src/main.tsx);
- un plugin de prerender (por ejemplo `vite-prerender-plugin`).

Lo mismo vale para las tres páginas legales.

> Ojo: varias partes se deciden con `useMediaQuery` (desktop o mobile) y eso no existe al prerenderizar. Hay que elegir qué versión va en el HTML (conviene la de mobile, porque Google indexa primero mobile) o resolver esas diferencias con CSS.

---

## 🔴 2. No hay `robots.txt` ni `sitemap.xml`

> ✅ **Resuelto.** Están en [public/robots.txt](public/robots.txt) y [public/sitemap.xml](public/sitemap.xml), con el
> dominio `https://miaconsultora.es` (sin `www`). Si se elige la versión con `www` en el punto 3, hay que cambiarlo
> en los dos archivos. Al sumar una página, agregarla al sitemap.

**Qué pasa.** En producción, `/robots.txt` y `/sitemap.xml` devuelven 404. En `public/` solo está `favicon.svg`.

**Cómo se corrige.** Crear los dos archivos en `public/`, con el dominio definitivo:

`public/robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://miaconsultora.es/sitemap.xml
```

`public/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://miaconsultora.es/</loc></url>
  <url><loc>https://miaconsultora.es/aviso-legal</loc></url>
  <url><loc>https://miaconsultora.es/privacidad</loc></url>
  <url><loc>https://miaconsultora.es/cookies</loc></url>
</urlset>
```

---

## 🔴 3. Dominio: `miaconsultora.es` sirve la web vieja y no hay canonical

> 🟡 **Código listo.** Las cuatro páginas tienen su canonical en `https://miaconsultora.es`. Falta, el lunes, conectar el dominio y las redirecciones en el panel de Vercel (ver «Estado» arriba).

**Qué pasa.**
- `miaconsultora.es` y `www.miaconsultora.es` todavía muestran el sitio anterior («Home - miaconsultora.es»). La landing nueva solo está en `mia-neon-two.vercel.app`.
- Ninguna página declara su URL canónica.

**Por qué importa.** Google puede indexar la versión `vercel.app` como si fuera la oficial y repartir la autoridad entre dos dominios con contenido distinto.

**Cómo se corrige.**
1. Conectar `miaconsultora.es` al proyecto en Vercel.
2. Elegir una versión (con o sin `www`) y redirigir la otra con un 301. Hacer lo mismo con `mia-neon-two.vercel.app` hacia el dominio.
3. Agregar el canonical en cada HTML:
   - `index.html`: `<link rel="canonical" href="https://miaconsultora.es/" />`
   - `aviso-legal.html`, `privacidad.html` y `cookies.html`: su propia URL, sin `.html`.
4. Si la web vieja tenía páginas con tráfico, redirigirlas (301) a la sección equivalente de la nueva.

---

## 🟠 4. Sin Open Graph ni imagen para compartir

> ✅ **Resuelto.** Etiquetas `og:` y `twitter:` en las cuatro páginas, con la imagen [og-mia.jpg](public/og-mia.jpg) (1200 × 630). Se prueba en vivo cuando el dominio esté publicado.

**Qué pasa.** No hay etiquetas `og:` ni `twitter:`. Al compartir el enlace por WhatsApp, LinkedIn o Instagram sale sin imagen y con datos incompletos. Por el punto 1, ni siquiera se ve el texto.

**Cómo se corrige.** Agregar en el `<head>` de [index.html](index.html), y en las legales con sus datos:

```html
<meta property="og:type" content="website" />
<meta property="og:locale" content="es_ES" />
<meta property="og:site_name" content="Mía" />
<meta property="og:title" content="Mía · Consultora para empresarias en Barcelona" />
<meta property="og:description" content="Acompañamos a empresarias a consolidar su posición en la dirección de sus negocios." />
<meta property="og:url" content="https://miaconsultora.es/" />
<meta property="og:image" content="https://miaconsultora.es/og-mia.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Mía, consultora para empresarias" />
<meta name="twitter:card" content="summary_large_image" />
```

Falta diseñar la imagen `public/og-mia.jpg`: 1200 × 630 px, JPG, con el logo sobre el burdeos o sobre la foto del hero.

---

## 🟠 5. Sin datos estructurados (Schema.org)

> ✅ **Resuelto.** JSON-LD `ProfessionalService` en [index.html](index.html). Validado en validator.schema.org: 0 errores, 0 advertencias. Con el dominio publicado, repetir en la prueba de resultados enriquecidos de Google.

**Qué pasa.** No hay JSON-LD. Google no tiene cómo saber, de forma explícita, que Mía es un negocio de servicios en Barcelona, con dirección, teléfono, redes y servicios.

**Cómo se corrige.** Agregar un bloque en [index.html](index.html):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Mía",
  "description": "Consultora para empresarias: mentoría y acompañamiento a la dirección de empresas.",
  "url": "https://miaconsultora.es/",
  "logo": "https://miaconsultora.es/logo-mia.png",
  "image": "https://miaconsultora.es/og-mia.jpg",
  "email": "contacto@miaconsultora.es",
  "telephone": "+34610227804",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Avinguda Diagonal 534, entresuelo izquierda, despacho 27",
    "postalCode": "08006",
    "addressLocality": "Barcelona",
    "addressCountry": "ES"
  },
  "areaServed": "ES",
  "founder": { "@type": "Person", "name": "Marina Elena Nicolai", "sameAs": "https://www.linkedin.com/in/marinanicolai" },
  "sameAs": ["https://www.instagram.com/miaconsultora.es"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Punto de Partida Mía" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mentoría Mía" } }
    ]
  }
}
</script>
```

Después de publicarlo, validarlo en <https://search.google.com/test/rich-results>.

---

## 🟠 6. Título sin palabras clave ni ubicación; descripción un poco larga

> ✅ **Resuelto.** Título: «Mía · Consultora para empresarias en Barcelona» (46 caracteres). Descripción: «Acompañamos a empresarias a consolidar la dirección de su negocio, tomar decisiones con criterio y abrir nuevas posibilidades. Barcelona y online.» (146 caracteres). Confirmar con Marina que el trabajo online es real.

**Qué pasa.**
- `<title>`: «Mía · Consultora para empresarias» (33 caracteres). Está bien, pero no dice qué hace Mía ni dónde. Alguien que busca «mentoría para empresarias Barcelona» no encuentra esas palabras en el título.
- `meta description`: 171 caracteres. Google corta alrededor de 155–160, así que el final («…posibilidades de acción») no se ve.

**Cómo se corrige.** Con la clienta, validar palabras clave reales (mentoría, consultoría, empresarias, dirección, Barcelona). Por ejemplo:
- Título: «Mía · Mentoría y consultoría para empresarias en Barcelona» (58 caracteres).
- Descripción: «Acompañamos a empresarias a consolidar la dirección de su negocio, tomar decisiones con criterio y abrir nuevas posibilidades. Barcelona y online.» (148 caracteres; «online» solo si es real).

---

## 🟠 7. La intro retrasa el contenido principal (LCP) en cada visita

> ✅ **Resuelto.** Medido con Lighthouse en modo celular, sobre el build local:
>
> | | Antes | Ahora |
> | --- | --- | --- |
> | Rendimiento | 56 | 89 |
> | LCP (red y CPU limitadas) | 7,2 s | 2,3 s |
> | Bloqueo del hilo principal (TBT) | 2.180 ms | 60 ms |
> | CLS | 0,075 | 0,075 |
>
> Qué se hizo:
> - La intro se ve una vez por visita (`sessionStorage`); al volver, un script del `<head>` la oculta antes de pintar.
> - Su entrada (logo, filete, descriptor, brillo) pasó a CSS: arranca sin esperar al JavaScript. Se sacó la animación del espaciado de letras y la escala del brillo, que eran las que bloqueaban.
> - La foto del hero está pintada desde el principio, debajo del telón (antes se recortaba hasta que terminaba la intro).
> - La foto del hero en mobile pasó de 144 KB a 54 KB.
> - Los videos se descargan cuando hacen falta: el del hero al terminar la intro; el de «Hacer operativo lo sensible» (1,8 MB) cuando la franja está a una pantalla.
>
> Accesibilidad da 96 por las palabras tenues del texto que se enciende con el scroll en Sobre Mía: es parte del diseño. Con la web publicada, repetir la medición en PageSpeed Insights.

**Qué pasa.** El H1 y la foto del hero quedan ocultos hasta que termina la intro del logo, unos 2,8 s, y eso sucede en **todas** las visitas. A eso se suma que antes tiene que cargar y ejecutarse el JavaScript (punto 1).

**Por qué importa.** El LCP (cuánto tarda en verse el contenido principal) es una de las Core Web Vitals que usa Google para posicionar. Por encima de 2,5 s se considera «a mejorar».

**Cómo se corrige.**
- Mostrar la intro solo en la primera visita de la sesión, guardándolo en `sessionStorage` desde [Intro.tsx](src/components/marca/Intro.tsx).
- Que el H1 esté en el HTML desde el principio (punto 1), aunque la animación lo descubra después. Así el navegador lo pinta antes.
- Medir con PageSpeed Insights (<https://pagespeed.web.dev/>) antes y después.

---

## 🟠 8. Imágenes sin `width`/`height` ni versiones por tamaño

> ✅ **Resuelto.** Versiones de 900 px con `srcset` en las fotos de «Cuándo», Servicios y la textura; medidas en los logos. Las demás fotos ocupan cajas de tamaño fijo por CSS y no mueven la página. Las fotos del hero bajaron de 144 y 153 KB a 54 KB cada una. Lighthouse no marca ningún aviso de imágenes ni en celular ni en desktop (desktop: rendimiento 99, LCP 0,8 s, CLS 0).

**Qué pasa.**
- Ninguna `<img>` tiene `width` y `height`. Mientras cargan, el navegador no sabe cuánto lugar reservar y la página puede «saltar» (CLS, otra Core Web Vital).
- Cada foto existe en un solo tamaño y el celular descarga la grande. Por ejemplo, en «Cuándo» cada foto mide 1774 × 887 px: `cuando-cuaderno.webp` pesa 244 KB y `cuando-libros.webp` 192 KB, para mostrarse a 375 px de ancho.

**Cómo se corrige.**
- Pasar `width` y `height` reales en [Picture.tsx](src/components/ui/Picture.tsx) y donde se usa `<img>`. Sirven las medidas originales: el CSS sigue mandando en el tamaño visible.

  | Imagen | Medida |
  | --- | --- |
  | `cuando-*.webp` | 1774 × 887 (libros: 1672 × 941) |
  | `equipo-*.webp` | 900 × 1125 |
  | `servicio-mentoria.webp` | 1345 × 1170 |
  | `servicio-punto-partida.webp` | 1117 × 1408 |
  | `hero-llave-cinta.webp` | 1672 × 941 |
  | `hero-llave-cinta-mobile.webp` | 1086 × 1448 |
  | `bn-textura.webp` | 1536 × 1024 |

- Generar dos o tres anchos por foto (por ejemplo 640, 1024 y 1600) y usar `srcset` + `sizes`, por ejemplo con `vite-imagetools`.

---

## 🟡 9. El H1 se lee sin espacios («sólidade dirigirtu»)

> ✅ **Resuelto.** Espacios en el H1, en la frase de lo sensible y entre número y título. Además, en el hero, entre las versiones mobile y desktop del párrafo y del botón («…su negocio. Acompañamos…», «Hablemos Conversemos…»), que están las dos en el HTML. Se revisó el texto completo de las cuatro páginas y no quedan palabras pegadas.

**Qué pasa.** Cada línea del título del hero es un `<span>` aparte y entre ellos no hay espacio. Visualmente se ve bien, pero el texto que leen Google y los lectores de pantalla es:
- desktop: «Una forma sólida**de** dirigir tu empresa»
- mobile: «Una forma sólida**de** dirigir**tu** empresa»

**Cómo se corrige.** En [Hero.tsx](src/sections/Hero.tsx), agregar `{' '}` entre cada `<Line>`, o un espacio al final del texto de cada línea.

Pasa lo mismo, con menos peso, en otros lugares:
- Los subtítulos de los complementos en mobile: «02.1Construcción de equipos».
- Los títulos de las páginas legales: «01Responsable del tratamiento».

Ahí el número va pegado al texto. Conviene marcar el número con `aria-hidden` o separarlo con un espacio.

---

## 🟡 10. Jerarquía de encabezados: correcta, con ajustes menores

> ✅ **Resuelto.** «Hacer operativo lo sensible» es H3 y el perfil del equipo usa H2. Verificado en el HTML generado de las cinco páginas (landing, tres legales y 404): un solo H1 cada una y ningún nivel salteado. Quedan como decisión de contenido, no técnica: los H2 poéticos sin palabras clave y los títulos más cortos de Contacto en mobile.

**Qué está bien.**
- Hay un solo H1.
- Cada sección empieza con un H2.
- **No se saltea ningún nivel** (siempre H1 → H2 → H3 → H4).
- Los rótulos chicos («Sobre Mía», «Servicios», «Metodología»…) son párrafos, no encabezados, y está bien que así sea.

Estructura actual (desktop):

```
H1  Una forma sólida de dirigir tu empresa
  H2  Comprender una dificultad es importante; saber intervenir sobre ella, es fundamental
    H3  Una manera de mirar, antes que una consultora
      H4  Dirección y coordinación
  H2  Dirigir una empresa, algunas veces, puede sentirse como un camino demasiado solitario
    H3  La empresa depende demasiado de ti… (y las otras 4 situaciones)
  H2  Una propuesta para cada momento de tu empresa
    H3  Punto de Partida Mía
    H3  Mentoría Mía
    H3  Complementos de Mentoría Mía
      H4  Construcción de equipos · Intervención en equipos · Desarrollo y expansión
  H2  Cómo trabajamos
    H3  Conocemos tu punto de partida… (y las otras 4 etapas)
  H2  Hablemos de tu empresa
    H3  ¿Quieres comenzar por una situación concreta?
    H3  ¿Quieres conocer nuestras propuestas de acompañamiento?
```

**Ajustes sugeridos.**
- **H2 sin palabras clave.** Los H2 de «Sobre Mía» y «Cuándo» son frases poéticas. No hace falta cambiarlas, pero no suman nada para búsquedas. Una opción es que los rótulos de arriba lleven la palabra clave y queden dentro del H2 («Sobre Mía: consultora para empresarias»), o sumar palabras clave en los párrafos que siguen.
- **«Hacer operativo lo sensible»** es uno de los mensajes centrales y hoy es un `<blockquote>` sin encabezado. Podría ser un H3 dentro de Sobre Mía.
- **Nombres del equipo.** Marina y Lucía no son encabezados en la página; solo lo son dentro del panel de perfil, que se abre como diálogo y usa H4. Dentro de un diálogo conviene empezar en H2. Sus nombres y roles podrían ser H5 bajo «Dirección y coordinación», o quedar como texto: es una decisión menor.
- **Mobile indexa otro texto.** En mobile, los H3 de Contacto son otros («Trabajemos una situación concreta», «Conoce nuestras propuestas»). Google indexa con la versión mobile, así que esos son los títulos que cuentan. Revisar que digan lo que se quiere posicionar.
- **Complementos ocultos en mobile.** En mobile, el bloque «Complementos de Mentoría Mía» (H3 y H4) está oculto con `display: none` y su contenido se ve de forma resumida dentro de la tarjeta. El contenido oculto pesa menos para Google.

---

## 🟡 11. Textos alternativos de imágenes

> ✅ **Revisado.** Las fotos del hero y de «Cuándo» siguen sin alt: son fondos detrás del texto. Falta decidir **Lucia / Lucía**.

| Imagen | `alt` actual | Recomendación |
| --- | --- | --- |
| Foto del hero | `""` (decorativa) | Correcto si es solo ambiente. Es la imagen más visible: un alt descriptivo («Llave antigua con cinta burdeos sobre seda») suma en Google Imágenes |
| Fotos de «Cuándo» (5) | `""` | Acompañan cada situación: conviene describirlas brevemente |
| Retratos del equipo | «Retrato de Marina Elena Nicolai» / «Retrato de Lucia Carolina Nicolai» | Bien. Unificar **Lucia / Lucía**: en la web va sin tilde y en LinkedIn con tilde |
| Fotos de Servicios | descriptivos | Bien |
| Logo del header | `""` dentro de un enlace con `aria-label="Mía, ir al inicio"` | Correcto |
| Logo del footer | «Mía, consultora para empresarias» | Bien |
| «a» de fondo, textura | `""` | Correcto (decorativas) |

---

## 🟡 12. Favicon solo en SVG; falta ícono para Apple y manifest

> ✅ **Resuelto.** `favicon.ico`, `apple-touch-icon.png`, `icon-192/512.png` y `site.webmanifest` en `public/`.

**Qué pasa.** Solo existe `favicon.svg`. Google muestra un favicon junto al resultado de búsqueda y recomienda que sea un múltiplo de 48 px. Safari e iOS (al guardar en la pantalla de inicio) necesitan un PNG.

**Cómo se corrige.** Agregar a `public/` estos archivos y enlazarlos en el `<head>` de los cuatro HTML:
- `favicon.ico` (48 × 48)
- `apple-touch-icon.png` (180 × 180)
- `icon-192.png` y `icon-512.png`
- `site.webmanifest` con nombre, colores (`#4F0B12`) e íconos

---

## 🟡 13. Sin página 404 propia

> ✅ **Resuelto.** [public/404.html](public/404.html), con `noindex`.

**Qué pasa.** Una URL que no existe muestra la página 404 genérica de Vercel, en inglés y sin enlaces a la web.

**Cómo se corrige.** Crear un `404.html` con la estética de Mía, un enlace al inicio y `<meta name="robots" content="noindex">`, y sumarlo a las entradas del build en [vite.config.ts](vite.config.ts). Vercel lo usa solo.

---

## 🟡 14. Paquete de JavaScript grande y fuentes sin precargar

> ✅ **Resuelto.**
> - Las animaciones usan la versión liviana de motion (`LazyMotion` con `domAnimation` y componentes `m.`), y sus funciones llegan en un archivo aparte ([lib/animaciones.ts](src/lib/animaciones.ts)) que no frena la primera carga. Lo que se descarga al entrar bajó de 145 KB a 131 KB comprimidos.
> - Lo que queda es sobre todo React (203 KB sin comprimir), que es la base de la web.
> - **Las fuentes se dejan sin precargar, a propósito.** Se probó precargar la del título y competía con la foto del hero: sin precarga el contenido principal aparece a los 2,1 s en lugar de 2,6 s (Lighthouse en celular, red y CPU limitadas; rendimiento 90). Además el título está oculto bajo la intro mientras carga la letra, así que el cambio de tipografía no se ve. Precargar empeoraba la métrica sin mejorar nada visible: la recomendación de abajo quedó descartada con datos.
> - CLS 0,094, dentro de lo bueno (el límite es 0,1). Lo produce la letra caligráfica de «fundamental» en Sobre Mía al terminar de cargar.

**Qué pasa.**
- El JavaScript principal pesa 405 KB (130 KB comprimido) y se carga entero antes de mostrar nada. La mayor parte es React y la librería de animaciones (motion).
- Las fuentes (Cormorant Garamond, Inter, WindSong) se sirven desde el propio sitio con `font-display: swap`, y eso está bien. Pero no se precargan, así que el título puede verse primero con otra letra y después cambiar.

**Cómo se corrige.**
- Precargar en el `<head>` el archivo latino de Cormorant (el del H1). Con Vite hay que tomar el nombre del archivo generado en el build, o copiar ese archivo a `public/` para tener una ruta fija:
  ```html
  <link rel="preload" href="/fonts/cormorant-garamond-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin />
  ```
- Cargar de forma diferida lo que no se ve al entrar: el formulario, el panel de perfiles y los complementos (`React.lazy`).
- Importar motion con `LazyMotion` + `m` en lugar de `motion`, que reduce bastante su peso.

---

## 🟡 15. Páginas legales: NIF pendiente y números pegados a los títulos

> 🟡 **En parte.** Números separados de los títulos y Formspree nombrado en la privacidad. Falta el **NIF**.

**Qué está bien.** Cada página tiene su propio `title` y `description`, un H1 y H2 en orden.

**Qué falta.**
- **«[NIF pendiente]»** se ve publicado en la política de privacidad y en el aviso legal. Hay que completarlo con Marina, porque es obligatorio por la LSSI.
- Números pegados a los títulos en el texto que lee Google («01Responsable del tratamiento»). Ver punto 9.
- Agregar el canonical (punto 3). Estas páginas no aportan posicionamiento; si se prefiere, se les puede poner `noindex`, pero siempre accesibles desde el footer.
- La política de privacidad menciona «el proveedor del servicio que recibe los mensajes del formulario» sin nombrarlo. Conviene nombrar a **Formspree** (Formspree Inc., EE. UU.), igual que se nombra a Vercel.

---

## 🟡 16. Search Console, perfil de Google y medición

> ⏳ **Después del lunes**, con el dominio publicado.

No es código, pero es parte del SEO:
- **Google Search Console**: verificar el dominio cuando esté conectado, enviar el sitemap y revisar la indexación y las Core Web Vitals reales.
- **Bing Webmaster Tools**: puede importar la configuración de Search Console.
- **Perfil de Empresa de Google** (Google Maps) con la misma dirección, el mismo teléfono y la misma web que en la página. Para búsquedas locales («consultora empresarias Barcelona») pesa más que casi cualquier ajuste on-page.
- **Medición**: hoy no hay analítica. Vercel Web Analytics no usa cookies y no exige banner. Google Analytics sí exigiría el banner de cookies y actualizar la política de cookies.

---

## ⚪ 17. Enlaces: todo bien, con dos detalles

> ⏳ **Pendiente de decidir** si el teléfono del footer también va a WhatsApp.

**Qué está bien.**
- No hay enlaces rotos ni `href="#"`. Las anclas internas (`#inicio`, `#sobre-mia`, `#cuando`, `#servicios`, `#metodologia`, `#contacto`, `#reservar`, `#escribenos`) apuntan a secciones que existen.
- Los enlaces externos (WhatsApp, Instagram, LinkedIn, Google Maps) abren en otra pestaña con `rel="noopener noreferrer"`.
- No hay IDs duplicados y todos los botones tienen nombre accesible.

**Detalles.**
- El teléfono del footer usa `tel:`, que en Mac abre FaceTime. En Contacto ya se cambió a WhatsApp: decidir si el footer va igual.
- Los textos de enlace del menú son genéricos («Inicio», «Cuándo»). Está bien para navegar; no afecta.

---

## ⚪ 18. Archivos sin uso y videos

> ✅ **Resuelto.** Borrados los doce archivos que no se usaban; el build bajó 306 KB.

**Qué se borró.**
- Las cuatro portadas descartadas: `hero-esfera`, `hero-velo`, `hero-seda`, `hero-llave`. Se importaban en [portada.ts](src/lib/portada.ts) y por eso entraban al build (306 KB) aunque nadie las viera. De paso, `portada.ts` quedó con la portada definitiva y sin el menú de alternativas.
- Cuatro fotos viejas que ya nadie importaba: `bn-portada`, `bn-sillon-carpeta`, `bn-servicio-direccion`, `bn-servicio-lectura`.
- Cuatro logos del manual que la web no usa: `isotipo_mia_principal`, `isotipo_mia_negativo`, `logo_mia_primario_descriptor`, `logo_mia_primario_negativo_con_descriptor`. No entraban al build, pero sobraban en el repositorio. En `src/assets/brand/` quedan los cuatro que sí se usan: `logo_mia_principal`, `logo_mia_negativo`, `a_mia_burdeos` y `a_mia_crema`.

Todos están en el historial de git, así que se recuperan si alguna vez hacen falta.

**Qué se dejó, y por qué.**
- Videos: la franja «Hacer operativo lo sensible» usa `preload="metadata"` y está bien. El del hero usa `preload="auto"`; pasarlo a `preload="none"` liberaría red para la foto principal, pero retrasaría el arranque de la película, que se afinó a mano para que se vea desde el primer cuadro. **Decisión pendiente**, con ese costo sobre la mesa.

---

## Orden sugerido de trabajo

1. **Antes de publicar en el dominio:** puntos 2, 3, 4, 6 y 15 (NIF). Son rápidos y evitan indexar mal desde el primer día.
2. **Primera mejora técnica:** puntos 1 (prerender) y 7 (intro). Son los que más mueven la visibilidad y la velocidad.
3. **Después:** puntos 5, 8, 9, 11, 12 y 13.
4. **Con la web ya en el dominio:** punto 16, y medir con PageSpeed Insights y Search Console.
