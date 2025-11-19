import { useEffect, useRef, useState } from 'react';

export default function SearchMap({ category, radius }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-99.1332);
  const [lat, setLat] = useState(19.4326);
  const [zoom, setZoom] = useState(10);
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    // Check if mapboxgl is available
    if (typeof window !== 'undefined' && window.mapboxgl) {
      window.mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
      
      map.current = new window.mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom,
      });

      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
    }
  }, []);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const params = new URLSearchParams({
          longitude: lng,
          latitude: lat,
          radius: radius,
        });
        
        if (category) {
          params.append('category', category);
        }

        const response = await fetch(`/api/professionals?${params}`);
        const data = await response.json();
        
        if (data.success) {
          setProfessionals(data.data);
        }
      } catch (error) {
        console.error('Error fetching professionals:', error);
      }
    };

    if (lng && lat) {
      fetchProfessionals();
    }
  }, [lng, lat, radius, category]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      >
        <div>Longitude: {lng}</div>
        <div>Latitude: {lat}</div>
        <div>Zoom: {zoom}</div>
        <div>Professionals found: {professionals.length}</div>
      </div>
    </div>
  );
}
