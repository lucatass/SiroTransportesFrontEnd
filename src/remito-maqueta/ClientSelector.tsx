/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import Select from "react-select";
import { Controller, useWatch } from "react-hook-form";
import { Cliente } from "../types/types";

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
  data: Cliente[]; // Lista de clientes para mostrar información adicional
}

const ClientSelector: React.FC<ClientSelectorProps> = ({
  name,
  label,
  control,
  options,
  errors,
  data,
}) => {
  const selectedOption = useWatch({
    control,
    name,
  });

  const selectedClient = useMemo(() => {
    if (selectedOption && selectedOption.value) {
      return data.find((cliente) => cliente.id === selectedOption.value) || null;
    }
    return null;
  }, [selectedOption, data]);

  return (
    <div className="client-selector">
      <div className="selector-container">
        <label htmlFor={name}>{label}</label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select<Option, false>
              {...field as any}
              inputId={name}
              options={options}
              placeholder={`Seleccione un ${label.toLowerCase()}`}
              onChange={(selectedOption) => field.onChange(selectedOption)}
              value={field.value}
              classNamePrefix="react-select"
              aria-label={label}
            />
          )}
        />
      </div>
      {selectedClient && (
        <div className="cliente-detalles">
          <p>
            <strong>Razón Social:</strong> {selectedClient.razonSocial}
          </p>
          <p>
            <strong>CUIT:</strong> {selectedClient.nroDoc}
          </p>
          {selectedClient.direcciones?.length > 0 && (
            <>
              <p>
                <strong>Domicilio:</strong> {selectedClient.direcciones[0].domicilio}
              </p>
              <p>
                <strong>Localidad:</strong> {selectedClient.direcciones[0].localidad}
              </p>
            </>
          )}
        </div>
      )}
      {errors[name]?.message && (
        <p className="error-message">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default ClientSelector