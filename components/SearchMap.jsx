import { useEffect, useRef } from 'react';

export default function SearchMap({ professionals }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!professionals || professionals.length === 0) return;
    if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
      console.warn('Mapbox token not configured');
      return;
    }

    // Only initialize map if not already created
    if (!mapRef.current && typeof window !== 'undefined' && window.mapboxgl) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [
          professionals[0].location.coordinates[0],
          professionals[0].location.coordinates[1]
        ],
        zoom: 12
      });

      // Add markers for each professional
      professionals.forEach((prof) => {
        new mapboxgl.Marker()
          .setLngLat(prof.location.coordinates)
          .setPopup(
            new mapboxgl.Popup().setHTML(
              `<h3>${prof.profession}</h3><p>${prof.location.address}</p>`
            )
          )
          .addTo(map);
      });

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [professionals]);

  if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    return (
      <div style={{ padding: '1rem', background: '#f0f0f0', marginBottom: '1rem' }}>
        Map disabled: NEXT_PUBLIC_MAPBOX_TOKEN not configured
      </div>
    );
  }

  return (
    <div
      ref={mapContainerRef}
      style={{ height: '400px', marginBottom: '2rem' }}
    />
  );
}
