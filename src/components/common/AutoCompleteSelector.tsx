/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Controller } from "react-hook-form";
import { TextField, Autocomplete } from "@mui/material";

interface Option {
  value: string | number;
  label: string;
}

interface AutoCompleteSelectorProps {
  name: string;
  label: string;
  control: any;
  options: Option[];
  errors?: Record<string, { message: string }>; // Maneja los errores
}

const AutoCompleteSelector: React.FC<AutoCompleteSelectorProps> = ({
  name,
  label,
  control,
  options,
  errors,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          options={options}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!errors?.[name]} // Marca como error si existe
              helperText={errors?.[name]?.message} // Muestra el mensaje de error
            />
          )}
        />
      )}
    />
  );
};

export default AutoCompleteSelector;
