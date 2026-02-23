# Ceramic Artist Portfolio (Nuxt 3 + Tailwind)

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

Notes

- Products live in `data/products.json` (image files are under `/public/images` — add your images there).
- For a production store consider Stripe/Shopify or adding server-side inventory management.

Cart status

- Cart/checkout integration is currently disabled.
- The product purchase buttons are shown as "Coming soon" placeholders.
- No Snipcart API key is required for deployment in the current state.

Re-enable cart later

1. Add `SNIPCART_API_KEY` to your local `.env` and your hosting provider env vars.
2. In `nuxt.config.js`, add Snipcart CSS/JS back under `app.head`.
3. In `app.vue`, restore the `#snipcart` container with the runtime API key binding.
4. In `components/Header.vue`, `components/ProductCard.vue`, and `pages/product/[slug].vue`, restore the Snipcart checkout/add-item classes and data attributes.
5. Redeploy and verify cart/checkout behavior.

Chatbot email setup

The site now includes a floating chatbot widget that can send the chat transcript to your email.

Add these environment variables in `.env` (local) and in your hosting provider (production):

```bash
CHATBOT_MAIL_HOST=smtp.yourprovider.com
CHATBOT_MAIL_PORT=587
CHATBOT_MAIL_USER=your-smtp-user
CHATBOT_MAIL_PASS=your-smtp-password
CHATBOT_MAIL_FROM="Art & About <no-reply@yourdomain.com>"
CHATBOT_MAIL_TO=pupkovateodora@gmail.com
```

Then restart the dev server:

```bash
npm run dev
```


Custom CMS (built into this app)

This project includes a simple custom CMS page to manage products directly.

- Admin UI: `/cms`
- API endpoint: `/api/cms/products`
- Section content endpoint: `/api/cms/site-content`
- Categories endpoint: `/api/cms/categories`
- Data file: `data/products.json`
- Section data file: `data/site-content.json`
- Categories data file: `data/product-categories.json`

Set a password in `.env`:

```bash
CMS_PASSWORD=YOUR_STRONG_PASSWORD
```

For Vercel persistence, also set:

```bash
BLOB_READ_WRITE_TOKEN=YOUR_VERCEL_BLOB_RW_TOKEN
```

When `BLOB_READ_WRITE_TOKEN` is set, CMS content and uploads are stored in Vercel Blob.
Without it, local filesystem storage is used.

CMS storage health check

Use this endpoint to verify auth and storage mode after deploy:

```bash
/api/health/cms-storage?password=YOUR_CMS_PASSWORD
```

It returns whether CMS auth works and whether storage is using `vercel-blob` or `local-filesystem`.

Restart the app and open `/cms`.

Legacy note

- `public/admin/index.html` and `public/admin/config.yml` are kept only as legacy references and are not used by the active CMS flow.
