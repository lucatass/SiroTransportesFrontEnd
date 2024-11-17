/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

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
}

const ClientSelector: React.FC<ClientSelectorProps> = ({
  name,
  label,
  control,
  options,
  errors,
}) => {
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
            onChange={(selectedOption) => field.onChange(selectedOption)}
            value={field.value}
            classNamePrefix="react-select"
            aria-label={label}
          />
        )}
      />
      {errors[name]?.message && (
        <p className="error-message">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default ClientSelector;
