# Ceramic Artist Portfolio (Nuxt 3 + Tailwind + Snipcart)

This is a starter portfolio and simple e-commerce site for a hand-painted ceramics artist.

Quick start

1. Install dependencies

```bash
npm install
```

2. Start dev server

```bash
npm run dev
```

3. Replace the Snipcart API key in `app.vue` at the `#snipcart` container with your Snipcart public API key.

Notes

- Products live in `data/products` (image files are under `/public/images` — add your images there).
- For a production store consider Stripe/Shopify or adding server-side inventory management.

Snipcart setup

1. Create a `.env` file in the project root and add your Snipcart public API key:

```bash
SNIPCART_API_KEY=YOUR_PUBLIC_API_KEY_HERE
```

2. Start the dev server (Nuxt will expose the key to the client via runtime config):

```bash
npm run dev
```

3. Visit the site and use the "Add to cart" buttons. The Cart is available via the header "Cart" link or the Snipcart UI.

4. When deploying, set the `SNIPCART_API_KEY` environment variable in your hosting provider (Netlify, Vercel, etc.).

Notes about product URLs

- Each product's `data-item-url` should resolve to the product page (the app uses relative paths). If you deploy under a subdirectory, update `data-item-url` values to be absolute.


Netlify CMS (file-based admin)

This project includes a simple Netlify CMS setup to manage product files stored in `data/products`.

- Admin UI: `/admin/` (served from `public/admin/index.html`)
- Configure Netlify Identity and enable Git Gateway in Netlify to allow CMS to commit changes.
- Product files are stored as JSON in `data/products/*.json` and are loaded at build-time.

To enable locally, follow Netlify CMS docs and deploy to Netlify with Identity + Git Gateway enabled.
