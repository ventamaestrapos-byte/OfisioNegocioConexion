# Ofisio Negocio Conexión

A Next.js application for managing business connections with authentication, MongoDB integration, and Stripe payment processing.

## Project Summary

This is the Conexión project, a modern web application built with Next.js that provides:
- User authentication and authorization with NextAuth.js
- MongoDB database integration with Mongoose ODM
- Payment processing with Stripe
- Responsive and modern UI with React

## Prerequisites

- Node.js 18.x or higher
- MongoDB account (MongoDB Atlas recommended)
- Stripe account for payment processing

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ventamaestrapos-byte/OfisioNegocioConexion.git
cd OfisioNegocioConexion
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

**Required Environment Variables:**

- `MONGODB_URI` - MongoDB connection string (e.g., mongodb+srv://username:password@cluster.mongodb.net/database)
- `NEXTAUTH_SECRET` - Secret key for NextAuth.js session encryption (generate with: `openssl rand -base64 32`)
- `NEXTAUTH_URL` - Application URL (use http://localhost:3000 for local development)
- `STRIPE_SECRET_KEY` - Stripe secret key from your Stripe dashboard
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key from your Stripe dashboard

You can copy `.env.example` as a starting point:

```bash
cp .env.example .env.local
```

### 4. Database Setup and Seeding

Before running the application, ensure your MongoDB database is set up:

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster and database
3. Add your connection string to the `MONGODB_URI` environment variable
4. (Optional) If seed scripts are available, run them to populate initial data:

```bash
npm run seed
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` - Starts the development server on port 3000
- `npm run build` - Creates an optimized production build
- `npm start` - Runs the production server
- `npm run lint` - Runs ESLint to check code quality

## Technology Stack

- **Framework:** Next.js 14
- **Frontend:** React 18
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** NextAuth.js
- **Payments:** Stripe
- **Password Hashing:** bcryptjs
- **HTTP Client:** Axios

## Project Structure

```
├── .env.example          # Example environment variables
├── .gitignore           # Git ignore rules
├── package.json         # Project dependencies and scripts
└── README.md           # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.
