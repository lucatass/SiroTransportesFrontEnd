import React, { useReducer, useEffect } from "react";
import Select from "react-select";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Producto } from "../types/types";
import { TipoProducto, UNIDADES } from "./remitoConstants";

interface ProductDialogProps {
  isOpen: boolean;
  onRequestClose: () => void;
  addProduct: (product: Producto) => void;
}

const initialState: Producto = {
  producto: TipoProducto.FLETE,
  unidad: "",
  cantidad: 0,
  precio: 0,
  total: 0,
  descripcion: "",
};

const ProductDialog: React.FC<ProductDialogProps> = ({
  isOpen,
  onRequestClose,
  addProduct,
}) => {
  const [state, setState] = useReducer(
    (s: Producto, a: Partial<Producto>) => ({ ...s, ...a }),
    initialState
  );

  useEffect(() => {
    setState({ total: state.cantidad * state.precio });
  }, [state.cantidad, state.precio]);

  const handleAddProduct = () => {
    addProduct(state);
    setState(initialState); 
    onRequestClose();
  };

  return (
    <Dialog open={isOpen} onClose={onRequestClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar Producto</DialogTitle>
      <DialogContent>
        {/* Contenido del modal */}
        <Select
          options={Object.values(TipoProducto).map((tp) => ({
            value: tp,
            label: tp,
          }))}
          onChange={(option) =>
            setState({ producto: option?.value as TipoProducto })
          }
        />

        <Select
          options={UNIDADES}
          onChange={(option) => setState({ unidad: option?.value || "" })}
        />

        <TextField
          label="Cantidad"
          type="number"
          value={state.cantidad}
          onChange={(e) =>
            setState({ cantidad: parseFloat(e.target.value) || 0 })
          }
        />

        <TextField
          label="Precio"
          type="number"
          value={state.precio}
          onChange={(e) =>
            setState({ precio: parseFloat(e.target.value) || 0 })
          }
        />

        <TextField
          label="Total"
          value={state.total.toFixed(2)}
          InputProps={{ readOnly: true }}
        />

        <TextField
          label="Descripción"
          value={state.descripcion}
          onChange={(e) => setState({ descripcion: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddProduct} variant="contained" color="primary">
          Añadir Producto
        </Button>
        <Button onClick={onRequestClose} variant="outlined" color="secondary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
