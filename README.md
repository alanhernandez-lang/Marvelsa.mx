# Marvelsa — Sitio Web

Sitio web corporativo de Comercializadora Marvel S.A. de C.V.

## Stack

- **Vite** (build tool)
- **JavaScript Vanilla** (sin framework)
- **CSS3** con CSS variables

## Estructura

```
src/
├── main.js                 ← Router + entry point
├── pages/
│   ├── home.js             ← Página principal
│   ├── nosotros.js         ← Página Nosotros
│   ├── contacto.js         ← Página Contacto
│   └── brandMicrosite.js   ← Microsites de marcas (Kawashima, Parazzini, etc.)
├── components/
│   ├── Navbar.js           ← Navbar con menú hamburguesa
│   ├── Footer.js
│   ├── HeroCarousel.js
│   └── LeadForm.js
├── assets/
│   ├── images.js           ← Imports centralizados
│   ├── images/
│   └── pdfs/
├── core/
│   ├── reveal.js           ← Animaciones de scroll
│   └── tracking.js         ← Analytics (GTM/GA4/Pixel)
├── data/
│   └── brands.js           ← Datos de marcas
├── styles/
│   ├── tokens.css          ← Variables CSS (colores, tipografía)
│   ├── themes.css          ← Themes por marca
│   ├── home-enhanced.css   ← Estilos premium para Home/Nosotros/Contacto
│   └── responsive.css      ← Mobile responsive
└── style.css               ← Estilos base
```

## Comandos

```bash
# Desarrollo (servidor local con hot reload)
npm install
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## Despliegue en Vercel

1. **Sube el código a GitHub** (Vercel se conecta vía Git)

2. **En Vercel:**
   - Importa el repositorio
   - Framework Preset: **Vite**
   - Build Command: `npm run build` (autodetectado)
   - Output Directory: `dist` (autodetectado)
   - Install Command: `npm install` (autodetectado)

3. **El `vercel.json` ya está configurado** para SPA routing — todas las rutas (`/nosotros`, `/contacto`, `/kawashima`, etc.) se redirigen a `index.html`.

4. **Deploy** — listo. Vercel construirá y publicará automáticamente.

## Configuración de Analytics

Editar `src/main.js` y reemplazar los placeholders:

```js
initTracking('GTM-XXXXXX', 'G-XXXXXXXXXX', 'PIXEL_ID');
```

## Responsive

- **Desktop**: 1200px+ (diseño completo)
- **Tablet**: 768px–1024px (grids ajustados, navbar normal)
- **Mobile**: <768px (menú hamburguesa, todo apilado)
- **Small mobile**: <480px (single column en todo)

## Rutas

| Ruta | Página |
|------|--------|
| `/` | Home |
| `#/nosotros` | Nosotros |
| `#/contacto` | Contacto |
| `#/kawashima` | Microsite Kawashima |
| `#/parazzini` | Microsite Parazzini |
| `#/goldentree` | Microsite Golden Tree |
| `#/powerhunt` | Microsite Power Hunt |
| `#/takashi` | Microsite Takashi |
