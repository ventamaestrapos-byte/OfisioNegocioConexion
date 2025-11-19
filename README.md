# Ofisio Negocio Conexion

Professional services booking and connection platform.

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- Stripe account

### Installation

1. Clone the repository
```bash
git clone https://github.com/ventamaestrapos-byte/OfisioNegocioConexion.git
cd OfisioNegocioConexion
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

4. Seed the database
```bash
npm run seed
```

5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Environment Variables

See `.env.example` for required environment variables.

## API Routes

- `/api/auth/signup` - User registration
- `/api/auth/[...nextauth]` - NextAuth authentication
- `/api/professionals` - Professional profiles CRUD
- `/api/stripe/webhook` - Stripe webhook handler

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with sample data

## Tech Stack

- Next.js 14
- React 18
- MongoDB with Mongoose
- NextAuth.js for authentication
- Stripe for payments
- Axios for HTTP requests

## CI/CD

GitHub Actions workflow runs on push and pull requests to:
- Install dependencies
- Lint code
- Build application
