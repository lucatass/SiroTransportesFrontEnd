/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import Select from "react-select";
import { Controller, useWatch } from "react-hook-form";
import { Cliente } from "../types/types";
import { Box } from "@mui/material";

interface Option {
  value: number;
  label: string;
}

interface ClientSelectorProps {
  name: string;
  label: string;
  control: any;
  options: Option[];
  errors: any;
  data: Cliente[];
}

const ClientSelector: React.FC<ClientSelectorProps> = ({
  name,
  label,
  control,
  options,
  data,
  errors,
}) => {
  const selectedOption = useWatch({
    control,
    name,
  });

  const selectedClient = useMemo(() => {
    if (selectedOption && selectedOption.value) {
      return (
        data.find((cliente) => cliente.id === selectedOption.value) || null
      );
    }
    return null;
  }, [selectedOption, data]);

  return (
    <Box className="client-selector">
      <label htmlFor={name} className="form-label">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select<Option, false>
            {...field}
            inputId={name}
            options={options}
            placeholder={`Seleccione ${label}`}
            onChange={(selectedOption) => {
              field.onChange(selectedOption);
            }}
            value={
              options.find((option) => option.value === field.value?.value) ||
              null
            }
            classNamePrefix="custom-react-select"
            aria-label={label}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
            menuPosition="fixed"
          />
        )}
      />
      {errors[name]?.message && (
        <p className="error-message">{errors[name]?.message as string}</p>
      )}
      {selectedClient ? (
        <Box
          className="cliente-detalles"
          sx={{
            minHeight: "60px", // Altura mínima fija
            marginTop: "8px",
            padding: "8px",
            backgroundColor: "#f9f9f9",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p>
            <strong>Domicilio:</strong>{" "}
            {selectedClient.direcciones[0].domicilio}
          </p>
          <p>
            <strong>Localidad:</strong>{" "}
            {selectedClient.direcciones[0].localidad}
          </p>
        </Box>
      ) : (
        <Box
          className="cliente-detalles"
          sx={{
            minHeight: "60px",
            marginTop: "8px",
            padding: "8px",
            backgroundColor: "#f9f9f9",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "#aaa",
          }}
        >
          <p>No hay detalles seleccionados</p>
        </Box>
      )}
    </Box>
  );
};

export default ClientSelector;
