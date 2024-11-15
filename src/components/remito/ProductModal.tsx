import React, { useReducer } from "react";
import Modal from "react-modal";
import Select from "react-select";
import { Button, TextField } from "@mui/material";
import { Producto } from "../../types/types";
import { UNIDADES, PRODUCTOS } from "./remitoConstants";

interface Option {
  value: string;
  label: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  addProduct: (product: Producto) => void;
}

const initialState: Producto = {
  unidad: "",
  tipo: "",
  cantidad: 0,
  descripcion: "",
};

type Action =
  | { type: "SET_UNIDAD"; payload: string }
  | { type: "SET_TIPO"; payload: string }
  | { type: "SET_CANTIDAD"; payload: number }
  | { type: "SET_DESCRIPCION"; payload: string }
  | { type: "RESET" };

const reducer = (state: Producto, action: Action): Producto => {
  switch (action.type) {
    case "SET_UNIDAD":
      return { ...state, unidad: action.payload };
    case "SET_TIPO":
      return { ...state, tipo: action.payload };
    case "SET_CANTIDAD":
      return { ...state, cantidad: action.payload };
    case "SET_DESCRIPCION":
      return { ...state, descripcion: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onRequestClose,
  addProduct,
}) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddProduct = () => {
    if (
      state.unidad.trim() === "" ||
      state.tipo.trim() === "" ||
      state.cantidad <= 0
    ) {
      alert("Por favor completa todos los campos del producto correctamente.");
      return;
    }

    if (state.descripcion.length > 100) {
      alert("La descripción no debe superar los 100 caracteres.");
      return;
    }

    addProduct(state);
    dispatch({ type: "RESET" });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Agregar Producto"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <h3>Agregar Producto</h3>

      <Select<Option, false>
        options={PRODUCTOS}
        placeholder="Seleccione el tipo"
        onChange={(selectedOption) =>
          dispatch({
            type: "SET_TIPO",
            payload: selectedOption?.value || "",
          })
        }
        aria-label="Tipo de Producto"
      />

      <div className="modal-row">
        <Select<Option, false>
          options={UNIDADES}
          placeholder="Seleccione la unidad"
          onChange={(selectedOption) =>
            dispatch({
              type: "SET_UNIDAD",
              payload: selectedOption?.value || "",
            })
          }
          aria-label="Unidad del Producto"
        />

        <TextField
          type="number"
          label="Cantidad"
          value={state.cantidad}
          onChange={(e) =>
            dispatch({
              type: "SET_CANTIDAD",
              payload: parseInt(e.target.value) || 0,
            })
          }
          aria-label="Cantidad del Producto"
        />
      </div>

      <TextField
        label="Descripción"
        value={state.descripcion}
        onChange={(e) =>
          dispatch({
            type: "SET_DESCRIPCION",
            payload: e.target.value,
          })
        }
        aria-label="Descripción del Producto"
      />

      <div className="modal-buttons-container">
        <Button variant="contained" onClick={handleAddProduct}>
          Añadir Producto
        </Button>
        <Button variant="outlined" onClick={onRequestClose}>
          Cancelar
        </Button>
      </div>
    </Modal>
  );
};

export default ProductModal;
