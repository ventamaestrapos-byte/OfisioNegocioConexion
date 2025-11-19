import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Ofisio Negocio Conexion</title>
        <meta name="description" content="Professional services connection platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">
          Welcome to <span style={{ color: '#0070f3' }}>Ofisio</span>
        </h1>

        <p className="description">
          Connect with professionals in your area
        </p>

        <div className="grid">
          <Link href="/search" className="card">
            <h2>Find Professionals &rarr;</h2>
            <p>Search for professionals by location and service type.</p>
          </Link>

          <Link href="/api/auth/signup" className="card">
            <h2>Sign Up &rarr;</h2>
            <p>Create an account to get started.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
