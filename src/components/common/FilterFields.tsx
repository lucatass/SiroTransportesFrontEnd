// FilterFields.tsx
import { Box, TextField, IconButton } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { FaSearch } from "react-icons/fa";

const FilterFields = ({
  fechaDesde,
  fechaHasta,
  errorFecha,
  onFechaDesdeChange,
  onFechaHastaChange,
  searchText,
  onSearchTextChange,
}: {
  fechaDesde: Dayjs;
  fechaHasta: Dayjs;
  errorFecha: string | null;
  onFechaDesdeChange: (date: Dayjs | null) => void;
  onFechaHastaChange: (date: Dayjs | null) => void;
  searchText: string;
  onSearchTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <Box
    sx={{
      display: "flex",
      gap: 2,
      marginBottom: 2,
      alignItems: "center",
      flexWrap: "wrap",
    }}
  >
    <DatePicker
      label="Fecha Desde"
      value={fechaDesde}
      onChange={onFechaDesdeChange}
      format="DD-MM-YYYY"
      slotProps={{
        textField: {
          error: !!errorFecha,
          helperText: errorFecha,
          variant: "outlined",
        },
      }}
    />
    <DatePicker
      label="Fecha Hasta"
      value={fechaHasta}
      onChange={onFechaHastaChange}
      format="DD-MM-YYYY"
      slotProps={{
        textField: {
          error: !!errorFecha,
          helperText: errorFecha,
          variant: "outlined",
        },
      }}
    />
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: { xs: "100%", sm: "225px" },
      }}
    >
      <TextField
        variant="outlined"
        label="Buscar..."
        value={searchText}
        onChange={onSearchTextChange}
        fullWidth
      />
      <IconButton size="small">
        <FaSearch />
      </IconButton>
    </Box>
  </Box>
);

export default FilterFields;
