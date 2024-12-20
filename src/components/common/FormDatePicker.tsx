// FormDatePicker.tsx
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

interface FormDatePickerProps {
  name: string;
  label: string;
  format?: string;
}

const FormDatePicker: React.FC<FormDatePickerProps> = ({
  name,
  label,
  format = "DD-MM-YYYY",
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DatePicker
          {...field}
          label={label}
          format={format}
          value={field.value}
          onChange={(date: Dayjs | null) => field.onChange(date)}
          slotProps={{
            textField: {
              variant: "outlined",
            },
          }}
        />
      )}
    />
  );
};

export default FormDatePicker;
