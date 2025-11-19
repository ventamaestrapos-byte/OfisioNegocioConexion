# OfisioNegocioConexion

A Next.js application for connecting professionals with clients through geographic search capabilities.

## Features

- User authentication with NextAuth.js
- Professional profile management with geographic search
- Stripe payment integration
- Mapbox integration for location-based services
- MongoDB database with Mongoose ODM

## Prerequisites

- Node.js 16.x or higher
- MongoDB database
- Stripe account for payment processing
- Mapbox account for mapping features

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

- `MONGODB_URI`: MongoDB connection string
- `NEXTAUTH_URL`: Application URL (e.g., http://localhost:3000)
- `NEXTAUTH_SECRET`: Secret key for NextAuth.js session encryption
- `STRIPE_PUBLIC_KEY`: Stripe publishable key
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret for webhook verification
- `NEXT_PUBLIC_MAPBOX_TOKEN`: Mapbox public access token

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

3. Seed the database with demo data (optional):
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
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with demo data

## Project Structure

```
├── components/         # React components
├── lib/               # Utility libraries (database connection, etc.)
├── models/            # Mongoose models
├── pages/             # Next.js pages and API routes
│   ├── api/          # API endpoints
│   ├── _app.js       # Custom App component
│   └── index.js      # Home page
├── scripts/          # Utility scripts (seed, etc.)
├── styles/           # CSS styles
└── utils/            # Utility functions
```

## API Endpoints

- `POST /api/auth/signup` - User registration
- `GET/POST /api/professionals` - Manage professional profiles
- `POST /api/stripe/webhook` - Stripe webhook handler

## Database Models

- **User**: User authentication and basic info
- **ProfessionalProfile**: Professional profiles with geographic location (2dsphere index)

## CI/CD

GitHub Actions workflow runs on:
- Push to `main` branch
- Push to `scaffold/*` branches

The workflow performs:
- Dependency installation
- Build verification
