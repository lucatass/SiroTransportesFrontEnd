/* eslint-disable @typescript-eslint/no-explicit-any */
// HojaRutaForm.tsx
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormDatePicker, FormRow, AutoCompleteSelector, TotalsSection } from "../components";
import { Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import SelectedRemitosTable from "./SelectedRemitosTable";
import "./css/HojaRutaForm.css";
import { TipoProducto } from "../remito-maqueta/remitoConstants";
import { useRemitosTotal } from "../hooks/useRemitosTotal";

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

const HojaRutaForm: React.FC = () => {
  const methods = useForm();
  const { control, handleSubmit } = methods;
  const [fleteTercero, setFleteTercero] = useState(false);
  const totals = useRemitosTotal(remitos);
  
  const onSubmit = (data: any) => {
    console.log("Submit:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="hoja-ruta-form">
        {/* Header Top */}
        <div className="section">
          <FormRow className="form-header">
            <FormDatePicker name="fecha" label="Fecha" />
            <FormDatePicker name="salida" label="Fecha de Salida" />
            <FormDatePicker name="llegada" label="Fecha de Llegada" />
            <TextField label="Estado" value="ABIERTA" disabled fullWidth />
          </FormRow>
        </div>

        {/* Origen y Destino */}
        <div className="section">
          <FormRow>
            <AutoCompleteSelector
              name="origen"
              label="Origen"
              control={control}
              options={[
                { value: "BAS", label: "Buenos Aires" },
                { value: "SNZ", label: "Santa Cruz" },
              ]}
              errors={{
                origen: {
                  message: "El origen es obligatorio.",
                },
              }}
            />
            <AutoCompleteSelector
              name="destino"
              label="Destino"
              control={control}
              options={[
                { value: "BAS", label: "Buenos Aires" },
                { value: "SNZ", label: "Santa Cruz" },
              ]}
              errors={{
                destino: {
                  message: "El destino es obligatorio.",
                },
              }} // Simula un error para diseño
            />
          </FormRow>
        </div>

        {/* Checkbox para Flete Tercero */}
        <div className="section">
          <FormRow>
            <FormControlLabel
              control={
                <Checkbox
                  checked={fleteTercero}
                  onChange={(e) => setFleteTercero(e.target.checked)}
                />
              }
              label="Flete Tercero"
            />
          </FormRow>

          {fleteTercero && (
            <FormRow>
              <AutoCompleteSelector
                name="transporteId"
                label="Transporte"
                control={control}
                options={[
                  { value: "1", label: "Transporte A" },
                  { value: "2", label: "Transporte B" },
                ]}
                errors={{
                  origen: {
                    message: "El origen es obligatorio.",
                  },
                }}
              />
            </FormRow>
          )}

          {/* Personal y Camión */}
          <FormRow>
            <AutoCompleteSelector
              name="personalId"
              label="Personal"
              control={control}
              options={personalOptions}
              errors={{
                origen: {
                  message: "El origen es obligatorio.",
                },
              }}
            />
            <AutoCompleteSelector
              name="maquinariaId"
              label="Camión"
              control={control}
              options={camionOptions}
              errors={{
                origen: {
                  message: "El origen es obligatorio.",
                },
              }}
            />
          </FormRow>
        </div>

        {/* Tabla de Remitos */}
        <SelectedRemitosTable
          remitos={remitos}
          onView={(remito) => console.log("Ver Remito", remito)}
          onDelete={(id) => console.log("Eliminar Remito", id)}
        />

        {/* Sección de Totales */}
        <TotalsSection totals={totals} />
        
        {/* Botones de acción */}
        <div className="form-actions">
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default HojaRutaForm;
