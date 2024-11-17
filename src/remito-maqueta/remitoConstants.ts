/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import * as Yup from "yup";

dayjs.extend(customParseFormat);

export const UNIDADES = ["KG", "TN", "BU", "%", "M3"].map((unidad) => ({
  value: unidad,
  label: unidad,
}));

// Enum para tipos de producto en TypeScript
export enum TipoProducto {
  CHICO = "Chico",
  MEDIANO = "Mediano",
  GRANDE = "Grande",
  XL = "XL",
  XXL = "XXL",
  PALLET_NO_FRAGIL = "Pallet No Frágil",
  PALLET_FRAGIL = "Pallet Frágil",
  DONACION = "Donacion",
  RECOLECCION = "Recoleccion",
  FLETE = "Flete",
}

export const remitoSchema = Yup.object().shape({
  fecha: Yup.date().required("La fecha es obligatoria"),
  remitenteId: Yup.object().required("El remitente es obligatorio"),
  destinatarioId: Yup.object().required("El destinatario es obligatorio"),
  remito: Yup.string().required("El remito es obligatorio"),
  cartaPorte: Yup.string().required("La carta porte es obligatoria"),
  tipoPago: Yup.string().required("El tipo de pago es obligatorio"),
  bultos: Yup.number().required("Bultos no ingresados"),
  descripcion: Yup.string().max(
    50,
    "La descripción no debe superar los 50 caracteres"
  ),
  seguro: Yup.object({
    valorDeclarado: Yup.number()
      .required("El valor declarado es obligatorio")
      .typeError("Debe ser un número"),
    coeficiente: Yup.number()
      .required("El coeficiente de seguro es obligatorio")
      .typeError("Debe ser un número")
      .min(0, "El coeficiente debe ser mayor o igual a 0")
      .max(1, "El coeficiente no puede ser mayor que 1"),
    seguro: Yup.number()
      .required("El monto del seguro es obligatorio")
      .typeError("Debe ser un número"),
  }),
  contrareembolso: Yup.object({
    importe: Yup.number()
      .required("El importe del contrareembolso es obligatorio")
      .typeError("Debe ser un número"),
    coeficiente: Yup.number()
      .required("El coeficiente de contrareembolso es obligatorio")
      .typeError("Debe ser un número")
      .min(0, "El coeficiente debe ser mayor o igual a 0")
      .max(1, "El coeficiente no puede ser mayor que 1"),
    comision: Yup.number()
      .required("La comisión es obligatoria")
      .typeError("Debe ser un número"),
  }),
});
