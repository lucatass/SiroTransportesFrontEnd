// RemitosForm.tsx
import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, FormProvider, Controller } from "react-hook-form";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/es";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { v4 as uuidv4 } from "uuid";
import {
  Cliente,
  Producto, 
  RemitoFormData,
  RemitosFormProps,
  RemitoDto,
} from "../../types/types";
import ClientSelector from "./ClientSelector";
import ProductModal from "./ProductModal";
import ProductTable from "./ProductTable";
import { FormDatePicker, FormRow } from "../common";
import "./RemitosForm.css";

dayjs.extend(customParseFormat);

const schema = Yup.object().shape({
  fecha: Yup.date().required("La fecha es obligatoria"),
  remitenteId: Yup.object().required("El remitente es obligatorio"),
  destinatarioId: Yup.object().required("El destinatario es obligatorio"),
  remito: Yup.string().required("El remito es obligatorio"),
  cartaPorte: Yup.string().required("La carta porte es obligatoria"),
  tipoPago: Yup.string().required("El tipo de pago es obligatorio"),
  valorDeclarado: Yup.number()
    .typeError("Debe ser un número")
    .min(0, "El valor no puede ser negativo"),
  descripcion: Yup.string().max(
    50,
    "La descripción no debe superar los 50 caracteres"
  ),
  recoleccion: Yup.number()
    .typeError("Debe ser un número")
    .min(0, "El valor no puede ser negativo"),
  contrareembolso: Yup.number()
    .typeError("Debe ser un número")
    .min(0, "El valor no puede ser negativo"),
  seguro: Yup.number()
    .typeError("Debe ser un número")
    .min(0, "El valor no puede ser negativo"),
});

const BASE_URL = `http://localhost:8080/api`;

