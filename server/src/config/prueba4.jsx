import React, { useState } from 'react';
import useCompanies from './prueba2'; // Ajusta la ruta según tu estructura de carpetas
import LogoDisplay from './prueba3';
const CompanyGallery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { companies, loading, error } = useCompanies(searchQuery);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h1>Galería de Empresas</h1>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Buscar empresa..."
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />

      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {companies.length > 0 ? (
          companies.map((company) => (
            <div key={company.id} style={{ margin: '10px', textAlign: 'center' }}>
              <LogoDisplay
                logoUrl={company.logoUrl}
                companyName={company.name}
              />
              <p>{company.name}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron empresas.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyGallery;
