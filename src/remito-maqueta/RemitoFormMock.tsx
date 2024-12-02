// RemitosFormMock.tsx
import React from "react";
import { TextField, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { FormDatePicker, FormRow } from "../components";
import { useDialog } from "../hooks";
import { RemitoRequest } from "../types/types";
import Select from "react-select";
import ClientSelector from "./ClientSelector";
import ProductDialog from "./ProductDialog";
import ProductTable from "./ProductTable";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/es";
import "./RemitoFormMock.css";
import { TipoProducto } from "./remitoConstants";

dayjs.extend(customParseFormat);

const initialData = {
  id: "1",
  fecha: "11-11-2024", // Formato "DD-MM-YYYY"
  remitente: "Señor Marshant",
  destinatario: "Mormand",
  remito: "10001",
  cartaPorte: "20001",
  bultos: 10,
  totalOrigen: 50000,
  totalDestino: 50000,
  tipoPago: "DESTINO",
  descripcion: "prueba",
  tracking: "PLANTA",
  afectacion: null,
  facturaId: null,
  factura: null,
  hojaReparto: "N/A",
  hojaRuta: "N/A",
  seguro: {
    valorDeclarado: 20000,
    coeficiente: 0.05,
    seguro: 1000,
  },
  contrareembolso: {
    importe: 500,
    coeficiente: 0.02,
    comision: 10,
  },
  detalleProductos: [
    {
      producto: TipoProducto.CHICO,
      unidad: "TN",
      cantidad: 10,
      precio: 5000,
      total: 50000,
      descripcion: "Prueba Producto",
    },
    {
      producto: TipoProducto.CHICO,
      unidad: "PC",
      cantidad: 0.02,
      precio: 10000,
      total: 200,
      descripcion: "Prueba ContraReembolso",
    },
  ],
};

const clientes = [
  {
    id: 3,
    razonSocial: "Daiberman Social",
    tipoDoc: "CUIT",
    nroDoc: 34567890123,
    direcciones: [
      {
        domicilio: "Calle Principal 456",
        localidad: "Rosario",
        codigoPostal: "2000",
        provincia: "Santa Fe",
        pais: "Argentina",
      },
    ],
  },
  {
    id: 4,
    razonSocial: "Mormand",
    tipoDoc: "CUIT",
    nroDoc: 45678901234,
    direcciones: [
      {
        domicilio: "Ruta Nacional 9 Km 150",
        localidad: "Mar del Plata",
        codigoPostal: "7600",
        provincia: "Buenos Aires",
        pais: "Argentina",
      },
    ],
  },
]

const RemitoFormMock: React.FC = () => {
  const productDialog = useDialog();
  const methods = useForm<RemitoRequest>({
    defaultValues: {
      remitenteId: { value: 1, label: initialData.remitente },
      destinatarioId: { value: 2, label: initialData.destinatario },
      remito: initialData.remito,
      cartaPorte: initialData.cartaPorte,
      tipoPago: initialData.tipoPago,
      tracking: initialData.tracking,
      bultos: initialData.bultos,
      descripcion: initialData.descripcion,
      seguro: initialData.seguro,
      contrareembolso: initialData.contrareembolso,
      detalleProductos: initialData.detalleProductos,
    },
  });

  const isLoadingRemitentes = false; // Simula carga de remitentes
  const isLoadingDestinatarios = false; // Simula carga de destinatarios
  const isErrorRemitentes = false; // Simula error de remitentes
  const isErrorDestinatarios = false; // Simula error de destinatarios
  const errorRemitentes = { message: "Error al cargar remitentes" }; // Mensaje de error simulado
  const errorDestinatarios = { message: "Error al cargar destinatarios" };

  return (
    <FormProvider {...methods}>
      <form className="remitos-form">
        <h2>Crear Remito</h2>
          <div className="form-container">
          {/* Mostrar un mensaje de carga si los datos se están obteniendo */}
          {isLoadingRemitentes || isLoadingDestinatarios ? (
            <p>Cargando datos...</p>
          ) : isErrorRemitentes ? (
            <p className="error-message">{errorRemitentes.message}</p>
          ) : isErrorDestinatarios ? (
            <p className="error-message">{errorDestinatarios.message}</p>
          ) : null}

          {/* Fila superior con Fecha de Registro y Tracking */}
          <FormRow className="form-header">
            <div className="fecha-field">
              <FormDatePicker
                name="fecha"
                label="Fecha de Registro"
                format="DD-MM-YYYY"
                
              />
            </div>
            <div className="tracking-field">
              <TextField label="Tracking" variant="outlined" fullWidth disabled size="small"/>
            </div>
          </FormRow>

          {/* Fila de Remitente y Destinatario */}
          <FormRow className="clientes-row">
              <ClientSelector
                name="remitenteId"
                label="Remitente&nbsp;"
                control={methods.control}
                options={[
                  { value: 3, label: "Daiberman Social" },
                  { value: 4, label: "Mormand" },
                ]}
                errors={methods.formState.errors}
                data={clientes}
              />
              <ClientSelector
                name="destinatarioId"
                label="Destinatario&nbsp;"
                control={methods.control} // Lo mismo aquí
                options={[
                  { value: 3, label: "Cliente C" },
                  { value: 4, label: "Cliente D" },
                ]}
                errors={methods.formState.errors}
                data={clientes}
              />
          </FormRow>

          <div className="divider"/>
          {/* Fila de Pago en */}
          <FormRow className="flex-row">

          <div className="payment-field">
            <label>Pago en</label>
            <Select
              options={[
                { value: "ORIGEN", label: "ORIGEN" },
                { value: "DESTINO", label: "DESTINO" },
              ]}
              placeholder="tipo de pago"
            />
          </div>

          {/* Fila de Remito, Carta Porte, Bultos y Descripción */}
          <div className="datos-remito">
            <div className="flex-column">
              <TextField label="Remito" variant="outlined" size="small" sx={{ width: 130 }}/>
            </div>
            <div className="flex-column">
              <TextField label="Carta Porte" variant="outlined" size="small" sx={{ width: 130 }} />
            </div>
            <div className="flex-column">
              <TextField label="Bultos" variant="outlined" size="small" sx={{ width: 130 }}/>
            </div>
            <div className="flex-column">
              <TextField label="Descripción" variant="outlined" size="small" sx={{ width: 130 }}/>
            </div>

          </div>
          </FormRow>

          {/* Grupo de Seguro y ContraReembolso */}
          <div className="field-group-container compact">
            {/* Fila de Seguro */}
            <div className="field-group compact">
              <div className="importes-header">
                <h3>Seguro</h3> <h3>ContraReembolso</h3>
              </div>
              
              <FormRow className="gastos-fields">
                <div className="field">
                  <p>Valor Declarado</p>
                  <TextField  type="number" size="small" sx={{ width: 100 }} defaultValue={0.00}  />
                </div>
                <div className="field">
                  <p>Coeficiente (%)</p>
                  <TextField  type="number" size="small" sx={{ width: 100 }} defaultValue={0.00}  />
                </div>
                <div className="field">
                  <p>Comisión</p>
                  <TextField  type="number" size="small" sx={{ width: 100 }} defaultValue={0.00}  />
                </div>

            {/* Fila de ContraReembolso */}
                <div className="vertical-line"></div>
                <div className="importe-field">
                  <p>Importe</p>
                  <TextField  type="number" size="small" sx={{ width: 100 }} defaultValue={0.00}   />
                </div>
                <div className="field">
                  <p>Coeficiente (%)</p>
                  <TextField  type="number" size="small" sx={{ width: 100 }} defaultValue={0.00}   />
                </div>
                <div className="field">
                  <p>Comisión</p>
                  <TextField  type="number" size="small" sx={{ width: 100 }} defaultValue={0.00}   />
                </div>
              </FormRow>
            </div>
          </div>

         

          {/* Tabla de productos */}
          <ProductTable
            productos={initialData.detalleProductos}
            removeProduct={() => {}}
          />

          {/* Dialogo de Producto */}
          <ProductDialog
            isOpen={productDialog.isOpen}
            onRequestClose={productDialog.closeDialog}
            addProduct={() => {}}
          />
        </div>
         {/* Botón para agregar productos */}
         <FormRow className="button-row">
            <Button variant="contained" onClick={productDialog.openDialog}>
              Agregar Producto
            </Button>
            {/* Botón de guardar */}
            <Button type="submit" variant="contained" color="primary">
              Guardar Remito
            </Button>
          
          </FormRow>

      </form>
    </FormProvider>
  );
};

export default RemitoFormMock;
