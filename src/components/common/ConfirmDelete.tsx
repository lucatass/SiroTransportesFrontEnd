import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface ConfirmDelete {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDelete: React.FC<ConfirmDelete> = ({
  open,
  onCancel,
  onConfirm,
}) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>Eliminar Remito</DialogTitle>
    <DialogContent>
      <DialogContentText>
        ¿Estás seguro de que deseas eliminar este remito? Esta acción no se
        puede deshacer.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Cancelar</Button>
      <Button onClick={onConfirm} color="secondary">
        Eliminar
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDelete