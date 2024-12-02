import React from "react";
import { RemitoDto } from '../../types/types';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import { FaEye, FaTrash } from "react-icons/fa";
import "./css/SelectedRemitosTable.css";

interface SelectedRemitosTableProps {
  remitos: RemitoDto[];
  onView: (remito: RemitoDto) => void;
  onDelete: (remitoId: string) => void;
}

const SelectedRemitosTable: React.FC<SelectedRemitosTableProps> = ({
  remitos,
  onDelete,
  onView,
}) => {
  if (remitos.length === 0) {
    return <p>No hay remitos seleccionados.</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table className="selected-remitos-table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Carta Porte</TableCell>
            <TableCell align="left">Remitente</TableCell>
            <TableCell align="left">Destinatario</TableCell>
            <TableCell align="left">Tipo Pago</TableCell>
            <TableCell align="left">Bultos</TableCell>
            <TableCell align="left">Valor Declarado</TableCell>
            <TableCell align="left">ContraReembolso</TableCell>
            <TableCell align="left">Seguro</TableCell>
            <TableCell align="left">Tracking</TableCell>
            <TableCell align="left">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {remitos.map((remito) => (
            <TableRow key={remito.id}>
              <TableCell align="left">{remito.cartaPorte}</TableCell>
              <TableCell align="left">{remito.remitente}</TableCell>
              <TableCell align="left">{remito.destinatario}</TableCell>
              <TableCell align="left">{remito.tipoPago}</TableCell>
              <TableCell align="left">{remito.bultos}</TableCell>
              <TableCell align="left">{remito.seguro.valorDeclarado}</TableCell>
              <TableCell align="left">{remito.contraReembolso.comision}</TableCell>
              <TableCell align="left">{remito.seguro.seguro}</TableCell>
              <TableCell align="left">{remito.tracking}</TableCell>
              <TableCell className="selected-remitos-table-actions">
                <IconButton
                  onClick={() => onView(remito)}
                  title="Ver Remito"
                  color="primary"
                >
                  <FaEye />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(remito.id)}
                  title="Eliminar Remito"
                  color="secondary"
                >
                  <FaTrash />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SelectedRemitosTable;

