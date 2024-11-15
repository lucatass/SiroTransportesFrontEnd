import { ColDef } from "ag-grid-community";
import dayjs from "dayjs";

export const UNIDADES = ["KG", "TN", "BU", "%", "M3"].map((unidad) => ({
  value: unidad,
  label: unidad,
}));

export const PRODUCTOS = [
  "CHICO",
  "MEDIANO",
  "GRANDE",
  "XL",
  "XXL",
  "PALLET_NO_FRAGIL",
  "PALLET_FRAGIL",
  "DONACION",
  "TRANSPORTE_MERCADERIA",
].map((producto) => ({
  value: producto,
  label: producto,
}));

export const remitoColumnDefs: ColDef[] = [
  { headerName: "Id", field: "id", sortable: true, filter: true, flex: 1 },
  {
    headerName: "Fecha",
    field: "fecha",
    sortable: true,
    filter: true,
    flex: 1,
    valueFormatter: (params) =>
      dayjs(params.value, "DD-MM-YYYY").format("DD-MM-YYYY"),
  },
  {
    headerName: "Remito",
    field: "remito",
    sortable: true,
    filter: true,
    flex: 1,
  },
  {
    headerName: "CartaPorte",
    field: "cartaPorte",
    sortable: true,
    filter: true,
    flex: 1,
  },
  {
    headerName: "Remitente",
    field: "remitente",
    sortable: true,
    filter: true,
    flex: 2,
  },
  {
    headerName: "Destinatario",
    field: "destinatario",
    sortable: true,
    filter: true,
    flex: 2,
  },
  {
    headerName: "TipoPago",
    field: "tipoPago",
    sortable: true,
    filter: true,
    flex: 1,
  },
  {
    headerName: "Tracking",
    field: "tracking",
    sortable: true,
    filter: true,
    flex: 1,
  },
];
