# Mía · Landing

Landing de Mía, consultora para empresarias.

## Stack

- **Vite + React 19 + TypeScript**: una sola página, sin router.
- **Tailwind CSS v4**: los tokens de la marca (paleta, tipografías y curva de movimiento) están en `src/index.css`, dentro de `@theme`.
- **Motion** (`motion/react`): animaciones sutiles. `MotionConfig reducedMotion="user"` respeta la preferencia de "reducir movimiento" del sistema.
- **Fontsource**: Cormorant Garamond e Inter variables, servidas desde el propio dominio (sin Google Fonts).
- **clsx + tailwind-merge**: helper `cn()` en `src/lib/cn.ts`.
- **oxlint**: linter.

## Estructura

- `src/sections/`: secciones de la landing (`Hero`, `SobreMia`).
- `src/components/ui/`: piezas base (`Button`, `Container`, `Eyebrow`, `Picture`).
- `src/components/motion/`: animaciones reutilizables (`Reveal`, `ScrollRevealText`).
- `src/components/layout/`: `Header` con menú móvil.
- `src/assets/brand/`: logos SVG de la marca. El favicon (isotipo) está en `public/favicon.svg`.
- `src/assets/images/`: fotos en AVIF con JPG de respaldo. Las actuales son mockups del manual de marca, provisorias hasta tener las fotos reales.

## Formulario de contacto

El formulario envía a la URL de `VITE_FORM_ENDPOINT` (por ejemplo, Formspree). Copia `.env.example` a `.env` y completa la URL. Si queda vacía, el formulario abre el correo de la persona con el mensaje ya escrito, dirigido a `contacto@miaconsultora.es`.

Los datos de contacto (email, teléfono, WhatsApp y dirección) están en `src/lib/contacto.ts`.

## Scripts

```bash
npm run dev      # servidor de desarrollo
npm run build    # chequeo de tipos + build de producción
npm run preview  # sirve el build
npm run lint     # oxlint
```
