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
      <p><strong>Dirección:</strong> {direccion}&nbsp;&nbsp;<strong>CUIT:</strong> {cuit}</p>
      <p></p>
    </div>
  );
};

export default ClientDetails;
