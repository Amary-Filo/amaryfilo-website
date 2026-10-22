# amaryfilo.com — software engineering portfolio

Personal portfolio for **Nikita Syreishchikov, Senior Software Engineer**. The site presents a consistent view of full-stack/product engineering, Angular and React, commercial fintech/Web3 work, mobile applications and technical leadership.

## Stack

Angular 21 (SSR/prerender), TypeScript, SCSS, ng-primitives, wagmi/viem. A Vercel serverless contact handler lives in `api/contact.ts`. Interactive wallet and DeFi examples are under `src/features`.

## Local development

```bash
npm ci
npm start
npm run build
```

The production build uses Angular's SSR/prerender configuration. CI runs `npm ci` and `npm run build` on pull requests.

## Content map

- `src/entities/experience/model/experience.data.ts`: one career timeline. Titles, dates and accomplishments should agree with current CVs and LinkedIn.
- `src/entities/work/model/work.data.ts`: selected **commercial and independent** projects. Each item has a summary, detailed scope, stack tags and an explicit delivery stage where necessary.
- `src/entities/demo/model/demo.data.ts`: technical demos. Do not describe a demo/mock API as a customer production system.
- `src/pages/main`: homepage overview, skills, engineering process, selected projects and contact.
- `src/pages/about`, `src/pages/works`, `src/pages/demos`: detailed pages.
- `src/app/app.routes.ts`, `src/shared/lib/seo.service.ts`, `src/index.html`: route SEO, canonical, social metadata and Person/WebPage JSON-LD.
- `public/sitemap.xml`, `public/robots.txt`: search crawl metadata.

## Editorial principles

- This is a **quiet engineering portfolio**, not a sales page. Claims should be specific, verifiable and clearly attributed.
- Independent FitnessApp is locally tested and **not publicly launched**. The Angular SSR Foundation is a reusable implementation and demo; its auth/admin APIs are mocked.
- Unlimit browser wallet extension was **internal** and was not publicly released.
- Ducatus ~10,000 refers to approximate **users**, not app downloads.
- KYB 90% manual-work reduction is **a Product Owner estimate**, not a measured third-party benchmark.
- Minto, LESS Bridge and both Axion apps were commercially launched (firsthand user confirmation). Public usage statistics and original code histories are not independently available from the restored snapshots.
- Project source links are optional because some employer repositories are private or inactive; demos and the independent Angular showcase remain accessible.
- Older standalone frontend-resume PDFs were deliberately removed from site assets rather than exposing outdated CV versions. The full CV variants are maintained separately.

## Deployment note

Publishing requires merging this PR and the existing hosting deployment. Test the preview build and external demo URL before publishing. The old PNG Open Graph artwork has not been regenerated; metadata text and route titles have been updated.
