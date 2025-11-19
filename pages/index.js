import Head from 'next/head';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Ofisio - Conexión</title>
        <meta name="description" content="Connect with professionals" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Welcome to Ofisio - Conexión</h1>
        
        <div style={{ marginTop: '2rem' }}>
          {session ? (
            <>
              <p>Signed in as {session.user.email}</p>
              <button onClick={() => signOut()} style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
                Sign out
              </button>
            </>
          ) : (
            <p>Not signed in</p>
          )}
        </div>

        <nav style={{ marginTop: '2rem' }}>
          <h2>Navigation</h2>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link href="/search" style={{ color: '#0070f3', textDecoration: 'underline' }}>
                Search Professionals
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </>
  );
}
