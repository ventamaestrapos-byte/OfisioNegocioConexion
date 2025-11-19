# Ofisio Conexión

A Next.js platform connecting professionals with clients, featuring authentication, payment processing, and location-based search.

## Features

- 🔐 User authentication with NextAuth.js
- 💳 Payment processing with Stripe
- 🗺️ Location-based professional search with Mapbox
- 👤 Professional profiles and user management
- 📱 Responsive design

## Prerequisites

- Node.js 18+ 
- MongoDB instance
- Stripe account (for payments)
- Mapbox account (for maps)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/ventamaestrapos-byte/OfisioNegocioConexion.git
   cd OfisioNegocioConexion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your actual credentials:
   - MongoDB connection string
   - NextAuth secret (generate with: `openssl rand -base64 32`)
   - Stripe keys
   - Mapbox token

4. **Seed the database (optional)**
   ```bash
   node scripts/seed.js
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── components/          # React components
├── lib/                # Utility libraries
├── models/             # Mongoose models
├── pages/              # Next.js pages and API routes
│   ├── api/           # API endpoints
│   │   ├── auth/      # Authentication endpoints
│   │   ├── professionals/ # Professional data endpoints
│   │   └── stripe/    # Stripe webhooks
│   ├── _app.js        # Custom App component
│   ├── index.js       # Home page
│   └── search.js      # Search page
├── scripts/           # Utility scripts
├── styles/            # CSS styles
└── utils/             # Helper functions
```

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

See `.env.example` for all required environment variables.

## License

Private
