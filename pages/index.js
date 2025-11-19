import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Ofisio Negocio Conexion</h1>
      <p>Professional Services Marketplace</p>

      {status === 'loading' && <p>Loading...</p>}

      {status === 'authenticated' && (
        <div>
          <p>Welcome, {session.user.email}!</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      )}

      {status === 'unauthenticated' && (
        <div>
          <button onClick={() => signIn()}>Sign In</button>
        </div>
      )}

      <nav style={{ marginTop: '2rem' }}>
        <Link href="/search">
          <button>Search Professionals</button>
        </Link>
      </nav>
    </div>
  );
}
