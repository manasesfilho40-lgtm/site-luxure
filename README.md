# Luxure — Estética Automotiva

Landing page premium para estúdio de estética automotiva (vitrificação, polimento, higienização, lavagem detalhada).

- **No ar:** https://luxure-live.vercel.app
- **Stack:** React 19 + Vite 7 + Tailwind 4 (build single-file)
- **Destaques:** simulador de orçamento em 3 etapas com envio via WhatsApp, galeria de detalhes em carrossel, modais acessíveis, mobile-first (bottom sheet, safe-area).

## Desenvolvimento

```bash
npm install
npm run dev
npm run build   # gera dist/ (index.html + images/)
```

## Deploy (Vercel)

```bash
npm run build
cp -r dist/* ../luxure-live/
cd ../luxure-live && vercel deploy --prod --yes
```

O alias `luxure-live.vercel.app` está travado contra auto-atribuição. Para publicar uma nova versão:

```bash
vercel alias set https://<novo-deployment>.vercel.app luxure-live.vercel.app
```
