// RemitosFormMock.tsx
import React from "react";
import { TextField, Box } from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { CustomButton, FormDatePicker, FormRow } from "../components/common";
import { useDialog } from "../hooks";
import { RemitoFormData } from "../types/types";
import Select from "react-select";
import ClientSelector from "./ClientSelector";
import ProductDialog from "./ProductDialog";
import ProductTable from "./ProductTable";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/es";
import "./RemitoFormMock.css";
import { TipoProducto } from "./remitoConstants";
import { FaPlus } from "react-icons/fa";


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
  contraReembolso: {
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
  const methods = useForm<RemitoFormData>({
    defaultValues: {
      fecha: dayjs(initialData.fecha, "DD-MM-YYYY"),
      remitenteId: { value: 1, label: initialData.remitente },
      destinatarioId: { value: 2, label: initialData.destinatario },
      remito: initialData.remito,
      cartaPorte: initialData.cartaPorte,
      tipoPago: initialData.tipoPago,
      tracking: initialData.tracking,
      bultos: initialData.bultos,
      descripcion: initialData.descripcion,
      seguro: initialData.seguro,
      contraReembolso: initialData.contraReembolso,
      detalleProductos: initialData.detalleProductos,
    },
  });

  const {
    register,
    control,
    formState: { errors },
  } = methods;


  return (
    <FormProvider {...methods}>
      <form className="remitos-form">

        {/* Fila superior con Fecha de Registro y Tracking */}
          <Box className="form-header" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
            <Box sx={{ width: "150px"}}>
              <FormDatePicker name="fecha" label="Fecha de Registro" />
            </Box>
            <Box sx={{ width: "150px"}}>
              <TextField
                label="Tracking"
                variant="outlined"
                value={initialData?.tracking}
                disabled
              />
            </Box>
          </Box>
        
        {/* Fila de Remitente y Destinatario */}
        <Box>
          <Box className="form-column" sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <ClientSelector
              name="remitenteId"
              label="Remitente"
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
              label="Destinatario"
              control={methods.control}
              options={[
                { value: 3, label: "Cliente C" },
                { value: 4, label: "Cliente D" },
              ]}
              errors={methods.formState.errors}
              data={clientes}
            />
          </Box>
        </Box>

        {/* Fila de Pago en */}
        <Box className="payment-field" sx={{marginBottom: 2}}>
          <label>Pago en</label>
          <Controller
            name="tipoPago"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { value: "ORIGEN", label: "ORIGEN" },
                  { value: "DESTINO", label: "DESTINO" },
                ]}
                placeholder="Seleccione un tipo de pago"
                onChange={(selectedOption) => {
                  field.onChange(selectedOption?.value);
                }}
                value={
                  field.value
                    ? { value: field.value, label: field.value }
                    : null
                }
                classNamePrefix="react-select"
              />
            )}
          />
          {errors.tipoPago && (
            <p className="error-message">{errors.tipoPago.message}</p>
          )}
        </Box>

        {/* Fila de Remito, CartaPorte, Bultos y Descripción */}
        <Box className="datos-pago" sx={{ display: "flex", gap: 2 }}>
          <Box className="datos-pago-item" sx={{ width: "200px" }}>
            <TextField
              label="Remito"
              variant="outlined"
              fullWidth
              {...register("remito")}
              className="styled-input"
              error={!!errors.remito}
              helperText={errors.remito?.message}
            />
          </Box>
          <Box className="datos-pago-item" sx={{ width: "200px" }}>
            <TextField
              label="Carta Porte"
              variant="outlined"
              fullWidth
              {...register("cartaPorte")}
              className="styled-input"
              error={!!errors.cartaPorte}
              helperText={errors.cartaPorte?.message}
            />
          </Box>
          <Box className="datos-pago-item" sx={{ width: "200px" }}>
            <TextField
              label="Bultos"
              variant="outlined"
              fullWidth
              {...register("bultos")}
              className="styled-input"
              error={!!errors.bultos}
              helperText={errors.bultos?.message}
            />
          </Box>
          <Box className="datos-pago-item" sx={{ width: "200px" }}>
            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              {...register("descripcion")}
              className="styled-input"
              error={!!errors.descripcion}
              helperText={errors.descripcion?.message}
            />
          </Box>
        </Box>

        {/* Grupo de Seguro y ContraReembolso en dos filas */}
        <Box className="seguro-reembolso-container" sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Fila de Seguro */}
          <Box className="seguro">
            <h3>Seguro</h3>
            <FormRow className="seguro-row">
              <Box className="seguro-item">
                <TextField
                  label="Valor Declarado"
                  type="number"
                  {...register("seguro.valorDeclarado")}
                  className="styled-input compact-input"
                  error={!!errors.seguro?.valorDeclarado}
                  helperText={errors.seguro?.valorDeclarado?.message}
                />
              </Box>
              <Box className="seguro-item">
                <TextField
                  sx={{ width: "226px" }} 
                  label="Coeficiente (%)"
                  type="number"
                  {...register("seguro.coeficiente")}
                  className="styled-input compact-input"
                  error={!!errors.seguro?.coeficiente}
                  helperText={errors.seguro?.coeficiente?.message}
                  slotProps={{
                    input: {
                      endAdornment: <span>%</span>,
                      inputProps: {
                        step: 0.01,
                        min: 0,
                        max: 1,
                      },
                    },
                  }}
                />
              </Box>
              <Box className="seguro-item">
                <TextField
                  label="Seguro Total"
                  type="number"
                  {...register("seguro.seguro")}
                  className="styled-input compact-input"
                  error={!!errors.seguro?.seguro}
                  helperText={errors.seguro?.seguro?.message}
                  value={                  
                    (methods.watch("seguro.valorDeclarado") || 0) *
                    (methods.watch("seguro.coeficiente") || 0)
                    }
                />
              </Box>
            </FormRow>
          </Box>

          {/* Fila de ContraReembolso */}
          <Box className="reembolso" >
            <h3>ContraReembolso</h3>
            <Box className="reembolso-row">
              <Box className="reembolso-item">
                <TextField
                  label="Importe" 
                  type="number"
                  {...register("contraReembolso.importe")}
                  className="styled-input compact-input"
                  error={!!errors.contraReembolso?.importe}
                  helperText={errors.contraReembolso?.importe?.message}
                />
              </Box>
              <Box className="reembolso-item">
                <TextField
                  sx={{ width: "226px" }} 
                  label="Coeficiente (%)"
                  type="number"
                  {...register("contraReembolso.coeficiente")}
                  className="styled-input compact-input"
                  error={!!errors.contraReembolso?.coeficiente}
                  helperText={errors.contraReembolso?.coeficiente?.message}
                  slotProps={{
                    input: {
                      endAdornment: <span>%</span>,
                      inputProps: {
                        step: 0.01,
                        min: 0,
                        max: 1,
                      },
                    },
                  }}
                />
              </Box>
              <Box className="reembolso-item">
                <TextField
                  label="Comision"
                  type="number"
                  {...register("contraReembolso.comision")}
                  className="styled-input compact-input"
                  error={!!errors.contraReembolso?.comision}
                  helperText={errors.contraReembolso?.comision?.message}
                  value={                  
                  (methods.watch("contraReembolso.importe") || 0) *
                  (methods.watch("contraReembolso.coeficiente") || 0)
                  }
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Botón para Agregar Producto */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, margin: "20px 0 5px" , height: "40px" }}>
          <h3>Productos</h3>
          <CustomButton onClick={productDialog.openDialog}>
            {<FaPlus />}
          </CustomButton>
        </Box>

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

        {/* Botón de Guardar */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 2 }}>
          <CustomButton
            type="submit"
            aria-label={"Guardar Remito"}
          >
            {"Guardar Remito"}
          </CustomButton> 
        </Box>
      </form>
    </FormProvider>
  );
};

export default RemitoFormMock;