const RemitosForm: React.FC<RemitosFormProps> = ({ initialData, onSubmit }) => {
  const methods = useForm<RemitoFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fecha: initialData ? dayjs(initialData.fecha, "DD-MM-YYYY") : dayjs(),
      remitenteId: initialData
        ? { value: initialData.remitenteId, label: initialData.remitente }
        : null,
      destinatarioId: initialData
        ? { value: initialData.destinatarioId, label: initialData.destinatario }
        : null,
      remito: initialData?.remito || "",
      cartaPorte: initialData?.cartaPorte || "",
      tipoPago: initialData?.tipoPago || "ORIGEN",
      tracking: initialData?.tracking || "", // Solo visualizable
      valorDeclarado: initialData?.valorDeclarado || 0,
      descripcion: initialData?.descripcion || "",
      recoleccion: initialData?.recoleccion || 0,
      contrareembolso: initialData?.contrareembolso || 0,
      seguro: initialData?.seguro || 0,
      productos: initialData?.productos || [],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = methods;

  const isEditMode = initialData !== undefined && initialData !== null;
  const [productos, setProductos] = useState<Producto[]>(
    initialData?.productos || []
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // React Query for fetching remitentes
  const {
    data: remitentesData,
    isLoading: isLoadingRemitentes,
    isError: isErrorRemitentes,
    error: errorRemitentes,
  } = useQuery<Cliente[]>({
    queryKey: ["remitentes"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/remitentes`);
      if (!response.ok) {
        throw new Error("Error al obtener remitentes");
      }
      return response.json();
    },
  });

  const {
    data: destinatariosData,
    isLoading: isLoadingDestinatarios,
    isError: isErrorDestinatarios,
    error: errorDestinatarios,
  } = useQuery<Cliente[]>({
    queryKey: ["destinatarios"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/destinatarios`);
      if (!response.ok) {
        throw new Error("Error al obtener destinatarios");
      }
      return response.json();
    },
  });

  useEffect(() => {
    if (initialData && remitentesData && destinatariosData) {
      if (remitentesData.length > 0 && destinatariosData.length > 0) {
        const remitente = remitentesData.find(
          (r) => r.razonSocial === initialData.remitente
        );
        const destinatario = destinatariosData.find(
          (d) => d.razonSocial === initialData.destinatario
        );

        methods.setValue(
          "remitenteId",
          remitente
            ? { value: remitente.id, label: remitente.razonSocial }
            : null
        );
        methods.setValue(
          "destinatarioId",
          destinatario
            ? { value: destinatario.id, label: destinatario.razonSocial }
            : null
        );
      }
    }
  }, [initialData, remitentesData, destinatariosData, methods]);

  const remitentesOptions = useMemo(
    () => remitentesData?.map((r) => ({ value: r.id, label: r.razonSocial })) || [],
    [remitentesData]
  );
  
  const destinatariosOptions = useMemo(
    () => destinatariosData?.map((d) => ({ value: d.id, label: d.razonSocial })) || [],
    [destinatariosData]
  );  

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const addProduct = (product: Producto) => {
    setProductos((prev) => [...prev, product]);
  };

  const removeProduct = (index: number) => {
    setProductos((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmitForm = (data: RemitoFormData) => {
    if (productos.length === 0) {
      alert("Debes agregar al menos un producto.");
      return;
    }

    const remitente = remitentesData?.find((c) => c.id === data.remitenteId?.value);
    const destinatario = destinatariosData?.find((c) => c.id === data.destinatarioId?.value);      

    const formData: RemitoDto = {
      id: isEditMode && initialData?.id ? initialData.id : uuidv4(),
      fecha: data.fecha ? dayjs(data.fecha).format("DD-MM-YYYY") : "",
      remito: data.remito,
      cartaPorte: data.cartaPorte,
      remitente: remitente ? remitente.razonSocial : "Desconocido",
      destinatario: destinatario ? destinatario.razonSocial : "Desconocido",
      tipoPago: data.tipoPago,
      tracking: isEditMode ? initialData.tracking : "",
      valorDeclarado: data.valorDeclarado,
      descripcion: data.descripcion,
      recoleccion: data.recoleccion,
      contrareembolso: data.contrareembolso,
      seguro: data.seguro,
      productos,
    };

    if (isEditMode) {
      console.log("Actualizando remito:", formData);
    } else {
      console.log("Creando nuevo remito:", formData);
    }

    onSubmit(formData);

    // Resetear formulario si es necesario
    reset({
      fecha: dayjs(), // Restablecer a la fecha de hoy
      remitenteId: null,
      destinatarioId: null,
      remito: "",
      cartaPorte: "",
      tipoPago: "ORIGEN",
      tracking: "",
      valorDeclarado: 0,
      descripcion: "",
      recoleccion: 0,
      contrareembolso: 0,
      seguro: 0,
      productos: [],
    });

    setProductos([]);
    closeModal();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitForm)} className="remitos-form">
        <h2>{isEditMode ? "Editar Remito" : "Crear Remito"}</h2>

        {/* Mostrar un mensaje de carga si los datos se están obteniendo */}
        {isLoadingRemitentes || isLoadingDestinatarios ? (
          <p>Cargando datos...</p>
        ) : isErrorRemitentes ? (
          <p className="error-message">{errorRemitentes.message}</p>
        ) : isErrorDestinatarios ? (
          <p className="error-message">{errorDestinatarios.message}</p>
        ) : null}

        {/* Fila 1: Fecha de Registro */}
        <FormRow>
          <div className="form-column">
            <FormDatePicker
              name="fecha"
              label="Fecha de Registro"
              format="DD-MM-YYYY"
            />
            {errors.fecha && (
              <p className="error-message">{errors.fecha.message}</p>
            )}
          </div>
        </FormRow>

        {/* Fila 2: Remitente y Destinatario */}
        <FormRow>
          <div className="form-column">
            <ClientSelector
              name="remitenteId"
              label="Remitente"
              control={control}
              options={remitentesOptions}
              errors={errors}
              data={remitentesData || []}
            />
          </div>

          <div className="form-column">
            <ClientSelector
              name="destinatarioId"
              label="Destinatario"
              control={control}
              options={destinatariosOptions}
              errors={errors}
              data={destinatariosData || []}
            />
          </div>
        </FormRow>

        {/* Fila 3: Remito, CartaPorte, Valor Declarado y Descripción */}
        <FormRow>
          <div className="form-column">
            <TextField
              label="Remito"
              variant="outlined"
              fullWidth
              {...register("remito")}
              error={!!errors.remito}
              helperText={errors.remito?.message}
            />
          </div>
          <div className="form-column">
            <TextField
              label="Carta Porte"
              variant="outlined"
              fullWidth
              {...register("cartaPorte")}
              error={!!errors.cartaPorte}
              helperText={errors.cartaPorte?.message}
            />
          </div>
          <div className="form-column">
            <TextField
              type="number"
              label="Valor declarado"
              variant="outlined"
              fullWidth
              {...register("valorDeclarado")}
              error={!!errors.valorDeclarado}
              helperText={errors.valorDeclarado?.message}
            />
          </div>
          <div className="form-column">
            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              {...register("descripcion")}
              error={!!errors.descripcion}
              helperText={errors.descripcion?.message}
            />
          </div>
        </FormRow>

        {/* Fila 4: Pago En y Tracking */}
        <FormRow>
          <div className="form-column">
            <label>Tipo de Pago</label>
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
          </div>
          <div className="form-column">
            <TextField
              label="Tracking"
              variant="outlined"
              fullWidth
              {...register("tracking")}
              error={!!errors.tracking}
              helperText={errors.tracking?.message}
              disabled // Solo visualizable
            />
          </div>
        </FormRow>

        {/* Fila 5: Recolección y Contrareembolso */}
        <FormRow>
          <div className="form-column">
            <TextField
              type="number"
              label="Recolección"
              variant="outlined"
              fullWidth
              {...register("recoleccion")}
              error={!!errors.recoleccion}
              helperText={errors.recoleccion?.message}
            />
          </div>
          <div className="form-column">
            <TextField
              type="number"
              label="Contrareembolso"
              variant="outlined"
              fullWidth
              {...register("contrareembolso")}
              error={!!errors.contrareembolso}
              helperText={errors.contrareembolso?.message}
            />
          </div>
          <div className="form-column">
            <TextField
              type="number"
              label="Seguro"
              variant="outlined"
              fullWidth
              {...register("seguro")}
              error={!!errors.seguro}
              helperText={errors.seguro?.message}
            />
          </div>
        </FormRow>

        {/* Botón para Agregar Producto */}
        <FormRow>
          <Button variant="contained" onClick={openModal}>
            Agregar Producto
          </Button>
        </FormRow>

        {/* Modal de Producto */}
        <ProductModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          addProduct={addProduct}
        />

        {/* Tabla de Productos */}
        <ProductTable productos={productos} removeProduct={removeProduct} />

        {/* Botón de Guardar */}
        <FormRow>
          <Button
            type="submit"
            variant="contained"
            aria-label={isEditMode ? "Actualizar Remito" : "Guardar Remito"}
          >
            {isEditMode ? "Actualizar Remito" : "Guardar Remito"}
          </Button>
        </FormRow>
      </form>
    </FormProvider>
  );
};

export default RemitosForm;
