/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const Sucursales = [
  { value: "BAS", label: "BS AS" },
  { value: "SNZ", label: "SAENZ PEÑA" },
  { value: "RST", label: "RESISTENCIA" },
];

export const obtenerLabelSucursal = (codigo: string): string => {
  const sucursal = Sucursales.find((s) => s.value === codigo);
  return sucursal?.label || codigo;
};

export const gridFormatDate = (params: any): string => {
  // Si es una fila agrupada, retorna vacío
  if (params.node.group) {
    return "";
  }
  // Validar y formatear la fecha
  if (!params.value || !dayjs(params.value, "DD-MM-YYYY", true).isValid()) {
    return "Fecha inválida";
  }
  return dayjs(params.value, "DD-MM-YYYY").format("DD-MM-YYYY");
};

export const isAnyLoading = (...loadingStates: boolean[]) => loadingStates.some(Boolean);

export const isAnyError = (...errorStates: boolean[]) => errorStates.some(Boolean);

export const BASE_URL = `http://localhost:8080/api`;