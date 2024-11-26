import React from "react";
import { RemitoDto } from '../../types/types';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
    <div className="selected-remitos-table-container">
      <Table className="selected-remitos-table">
        <TableHead>
          <TableRow>
            <TableCell>Carta Porte</TableCell>
            <TableCell>Remitente</TableCell>
            <TableCell>Destinatario</TableCell>
            <TableCell>Tipo Pago</TableCell>
            <TableCell>Bultos</TableCell>
            <TableCell>Valor Declarado</TableCell>
            <TableCell>ContraReembolso</TableCell>
            <TableCell>Seguro</TableCell>
            <TableCell>Tracking</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {remitos.map((remito) => (
            <TableRow key={remito.id}>
              <TableCell>{remito.cartaPorte}</TableCell>
              <TableCell>{remito.remitente}</TableCell>
              <TableCell>{remito.destinatario}</TableCell>
              <TableCell>{remito.tipoPago}</TableCell>
              <TableCell>{remito.bultos}</TableCell>
              <TableCell>{remito.seguro.valorDeclarado}</TableCell>
              <TableCell>{remito.contraReembolso.comision}</TableCell>
              <TableCell>{remito.seguro.seguro}</TableCell>
              <TableCell>{remito.tracking}</TableCell>
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
    </div>
  );
};

export default SelectedRemitosTable;
