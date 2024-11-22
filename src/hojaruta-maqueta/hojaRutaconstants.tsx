/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColDef } from "ag-grid-community";
import { gridFormatDate } from "../components";
import * as Yup from "yup";

export const hojaRutaSchema = Yup.object().shape({
  numero: Yup.number().optional().typeError("Debe ser un número"),
  fecha: Yup.date()
    .required("La fecha es obligatoria")
    .typeError("Debe ser una fecha válida"),
  salida: Yup.date()
    .required("La fecha de salida es obligatoria")
    .typeError("Debe ser una fecha válida"),
  llegada: Yup.date()
    .required("La fecha de llegada es obligatoria")
    .typeError("Debe ser una fecha válida"),
  origen: Yup.object({
    value: Yup.string().required("El valor de origen es obligatorio"),
    label: Yup.string().required(),
  }).required("El origen es obligatorio"),
  destino: Yup.object({
    value: Yup.string().required("El valor de destino es obligatorio"),
    label: Yup.string().required(),
  }).required("El destino es obligatorio"),
  transporteId: Yup.object({
    value: Yup.number().required(),
    label: Yup.string().required(),
  }).nullable(),
  personalId: Yup.object({
    value: Yup.number().required(),
    label: Yup.string().required(),
  }),
  maquinariaId: Yup.object({
    value: Yup.number().required(),
    label: Yup.string().required(),
  }),
  remitosId: Yup.array()
    .of(Yup.number().required("Debe ser un ID válido"))
    .min(1, "Debe incluir al menos un remito")
    .required("Debe seleccionar al menos un remito"),
});

// Columnas para la tabla principal (Hojas de Ruta)
export const hojaRutaGrid: ColDef[] = [
  {
    headerName: "Expandir",
    field: "expand",
    width: 80,
    cellRenderer: (params: any) => {
      const { node } = params;
      return (
        <button
          onClick={() => node.setExpanded(!node.expanded)}
          style={{ cursor: "pointer" }}
        >
          {node.expanded ? "-" : "+"}
        </button>
      );
    },
  },
  { headerName: "Número", field: "numero", sortable: true, filter: true },
  {
    headerName: "Fecha",
    field: "fecha",
    sortable: true,
    filter: true,
    valueFormatter: gridFormatDate,
  },
  {
    headerName: "Fecha Salida",
    field: "salida",
    sortable: true,
    filter: true,
    valueFormatter: gridFormatDate,
  },
  {
    headerName: "Fecha Llegada",
    field: "llegada",
    sortable: true,
    filter: true,
    valueFormatter: gridFormatDate,
  },
  { headerName: "Origen", field: "origen", sortable: true, filter: true },
  { headerName: "Destino", field: "destino", sortable: true, filter: true },
];

// Columnas para la tabla detalle (Remitos)
export const remitosColumnDefs: ColDef[] = [
  { headerName: "ID", field: "id", width: 80 },
  {
    headerName: "Fecha",
    field: "fecha",
    valueFormatter: gridFormatDate,
    width: 120,
  },
  { headerName: "Remitente", field: "remitente", width: 150 },
  { headerName: "Destinatario", field: "destinatario", width: 150 },
  { headerName: "Bultos", field: "bultos", width: 100 },
];
