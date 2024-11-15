import React from "react";
import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = "text",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <TextField
      type={type}
      label={label}
      variant="outlined"
      fullWidth
      {...register(name)}
      error={!!error}
      helperText={error}
    />
  );
};

export default FormField;
