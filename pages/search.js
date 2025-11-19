import { useState } from 'react';
import SearchMap from '../components/SearchMap';

export default function SearchPage() {
  const [category, setCategory] = useState('');
  const [radius, setRadius] = useState(5000);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
        <h1 style={{ margin: 0 }}>Search Professionals</h1>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          <label>
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ marginLeft: '0.5rem', padding: '0.25rem' }}
            >
              <option value="">All</option>
              <option value="plumber">Plumber</option>
              <option value="electrician">Electrician</option>
              <option value="carpenter">Carpenter</option>
              <option value="painter">Painter</option>
              <option value="cleaner">Cleaner</option>
              <option value="gardener">Gardener</option>
              <option value="mechanic">Mechanic</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Radius (meters):
            <input
              type="number"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              style={{ marginLeft: '0.5rem', padding: '0.25rem', width: '100px' }}
            />
          </label>
        </div>
      </header>
      <div style={{ flex: 1 }}>
        <SearchMap category={category} radius={radius} />
      </div>
    </div>
  );
}
