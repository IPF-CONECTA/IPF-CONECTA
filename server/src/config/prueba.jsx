import { useState, useEffect } from 'react';
import axios from 'axios';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:4000/find-companies');
        setPhotos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Galería de Empresas</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {photos.map((photo) => (
          <div key={photo.id} style={{ margin: '10px' }}>
            <img
              src={`http://localhost:4000/uploads/${photo.logoUrl}`}
              alt={photo.name}
              style={{ width: '200px', height: 'auto' }}
            />
            <p>{photo.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
