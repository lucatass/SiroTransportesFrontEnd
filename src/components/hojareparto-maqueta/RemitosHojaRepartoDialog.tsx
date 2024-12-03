/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { HojaRepartoRequest, RemitoDto } from "../../types/types";
import { UseFormSetValue } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Button,
} from "@mui/material";

interface RemitosHojaRepartoDialogProps {
  open: boolean;
  remitos: RemitoDto[];
  isLoading: boolean;
  onClose: () => void;
  setValue: UseFormSetValue<HojaRepartoRequest>;
}

const RemitosHojaRepartoDialog: React.FC<RemitosHojaRepartoDialogProps> = ({
  open,
  remitos,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => console.log("close dialog")}
      fullWidth
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "10px",
        },
      }}
    >
      <DialogTitle>Seleccionar Remitos</DialogTitle>
      <DialogContent className="dialog-content">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Carta Porte</TableCell>
                <TableCell>Remitente</TableCell>
                <TableCell>Destinatario</TableCell>
                <TableCell>Bultos</TableCell>
                <TableCell>Tipo Pago</TableCell>
                <TableCell>Seleccionar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {remitos.map((remito) => (
                <TableRow key={remito.id}>
                  <TableCell>{remito.fecha}</TableCell>
                  <TableCell>{remito.cartaPorte}</TableCell>
                  <TableCell>{remito.remitente}</TableCell>
                  <TableCell>{remito.destinatario}</TableCell>
                  <TableCell>{remito.bultos}</TableCell>
                  <TableCell>{remito.tipoPago}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={remitos.some(
                        (r) => r.id === remito.id
                      )}
                      onChange={() => console.log("seleccionado remito")}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => console.log("close dialog")} style={{ backgroundColor: '#ff8e31', color:"white" }}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={() => console.log("close dialog")}>
          Guardar Remitos
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemitosHojaRepartoDialog;

