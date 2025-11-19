import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import SearchMap from '../components/SearchMap';

export default function Search() {
  const { data: session } = useSession();
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const response = await fetch('/api/professionals');
      if (response.ok) {
        const data = await response.json();
        setProfessionals(data.professionals || []);
      }
    } catch (error) {
      console.error('Error fetching professionals:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProfessionals = professionals.filter(prof =>
    prof.profession?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prof.bio?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Search Professionals</h1>
        <input
          type="text"
          placeholder="Search by profession or skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid #ddd',
            borderRadius: '5px',
          }}
        />
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Professionals ({filteredProfessionals.length})
          </h2>
          
          {loading && <p>Loading professionals...</p>}
          
          {!loading && filteredProfessionals.length === 0 && (
            <p style={{ color: '#666' }}>No professionals found</p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredProfessionals.map((prof) => (
              <div
                key={prof._id}
                style={{
                  padding: '1rem',
                  border: '1px solid #eaeaea',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <h3 style={{ marginBottom: '0.5rem' }}>{prof.profession}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  {prof.bio || 'No bio available'}
                </p>
                {prof.hourlyRate && (
                  <p style={{ fontWeight: 'bold', color: '#0070f3' }}>
                    ${prof.hourlyRate}/hour
                  </p>
                )}
                {prof.location?.address && (
                  <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.5rem' }}>
                    📍 {prof.location.address}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Map View</h2>
          <SearchMap professionals={filteredProfessionals} />
        </div>
      </div>
    </div>
  );
}
