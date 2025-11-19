import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #eaeaea', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Ofisio Conexión</h1>
        <p style={{ color: '#666' }}>Connect with skilled professionals in your area</p>
      </header>

      <main>
        {loading && <p>Loading...</p>}
        
        {!loading && !session && (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Welcome to Ofisio Conexión</h2>
            <p style={{ marginBottom: '2rem', color: '#666' }}>
              Sign in to find professionals or offer your services
            </p>
            <button
              onClick={() => signIn()}
              style={{
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Sign In
            </button>
          </div>
        )}

        {!loading && session && (
          <div>
            <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
              <p>Signed in as <strong>{session.user.email}</strong></p>
              <button
                onClick={() => signOut()}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  backgroundColor: '#ff4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Sign Out
              </button>
            </div>

            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              <Link href="/search" style={{
                padding: '2rem',
                border: '1px solid #eaeaea',
                borderRadius: '8px',
                textAlign: 'center',
                transition: 'border-color 0.15s',
              }}>
                <h3 style={{ marginBottom: '0.5rem' }}>🔍 Search Professionals</h3>
                <p style={{ color: '#666' }}>Find skilled professionals near you</p>
              </Link>

              <div style={{
                padding: '2rem',
                border: '1px solid #eaeaea',
                borderRadius: '8px',
                textAlign: 'center',
              }}>
                <h3 style={{ marginBottom: '0.5rem' }}>👤 My Profile</h3>
                <p style={{ color: '#666' }}>Manage your professional profile</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #eaeaea', textAlign: 'center', color: '#666' }}>
        <p>&copy; 2025 Ofisio Conexión. All rights reserved.</p>
      </footer>
    </div>
  );
}
