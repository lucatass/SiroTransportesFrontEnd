/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import Select from "react-select";
import { Controller, Control, FieldErrors, useWatch } from "react-hook-form";
import { Cliente } from "../../types/types";

// ClientSelector.tsx
interface Option {
  value: number; // Cambiado de string a number
  label: string;
}

interface ClientSelectorProps {
  name: string;
  label: string;
  control: Control<any>;
  options: Option[];
  data: Cliente[];
  errors: FieldErrors<any>;
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
    <div className="client-selector">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select<Option, false>
            {...field}
            inputId={name}
            options={options}
            placeholder={`Seleccione un ${label.toLowerCase()}`}
            onChange={(selectedOption) => {
              field.onChange(selectedOption);
            }}
            value={
              options.find((option) => option.value === field.value?.value) ||
              null
            }
            classNamePrefix="react-select"
            aria-label={label}
          />
        )}
      />
      {errors[name]?.message && (
        <p className="error-message">{errors[name]?.message as string}</p>
      )}
      {selectedClient && selectedClient.direcciones?.length > 0 && (
        <div className="cliente-detalles">
          <p>
            <strong>Domicilio:</strong>{" "}
            {selectedClient.direcciones[0].domicilio}
          </p>
          <p>
            <strong>Localidad:</strong>{" "}
            {selectedClient.direcciones[0].localidad}
          </p>
        </div>
      )}
    </div>
  );
};

export default ClientSelector;
