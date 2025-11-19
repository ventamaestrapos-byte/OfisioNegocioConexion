import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>OfisioNegocioConexion</h1>
      <p style={{ marginTop: '1rem' }}>
        Welcome to the professional services connection platform.
      </p>

      <div style={{ marginTop: '2rem' }}>
        {session ? (
          <div>
            <p>Signed in as {session.user.email}</p>
            <button
              onClick={() => signOut()}
              style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
            >
              Sign out
            </button>
          </div>
        ) : (
          <p>Not signed in</p>
        )}
      </div>

      <nav style={{ marginTop: '2rem' }}>
        <h2>Navigation</h2>
        <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link href="/search" style={{ color: 'blue', textDecoration: 'underline' }}>
              Search Professionals
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
