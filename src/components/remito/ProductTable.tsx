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
    <Paper sx={{ m: 1, p: 0, boxShadow: "none" }}>
      <TableContainer sx={{ m: 1, p: 0, width: "auto" }}>
        <Table sx={{ m: 0, p: 0 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: 1, fontSize: "1.1rem"}}>Tipo</TableCell>
              <TableCell sx={{ padding: 1, fontSize: "1.1rem" }}>Unidad</TableCell>
              <TableCell sx={{ padding: 1, fontSize: "1.1rem" }}>Cantidad</TableCell>
              <TableCell sx={{ padding: 1, fontSize: "1.1rem" }}>Descripción</TableCell>
              <TableCell sx={{ padding: 1, fontSize: "1.1rem" }}>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ m: 0, p: 0 }}>
            {[
              ...productos,
              {
                id: "",
                tipo: "CHICO",
                unidad: "KG",
                cantidad: 10,
                descripcion: "Producto de ejemplo",
              },
              {
                id: "",
                tipo: "MEDIANO",
                unidad: "KG",
                cantidad: 5,
                descripcion: "Otro producto de ejemplo",
              },
            ]
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((producto, index) => (
                <TableRow key={producto.id || index} sx={{ m: 0, p: 0 }}>
                  <TableCell sx={{ padding: 0 }}>{producto.tipo}</TableCell>
                  <TableCell sx={{ padding: 0 }}>{producto.unidad}</TableCell>
                  <TableCell sx={{ padding: 0 }}>{producto.cantidad}</TableCell>
                  <TableCell sx={{ padding: 0 }}>{producto.descripcion}</TableCell>
                  <TableCell sx={{ padding: 0 }}>
                    <Button
                      onClick={() => removeProduct(index)}
                      aria-label={`Eliminar producto ${producto.tipo}`}
                      sx={{ m: 0, p: 1 }}
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
        sx={{ m: 0, p: 0 }}
      />
    </Paper>
  );
};

export default ProductTable;
