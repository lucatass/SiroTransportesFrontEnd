/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Controller } from "react-hook-form";
import { TextField, Autocomplete } from "@mui/material";
import { Box } from "@mui/material";

interface Option {
  value: string | number;
  label: string;
}

interface AutoCompleteSelectorProps {
  name: string;
  label: string;
  control: any;
  options: Option[];
  errors?: Record<string, { message: string }>; // Handle errors
  width?: string; // Add width prop
  size?: "small" | "medium";
}

const AutoCompleteSelector: React.FC<AutoCompleteSelectorProps> = ({
  name,
  label,
  control,
  options,
  errors,
  width = "160px", // Default width value
  size = "small",
}) => {
  return (

    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          size={size}
          options={options}
          getOptionLabel={(option) => option.label}
          sx={{
            width, // Set width for the main Autocomplete container
            "  .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.MuiInputBase-formControl.MuiInputBase-sizeSmall.MuiInputBase-adornedEnd.MuiAutocomplete-inputRoot": {
              width, // Ensure the input and dropdown match
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!errors?.[name]} // Mark as error if exists
              helperText={errors?.[name]?.message} // Show error message
            />
          )}
        />
      )}
    />
  );
};

export default AutoCompleteSelector;

