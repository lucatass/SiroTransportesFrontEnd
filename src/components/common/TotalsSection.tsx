// TotalsSection.tsx
import React from "react";
import { TextField } from "@mui/material";
import FormRow from "./FormRow"; // Asegúrate de que la ruta sea correcta
import "./css/TotalsSection.css"; // Opcional: para estilos específicos

// Define la interfaz para los totales
interface Totals {
  bultos: number;
  valorDeclarado: number;
  montoOrigen: number;
  montoDestino: number;
  contraReembolso: number;
  seguro: number;
}

// Define la interfaz para las props del componente
interface TotalsSectionProps {
  totals: Totals;
}

const TotalsSection: React.FC<TotalsSectionProps> = ({ totals }) => {
  return (
    <div className="section">
      <FormRow className="form-totals">
        <TextField
          label="Bultos"
          value={totals.bultos}
          slotProps={{
            input: {
              readOnly: true,
              style: { width: 100 },
            },
          }}
          margin="none"
          size="small"
        />
        <TextField
          label="Valor Declarado"
          value={totals.valorDeclarado}
          slotProps={{
            input: {
              readOnly: true,
              style: { width: 100 },
            },
          }}
          margin="none"
          size="small"
        />
        <TextField
          label="Contrareembolso"
          value={totals.contraReembolso}
          slotProps={{
            input: {
              readOnly: true,
              style: { width: 100 },
            },
          }}
          margin="none"
          size="small"
          />
        <TextField
          label="Seguro"
          value={totals.seguro}
          slotProps={{
            input: {
              readOnly: true,
              style: { width: 100 },
            },
          }}
          margin="none"
          size="small"
        />
        <TextField
          label="Total Origen"
          value={totals.montoOrigen}
          slotProps={{
            input: {
              readOnly: true,
              style: { width: 200 },
            },
          }}
          
          margin="none"
          size="small"
        />
        <TextField
          label="Total Destino"
          value={totals.montoDestino}
          slotProps={{
            input: {
              readOnly: true,
              style: { width: 200 },
            },
          }}
          
          margin="none"
          size="small"
        />
      </FormRow>
    </div>
  );
};

export default TotalsSection;
