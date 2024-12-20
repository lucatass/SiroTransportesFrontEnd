import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
} from "@mui/material";
import { Producto } from "../../types/types";

interface ProductTableProps {
  productos: Producto[];
  removeProduct: (index: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  productos,
  removeProduct,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>Unidad</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((producto, index) => (
                <TableRow key={producto.id || index}>
                  <TableCell>{producto.tipo}</TableCell>
                  <TableCell>{producto.unidad}</TableCell>
                  <TableCell>{producto.cantidad}</TableCell>
                  <TableCell>{producto.descripcion}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => removeProduct(index)}
                      aria-label={`Eliminar producto ${producto.tipo}`}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={productos.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default ProductTable;
