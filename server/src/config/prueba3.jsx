import React from 'react';

// URL base de tu servidor para imágenes
const BASE_URL = 'http://localhost:4000/uploads/';

const LogoDisplay = ({ logoUrl = '', companyName = 'Compañía' }) => {
  const logoSrc = logoUrl ? `${BASE_URL}${logoUrl}` : `${BASE_URL}default-logo.png`; // Puedes proporcionar un logo por defecto si lo deseas.

  return (
    <div>
      <img
        src={logoSrc}
        alt={`Logo de ${companyName}`}
        style={{ maxWidth: '100%', maxHeight: '150px' }}
      />
    </div>
  );
};

export default LogoDisplay;
