/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import {
  RemitoDto,
  TipoProducto,
} from "../../types/types";
import { useDialog } from "../../hooks";
import { useRemitosTotal } from "../../hooks/useRemitosTotal";
import {
  FormDatePicker,
  FormTimePicker,
  FormRow,
  AutoCompleteSelector,
  RemitoDialog,
  SelectedRemitosTable,
  TotalsSection,
} from "../index";
import { Sucursales } from "../commonConstants";
import RemitosHojaRepartoDialog from "./RemitosHojaRepartoDialog";
import "dayjs/locale/es";
import "./css/HojaRepartoForm.css";


const remitos = [
  {
    id: "4",
    fecha: "22-05-2024",
    tracking: "PLANTA",
    remitente: "Pablo Moringo",
    destinatario: "Mormand",
    tipoPago: "DESTINO",
    remito: "1",
    cartaPorte: "2",
    bultos: 5,
    descripcion: "prueba",
    seguro: {
      valorDeclarado: 1000.0,
      coeficiente: 0.05,
      seguro: 50.0,
    },
    contraReembolso: {
      id: 4,
      cartaPorte: 2,
      tercero: "Chevrolet",
      coeficiente: 0.05,
      importe: 1000.0,
      comision: 50.0,
      fechaRecepcion: null,
      fechaEntrega: null,
      estado: "PENDIENTE",
    },
    montoOrigen: 0,
    montoDestino: 50000.0,
    afectacion: "",
    facturaId: "null",
    factura: "null",
    hojaReparto: "N/A",
    hojaRuta: "1",
    detalleProductos: [
      {
        producto: TipoProducto.FLETE,
        unidad: "TN",
        cantidad: 10.0,
        precio: 5000.0,
        total: 50000.0,
        descripcion: "Prueba Producto",
      },
    ],
    lastModified: "2024-11-15T22:12:11.894-03:00",
    createdOn: "2024-11-15T22:12:11.894-03:00",
    usuario: "dober",
  },
];

const personalOptions = [
  { value: "1", label: "Domingo" },
  { value: "2", label: "Peron" },
]

const camionOptions = [
  { value: "1", label: "SCANIA" },
  { value: "2", label: "VOLVO" },
]

const transporteOptions = [
  { value: "1", label: "Pepe" },
  { value: "2", label: "Grillio" },
]

const HojaRepartoForm: React.FC = () => {
  const methods = useForm();
  const { control } = methods;
  const [selectedRemito, setSelectedRemito] = useState<RemitoDto>();
  const [fleteTercero, setFleteTercero] = useState(false);

  const remitosModal = useDialog();
  const remitoDialog = useDialog();
  const totals = useRemitosTotal(remitos);

  // Funciones de manejo
  const handleViewRemito = (remito: RemitoDto) => {
    setSelectedRemito(remito);
    remitoDialog.openDialog();
  };

  const handleAddRemitos = () => {
    remitosModal.openDialog();
  };

  const handleCancelRemitosModal = () => {
    setSelectedRemito(undefined);
    remitosModal.closeDialog();
  };

  return (
    <FormProvider {...methods}>

      <form
        onSubmit={() => console.log("submit")}
        className="hoja-reparto-form"
      >
        {/* Header Top */}
        <div className="section">
        <h2>Hoja de reparto</h2>

          <FormRow className="form-header">
            <FormDatePicker name="fecha" label="Fecha" />
            <FormTimePicker name="salida" label="Hora Salida" />
            <FormTimePicker name="llegada" label="Hora Llegada" />
            <TextField
              label="Estado"
              value={"ABIERTA"}
              disabled
              fullWidth
            />
          </FormRow>
        </div>

        {/* Sucursal */}
        <div className="sucursal">
            <FormRow>
              <AutoCompleteSelector
                name="sucursal"
                label="Sucursal"
                control={control}
                options={Sucursales}
              />
          <div className="vertical-section"/>
          {/* Checkbox para Flete Tercero */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={fleteTercero}
                    onChange={(e) => setFleteTercero(e.target.checked)}
                    color="primary"
                  />
                }
                label="Flete Tercero"
              />

            {/* Transporte Opcional */}
            {fleteTercero && ( // Muestra solo si el checkbox está activado
                <AutoCompleteSelector
                  name="transporteId"
                  label="Transporte"
                  control={control}
                  options={transporteOptions}
                />
            )}

            {/* Personal y Camión */}
              <AutoCompleteSelector
                name="personalId"
                label="Personal"
                control={control}
                options={personalOptions}
              />
              <AutoCompleteSelector
                name="maquinariaId"
                label="Camión"
                control={control}
                options={camionOptions}
              />
          </FormRow>
        </div>
          <div className="section"/>
        {/* Tabla de Remitos */}
        <SelectedRemitosTable
          remitos={remitos}
          onView={handleViewRemito}
          onDelete={() => console.log("Removiendo remito")}
        />
 
        {/* Sección de Totales */}
        <TotalsSection totals={totals} />

        {/* Botones */}
        <div className="form-actions">
          <Button variant="contained" color="primary" onClick={handleAddRemitos}>
            Agregar Remitos
          </Button>
            <Button type="submit" variant="contained" color="primary">
              Guardar
            </Button>
        </div>
      </form>

      {/* Modal para Seleccionar Remitos */}
      <RemitosHojaRepartoDialog
        open={remitosModal.isOpen}
        remitos={remitos}
        isLoading={false}
        onClose={handleCancelRemitosModal}
        setValue={() => console.log("seteando remito")}
      />

      {/* Modal para Ver Remito */}
      <RemitoDialog
        isOpen={remitoDialog.isOpen}
        onClose={remitoDialog.closeDialog}
        remito={selectedRemito || remitos[0]}
        onSubmit={() => console.log("Remito Dialog")}
        remitentesOptions={[]}
        destinatariosOptions={[]}
        remitentesData={[]}
        destinatariosData={[]}
      />
    </FormProvider>
  );
};

export default HojaRepartoForm;
