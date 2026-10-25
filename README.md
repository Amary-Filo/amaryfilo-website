# amaryfilo.com — software engineering portfolio

Personal portfolio for **Nikita Syreishchikov, Senior Software Engineer**. Public positioning focuses on TypeScript, Angular, React, Node.js, web/mobile product delivery, frontend architecture and technical leadership.

## Stack and development

Angular 21 (SSR/prerender), TypeScript, SCSS, ng-primitives and a Vercel serverless contact endpoint at `api/contact.ts`. The interactive technical demo implementation under `src/features/` remains functional and unchanged.

```bash
npm ci
npm start
npm run build
```

CI executes `npm ci` and `npm run build` on pull requests and `master` pushes.

## Content

- `src/entities/experience/model/experience.data.ts`: commercial and independent career timeline.
- `src/entities/work/model/work.data.ts`: selected products, true delivery stages and stack.
- `src/entities/demo/model/demo.data.ts`: technical demo previews and route slugs.
- `src/app/app.routes.ts`: page titles, descriptions, canonical URLs and social images.
- `src/app/app.routes.server.ts`: Angular prerender routes.
- `src/shared/lib/seo.service.ts`: Open Graph, Twitter and JSON-LD metadata.
- `src/index.html`, `public/site.webmanifest`, `public/sitemap.xml`, `public/robots.txt`: shared metadata and crawl controls.

## Public demo routes

- `/demos/transaction-workflows`: complex connection and interaction states.
- `/demos/financial-workflows`: conditional forms, calculations and multi-step processes.

Legacy paths are redirected to their canonical URLs by Vercel. Functional interaction code and the demos' actual underlying integrations are intentionally unchanged.

## Accuracy and scope

- Independent fitness product remains in development and is not publicly launched.
- The Angular SSR Foundation is a technical implementation using mock authentication/admin data, not a launched commercial SaaS.
- The Unlimit browser extension was an internal prototype, not publicly released.
- Ducatus served approximately 10,000 users; this is not a download count.
- The roughly 90% reduction in manual KYB work is attributed to a Product Owner estimate.
- The single general SWE resume is served at `/Nikita_Syreishchikov_Senior_Software_Engineer.pdf`.
- Sector-neutral summaries describe genuine engineering work without suggesting the projects were unrelated banking or e-commerce products.

## Review checklist

Run the build, visit every prerendered route in Vercel Preview, test the contact form and verify the resume link. Check the generated HTML meta tags and social images as well as redirect behavior before merging.
