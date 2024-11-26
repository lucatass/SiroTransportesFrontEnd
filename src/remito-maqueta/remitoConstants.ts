/* eslint-disable @typescript-eslint/no-explicit-any */
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