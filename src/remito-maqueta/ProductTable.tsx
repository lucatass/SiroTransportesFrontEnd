import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Producto } from "../types/types";
import { formatCurrency } from "../utils/formatters";

interface ProductTableProps {
  productos: Producto[];
  removeProduct: (index: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  productos,
  removeProduct,
}) => {
  // Calcular los totales
  const totalCantidad = productos.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  
  const totalMonto = productos.reduce(
    (acc, producto) => acc + producto.cantidad * producto.precio,
    0
  );

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell>Unidad</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((producto, index) => (
              <TableRow key={index}>
                <TableCell>{producto.producto}</TableCell>
                <TableCell>{producto.unidad}</TableCell>
                <TableCell>{producto.cantidad}</TableCell>
                <TableCell>{producto.precio}</TableCell>
                <TableCell>
                  {(producto.cantidad * producto.precio).toFixed(2)}
                </TableCell>
                <TableCell>{producto.descripcion}</TableCell>
                <TableCell>
                  <Button onClick={() => removeProduct(index)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}

            {/* Fila de Totales */}
            <TableRow>
              <TableCell colSpan={2} align="right">
                <strong>Total</strong>
              </TableCell>
              <TableCell>
                <strong>{totalCantidad}</strong>
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                <strong>{formatCurrency(totalMonto)}</strong>
              </TableCell>
              <TableCell colSpan={2}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ProductTable;
