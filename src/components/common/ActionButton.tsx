// ActionButton.tsx
import { Box, Button } from "@mui/material";
import { FaPlus, FaFileExport } from "react-icons/fa";

const ActionButton = ({ onAdd, onExport }: { onAdd: () => void; onExport: () => void }) => (
  <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
    <Button variant="contained" color="primary" startIcon={<FaPlus />} onClick={onAdd}>
      Añadir
    </Button>
    <Button variant="contained" color="success" startIcon={<FaFileExport />} onClick={onExport}>
      Exportar a Excel
    </Button>
  </Box>
);

export default ActionButton;
