import { useEffect, useRef } from 'react';

export default function SearchMap({ professionals }) {
  const mapRef = useRef(null);

  useEffect(() => {
    // Placeholder for map implementation
    // In a real application, you would integrate with a mapping library
    // like Google Maps, Mapbox, or Leaflet
    if (mapRef.current && professionals.length > 0) {
      console.log('Map would show', professionals.length, 'professionals');
    }
  }, [professionals]);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        maxWidth: '800px',
        height: '400px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <p style={{ color: '#666' }}>
        {professionals.length > 0
          ? `Showing ${professionals.length} professionals on map`
          : 'Map will display professionals here'}
      </p>
    </div>
  );
}
