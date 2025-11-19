# Ofisio - Conexión

Conexión is a Next.js application for connecting professionals with clients, featuring authentication, geolocation search, and payment processing.

## Features

- User authentication with NextAuth.js
- Professional profile management
- Geospatial search with Mapbox integration
- Payment processing with Stripe
- MongoDB database with Mongoose ODM

## Prerequisites

- Node.js 18+ 
- MongoDB instance (local or cloud)
- Stripe account for payments
- Mapbox account for maps

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

- `MONGODB_URI` - MongoDB connection string
- `NEXTAUTH_URL` - Application URL (e.g., http://localhost:3000)
- `NEXTAUTH_SECRET` - Random secret for NextAuth.js (generate with `openssl rand -base64 32`)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `NEXT_PUBLIC_MAPBOX_TOKEN` - Mapbox public token

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

3. Seed the database (optional):
```bash
npm run seed
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with demo data

## Project Structure

```
├── components/       # React components
├── lib/             # Database connection utilities
├── models/          # Mongoose schemas
├── pages/           # Next.js pages and API routes
│   ├── api/        # API endpoints
│   ├── _app.js     # App wrapper
│   └── index.js    # Home page
├── scripts/         # Utility scripts
├── styles/          # Global styles
└── utils/           # Helper functions
```

## CI/CD

The project includes GitHub Actions workflow that runs on pushes to `main` and `scaffold/*` branches:
- Installs dependencies
- Runs build
- Runs linting

## License

Private
