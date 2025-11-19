# Conexión — Scaffold inicial

Scaffold inicial para Conexión: plataforma para conectar profesionales de oficios con clientes.

Stack:
- Frontend: Next.js
- Auth: NextAuth.js (Credentials + providers opcionales)
- DB: MongoDB (Mongoose)
- Pagos: Stripe (suscripciones)
- Mapas: Mapbox

Instrucciones rápidas:
1. Copia estos archivos en el repo (o acepta que yo haga push).
2. Crea un `.env.local` basado en `.env.example`.
3. npm install
4. npm run seed
5. npm run dev

Variables importantes en `.env.local`:
- MONGODB_URI
- NEXTAUTH_URL
- NEXTAUTH_SECRET
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- NEXT_PUBLIC_MAPBOX_TOKEN (o MAPBOX_TOKEN)

Seed:
- Ejecutar: `npm run seed` (esto creará usuarios y perfiles demo)

CI:
- `.github/workflows/ci.yml` ejecuta `npm ci` y `npm run build` en ramas `main` y `scaffold/*`.

Notas:
- No incluyas claves reales en commits. Usa placeholders en `.env.example`.
- Para probar webhooks de Stripe localmente usa `stripe-cli` o túneles.