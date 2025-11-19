import { useState } from 'react';
import SearchMap from '../components/SearchMap';

export default function Search() {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    profession: '',
    lat: '',
    lng: '',
    radius: 10
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const queryParams = new URLSearchParams({
        profession: searchParams.profession,
        lat: searchParams.lat,
        lng: searchParams.lng,
        radius: searchParams.radius
      });

      const response = await fetch(`/api/professionals?${queryParams}`);
      const data = await response.json();

      if (response.ok) {
        setProfessionals(data.professionals || []);
      } else {
        console.error('Search failed:', data.error);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Search Professionals</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Profession:
            <input
              type="text"
              value={searchParams.profession}
              onChange={(e) => setSearchParams({ ...searchParams, profession: e.target.value })}
              style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            Latitude:
            <input
              type="number"
              step="any"
              value={searchParams.lat}
              onChange={(e) => setSearchParams({ ...searchParams, lat: e.target.value })}
              style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            Longitude:
            <input
              type="number"
              step="any"
              value={searchParams.lng}
              onChange={(e) => setSearchParams({ ...searchParams, lng: e.target.value })}
              style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            Radius (km):
            <input
              type="number"
              value={searchParams.radius}
              onChange={(e) => setSearchParams({ ...searchParams, radius: e.target.value })}
              style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
            />
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {professionals.length > 0 && (
        <div>
          <h2>Results ({professionals.length})</h2>
          <SearchMap professionals={professionals} />
          <ul>
            {professionals.map((prof) => (
              <li key={prof._id} style={{ marginBottom: '1rem' }}>
                <strong>{prof.profession}</strong> - ${prof.hourlyRate}/hr
                <br />
                {prof.location.address}
                <br />
                Rating: {prof.rating}/5 ({prof.reviewCount} reviews)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
