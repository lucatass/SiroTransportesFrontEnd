import React, { useReducer, useEffect } from "react";
import Select from "react-select";
import { TextField, Dialog, DialogContent, DialogActions, Box, Grid } from "@mui/material";
import { TipoProducto, UNIDADES } from "./remitoConstants";
import { Producto } from "../types/types";
import { CustomButton } from "../components/common";

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
    if (isOpen) {
      setState(initialState);
    }
  }, [isOpen]);

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
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            {/* Primera fila: Producto y Unidad */}
            <Grid item xs={12}>
              <Select
                options={Object.values(TipoProducto).map((tp) => ({
                  value: tp,
                  label: tp,
                }))}
                onChange={(option) =>
                  setState({ producto: option?.value as TipoProducto })
                }
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  control: (base) => ({ ...base, minHeight: 56 }),
                }}
                menuPosition="fixed"
                placeholder="Producto"
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                options={UNIDADES}
                onChange={(option) => setState({ unidad: option?.value || "" })}
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  control: (base) => ({ ...base, minHeight: 56 }),
                }}
                menuPosition="fixed"
                placeholder="Unidad"
              />
            </Grid>

            {/* Inputs alineados uno debajo del otro */}
            <Grid item xs={12}>
              <TextField
                label="Cantidad"
                type="number"
                value={state.cantidad === 0 ? "" : state.cantidad}
                onChange={(e) => {
                  const value = e.target.value;
                  setState({ cantidad: value === "" ? 0 : parseFloat(value) });
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Precio"
                type="number"
                value={state.precio === 0 ? "" : state.precio}
                onChange={(e) => {
                  const value = e.target.value;
                  setState({ precio: value === "" ? 0 : parseFloat(value) });
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Total"
                value={state.total.toFixed(2)}
                slotProps={{
                  input: { readOnly: true },
                }}
                fullWidth
              />
            </Grid>

            {/* Descripción */}
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                value={state.descripcion}
                onChange={(e) => setState({ descripcion: e.target.value })}
                fullWidth
                multiline
                rows={2} // Achicamos el tamaño
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}> {/* Centramos botones */}
        <CustomButton onClick={handleAddProduct} variant="contained">
          Añadir Producto
        </CustomButton>
        <CustomButton
          onClick={onRequestClose}
          sx={{
            backgroundColor: "red",
            "&:hover": { backgroundColor: "darkred" },
            color: "white",
          }}
        >
          Cancelar
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
