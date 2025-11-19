import { useEffect, useRef, useState } from 'react';

export default function SearchMap({ professionals = [] }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    // Check if Mapbox token is available
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || process.env.MAPBOX_TOKEN;
    
    if (!mapboxToken) {
      setMapError(true);
      console.warn('Mapbox token not found. Map will not be displayed.');
      return;
    }

    // Only initialize map once
    if (map.current) return;

    // In a real implementation, you would load the Mapbox GL JS library
    // For now, we'll show a placeholder
    setMapError(true);
  }, []);

  useEffect(() => {
    // When professionals change, update markers
    if (map.current && professionals.length > 0) {
      // Update map markers with professional locations
      console.log('Updating map with professionals:', professionals.length);
    }
  }, [professionals]);

  if (mapError || !process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    return (
      <div
        style={{
          width: '100%',
          height: '500px',
          backgroundColor: '#f5f5f5',
          border: '1px solid #ddd',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
        <h3 style={{ marginBottom: '0.5rem' }}>Map View</h3>
        <p style={{ color: '#666', maxWidth: '400px' }}>
          Map functionality requires a Mapbox token. Please set MAPBOX_TOKEN in your environment variables.
        </p>
        {professionals.length > 0 && (
          <p style={{ marginTop: '1rem', color: '#0070f3' }}>
            {professionals.length} professional{professionals.length !== 1 ? 's' : ''} would be displayed on the map
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: '500px',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    />
  );
}
