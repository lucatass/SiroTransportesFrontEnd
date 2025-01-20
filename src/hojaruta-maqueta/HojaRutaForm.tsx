/* eslint-disable @typescript-eslint/no-explicit-any */
// HojaRutaForm.tsx
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormDatePicker, FormRow, AutoCompleteSelector } from "../components";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import SelectedRemitosTable from "./SelectedRemitosTable";
import "./css/HojaRutaForm.css";
import { TipoProducto } from "../remito-maqueta/remitoConstants";
import "./css/HojaRutaForm.css";

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
];

const camionOptions = [
  { value: "1", label: "SCANIA" },
  { value: "2", label: "VOLVO" },
];

const HojaRutaForm: React.FC = () => {
  const methods = useForm();
  const [fleteTercero, setFleteTercero] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    console.log("Submit:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="hoja-ruta-form">
        {/* Header Top */}
        <Box className="section">
          <FormRow className="form-header">
            <FormDatePicker name="salida" label="Fecha de Salida" />
            <FormDatePicker name="llegada" label="Fecha de Llegada" />
            <TextField label="Estado" value={"ABIERTA"} disabled fullWidth />
          </FormRow>
        </Box>

        {/* Origen y Destino */}
        <Box className="section">
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <AutoCompleteSelector
                name="origen"
                label="Origen"
                control={control}
                options={[
                  { value: "BAS", label: "Buenos Aires" },
                  { value: "SNZ", label: "Santa Cruz" },
                ]}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <AutoCompleteSelector
                name="destino"
                label="Destino"
                control={control}
                options={[
                  { value: "BAS", label: "Buenos Aires" },
                  { value: "SNZ", label: "Santa Cruz" },
                ]}
              />
            </Box>
          </Box>
        </Box>

        {/* Checkbox para Flete Tercero */}
        <Box
          className="section"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Box>
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
          </Box>

          {/* Transporte Opcional */}
          {fleteTercero && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <AutoCompleteSelector
                name="transporteId"
                label="Transporte"
                control={control}
                options={transporteOptions}
              />
            </Box>
          )}
        </Box>

        {/* Personal y Camión */}
        <Box
          className="section"
          sx={{
            display: "flex",
            gap: 2,
            "& > div": {
              flex: 1,
              maxWidth: "200px",
            },
          }}
        >
          <Box>
            <AutoCompleteSelector
              name="personalId"
              label="Personal"
              control={control}
              options={personalOptions}
            />
          </Box>
          <Box>
            <AutoCompleteSelector
              name="maquinariaId"
              label="Camión"
              control={control}
              options={camionOptions}
            />
          </Box>
        </Box>

        {/* Tabla de Remitos */}
        <SelectedRemitosTable
          remitos={remitos}
          onView={(remito) => console.log("Ver Remito", remito)}
          onDelete={(id) => console.log("Eliminar Remito", id)}
        />
        {errors.remitosId && <p className="error-message">{"errorMsg"}</p>}

        {/* Sección de Totales */}
        <TotalsSection totals={totals} />

        {/* Botones de acción */}
        <CustomButton onClick={handleAddRemitos}>Agregar Remitos</CustomButton>
        <Box className="form-actions">
          <CustomButton type="submit">
            {selectedHojaRuta ? "Actualizar" : "Guardar"}
          </CustomButton>
        </Box>
      </form>

      {/* Modal para Seleccionar Remitos */}
      <RemitosSelectionDialog
        open={remitosModal.isOpen}
        remitos={remitos}
        isLoading={isLoading}
        onClose={handleCancelRemitosModal}
        setValue={setValue}
      />

      {/* Modal para Ver Remito */}
      <RemitoDialog
        isOpen={remitoDialog.isOpen}
        onClose={remitoDialog.closeDialog}
        remito={selectedRemito}
        onSubmit={(data) => {
          if (!selectedRemito?.cartaPorte) {
            logger.error("Error: cartaPorte no disponible.");
            return;
          }

          const transformedData = transformRemitoData(data);

          actualizarRemito(
            {
              cartaPorte: selectedRemito?.cartaPorte,
              request: transformedData,
            },
            {
              onSuccess: () => {
                logger.debug("Remito actualizado exitosamente");
                remitoDialog.closeDialog();
              },
              onError: (error) => {
                logger.error("Error al actualizar el remito:", error);
              },
            }
          );
        }}
        remitentesOptions={remitentesOptions}
        destinatariosOptions={destinatariosOptions}
        remitentesData={remitentesData}
        destinatariosData={destinatariosData}
      />
    </FormProvider>
  );
};

export default HojaRutaForm;
