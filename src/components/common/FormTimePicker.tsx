// FormTimePicker.tsx
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Dayjs } from "dayjs";

interface FormTimePickerProps {
  name: string;
  label: string;
  format?: string;
  size?: "small" | "medium";
}

const FormTimePicker: React.FC<FormTimePickerProps> = ({
  name,
  label,
  format = "HH:mm:ss",
  size = "small",
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TimePicker
          {...field}
          label={label}
          format={format}
          value={field.value}
          onChange={(time: Dayjs | null) => field.onChange(time)}
          slotProps={{
            textField: {
              variant: "outlined",
              fullWidth: true,
              error: !!fieldState.error,
              helperText: fieldState.error ? fieldState.error.message : null,
              size,
            },
          }}
        />
      )}
    />
  );
};

export default FormTimePicker;

