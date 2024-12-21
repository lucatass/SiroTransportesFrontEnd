/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

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

export const gridDefaultValueFormatter =
  (defaultValue: any) => (params: any) => {
    return params.value !== null && params.value !== undefined
      ? params.value
      : defaultValue;
  };

export const formatCurrency = (value: any, locale = "es-AR", currency = "ARS") => {
  if (typeof value !== "number") return "";
  return value.toLocaleString(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};