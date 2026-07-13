# HALEVERSE Website

Sitio web oficial de HALEVERSE.

## Arquitectura

- App moderna en React + Vite dentro de `source/`.
- Build estático publicado en la raíz del repositorio para Cloudflare Pages.
- Assets de marca en `source/public/assets/`.
- Página de agradecimiento en `source/public/gracias.html`.

## Formulario

El formulario usa FormSubmit por HTTPS:

- Destino: `contacto@haleverse.com`
- Endpoint: `https://formsubmit.co/contacto@haleverse.com`
- Confirmación: `/gracias.html`

Nota: la primera vez que se use FormSubmit puede enviar un correo de activación a `contacto@haleverse.com`.

## SEO y material comercial

El sitio incluye:

- `robots.txt`
- `sitemap.xml`
- metadatos SEO, Open Graph y JSON-LD
- portafolio inicial en la página
- ofertas comerciales iniciales

Los documentos editables de negocio están en `business/`:

- checklist de SEO y medición
- portafolio inicial
- ofertas comerciales
- kit comercial
- roadmap de 90 días
- brochure corporativo
- tarjeta de presentación
- imágenes para WhatsApp, Instagram y Facebook

Material publicado después del deploy:

- `https://haleverse.com/brochure.pdf`
- `https://haleverse.com/media/haleverse-business-card-front.png`
- `https://haleverse.com/media/haleverse-business-card-back.png`
- `https://haleverse.com/media/haleverse-business-card.pdf`
- `https://haleverse.com/media/haleverse-whatsapp-status.png`
- `https://haleverse.com/media/haleverse-instagram-story.png`
- `https://haleverse.com/media/haleverse-facebook-story.png`
- `https://haleverse.com/media/haleverse-social-post-square.png`

## Desarrollo

```bash
pnpm install
pnpm run dev
```

## Generar producción

```bash
node node_modules/vite/bin/vite.js build source --outDir ../site-build --emptyOutDir
node scripts/copy-build-to-root.mjs
```

## Cloudflare Pages

La configuración actual puede seguir sirviendo la raíz del repositorio.

Si más adelante se desea que Cloudflare compile Vite directamente:

- Build command: `pnpm run build && pnpm run publish:local`
- Output directory: `/`

## Cloudflare Workers / Assets

Si Cloudflare despliega el sitio con Wrangler, el archivo `wrangler.jsonc` publica la carpeta generada por Vite:

- Build command: `pnpm run build`
- Assets directory: `./site-build`
- Config file: `wrangler.jsonc`
