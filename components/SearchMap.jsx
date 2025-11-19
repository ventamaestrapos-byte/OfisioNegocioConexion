import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

export default function SearchMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(-99.1332);
  const [lat] = useState(19.4326);
  const [zoom] = useState(12);
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapboxLoaded, setMapboxLoaded] = useState(false);

  useEffect(() => {
    // Fetch professionals from API
    const fetchProfessionals = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/professionals?lng=${lng}&lat=${lat}&maxDistance=10000`);
        if (!response.ok) {
          throw new Error('Failed to fetch professionals');
        }
        const data = await response.json();
        setProfessionals(data.professionals || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, [lng, lat]);

  useEffect(() => {
    // Initialize Mapbox map
    if (!mapboxLoaded || map.current) return;
    
    const mapboxgl = window.mapboxgl;
    if (!mapboxgl) {
      setError('Mapbox GL JS not loaded');
      return;
    }

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      setError('Mapbox token not configured');
      return;
    }

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });

    // Add markers for professionals
    professionals.forEach((professional) => {
      if (professional.location && professional.location.coordinates) {
        const [profLng, profLat] = professional.location.coordinates;
        new mapboxgl.Marker()
          .setLngLat([profLng, profLat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<h3>${professional.businessName}</h3><p>${professional.description}</p>`
            )
          )
          .addTo(map.current);
      }
    });
  }, [lng, lat, zoom, professionals, mapboxLoaded]);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading map...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
        Error: {error}
        <p style={{ marginTop: '1rem', fontSize: '0.9em' }}>
          Make sure Mapbox token is configured and Mapbox GL JS is loaded
        </p>
      </div>
    );
  }

  return (
    <>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css"
        rel="stylesheet"
      />
      <Script
        src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"
        strategy="lazyOnload"
        onLoad={() => setMapboxLoaded(true)}
      />
      <div
        ref={mapContainer}
        style={{ width: '100%', height: '600px' }}
      />
      <div style={{ padding: '1rem' }}>
        <h3>Professionals found: {professionals.length}</h3>
      </div>
    </>
  );
}
