/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import useHojaRutaStore from "../../store/hojaRutaStore";
import { HojaRutaRequest, RemitoDto } from "../types/types";
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

interface RemitosSelectionModalProps {
  open: boolean;
  remitos: RemitoDto[];
  isLoading: boolean;
  onClose: () => void;
  setValue: UseFormSetValue<HojaRutaRequest>;
}

const RemitosSelectionDialog: React.FC<RemitosSelectionModalProps> = ({
  open,
  remitos,
  isLoading,
  onClose,
  setValue,
}) => {
  const {
    tempSelectedRemitos,
    toggleTempRemito,
    saveTempRemitos,
    clearTempRemitos,
    selectedRemitos,
  } = useHojaRutaStore();

  const filteredRemitos = remitos.filter(
    (remito) => !selectedRemitos.some((r) => r.id === remito.id)
  );

  const handleSaveRemitos = () => {
    saveTempRemitos();
    setValue(
      "remitosId",
      [...selectedRemitos, ...tempSelectedRemitos].map((remito) =>
        Number(remito.id)
      )
    );
    onClose();
  };

  const handleCancel = () => {
    clearTempRemitos();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="md">
      <DialogTitle>Seleccionar Remitos</DialogTitle>
      <DialogContent className="dialog-content">
        {isLoading ? (
          <p>Cargando...</p>
        ) : filteredRemitos.length === 0 ? (
          <p>No hay remitos disponibles.</p>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Carta Porte</TableCell>
                <TableCell>Remitente</TableCell>
                <TableCell>Destinatario</TableCell>
                <TableCell>Tipo Pago</TableCell>
                <TableCell>Bultos</TableCell>
                <TableCell>Seleccionar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRemitos.map((remito) => (
                <TableRow key={remito.id}>
                  <TableCell>{remito.id}</TableCell>
                  <TableCell>{remito.fecha}</TableCell>
                  <TableCell>{remito.cartaPorte}</TableCell>
                  <TableCell>{remito.remitente}</TableCell>
                  <TableCell>{remito.destinatario}</TableCell>
                  <TableCell>{remito.tipoPago}</TableCell>
                  <TableCell>{remito.bultos}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={tempSelectedRemitos.some(
                        (r) => r.id === remito.id
                      )}
                      onChange={() => toggleTempRemito(remito)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={handleSaveRemitos}>
          Guardar Remitos
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemitosSelectionDialog;
