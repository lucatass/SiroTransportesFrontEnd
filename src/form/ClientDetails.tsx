// ClientDetails.tsx
import React from "react";

interface ClientDetailsProps {
  razonSocial: string;
  direccion: string;
  cuit: string;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ razonSocial, direccion, cuit }) => {
  return (
    <div className="client-details">
      <p><strong>Razón Social:</strong> {razonSocial}</p>
      <p><strong>Dirección:</strong> {direccion}</p>
      <p><strong>CUIT:</strong> {cuit}</p>
    </div>
  );
};

export default ClientDetails;
