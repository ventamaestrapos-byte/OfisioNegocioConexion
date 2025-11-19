import { useState } from 'react';
import Head from 'next/head';
import SearchMap from '../components/SearchMap';

export default function Search() {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    profession: '',
    latitude: null,
    longitude: null,
    radius: 10,
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const queryParams = new URLSearchParams();
      if (searchParams.profession) queryParams.append('profession', searchParams.profession);
      if (searchParams.latitude) queryParams.append('lat', searchParams.latitude);
      if (searchParams.longitude) queryParams.append('lng', searchParams.longitude);
      if (searchParams.radius) queryParams.append('radius', searchParams.radius);

      const response = await fetch(`/api/professionals?${queryParams}`);
      const data = await response.json();

      if (response.ok) {
        setProfessionals(data.professionals || []);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Search Professionals - Ofisio</title>
      </Head>

      <main className="main">
        <h1 className="title">Search Professionals</h1>

        <form onSubmit={handleSearch} style={{ margin: '2rem 0', width: '100%', maxWidth: '600px' }}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Profession (e.g., plumber, electrician)"
              value={searchParams.profession}
              onChange={(e) => setSearchParams({ ...searchParams, profession: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '0.5rem 2rem', fontSize: '1rem', cursor: 'pointer' }}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        <SearchMap professionals={professionals} />

        <div style={{ marginTop: '2rem', width: '100%', maxWidth: '800px' }}>
          {professionals.length > 0 && (
            <div>
              <h2>Results ({professionals.length})</h2>
              {professionals.map((prof) => (
                <div key={prof._id} className="card">
                  <h3>{prof.profession}</h3>
                  <p>{prof.bio || 'No bio available'}</p>
                  <p>Rate: ${prof.hourlyRate}/hour</p>
                  <p>Rating: {prof.rating}/5 ({prof.reviewCount} reviews)</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
