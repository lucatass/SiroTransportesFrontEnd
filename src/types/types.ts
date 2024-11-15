// src/types/types.ts

import { Dayjs } from "dayjs";

/**
 * Dirección de un Cliente
 */
export interface Direccion {
  domicilio: string;
  localidad: string;
  codigoPostal: string;
  provincia: string;
  pais: string;
}

/**
 * Cliente (Remitente o Destinatario)
 */
export interface Cliente {
  id: number;
  razonSocial: string;
  tipoDoc: string;
  nroDoc: number;
  direcciones: Direccion[];
}

/**
 * Producto incluido en un Remito
 */
export interface Producto {
  unidad: string;
  tipo: string;
  cantidad: number;
  descripcion: string;
}

/**
 * Datos de un Remito para mostrar en la tabla
 */
export interface RemitoDto {
  id: string; // UUID generado en frontend por ahora
  fecha: string;
  remito: string;
  cartaPorte: string;
  remitente: string;
  destinatario: string;
  tipoPago: string;
  tracking: string; // Siempre proporcionado por backend
  valorDeclarado: number;
  descripcion: string;
  recoleccion: number;
  contrareembolso: number;
  seguro: number;
  productos: Producto[];
}

/**
 * Datos del formulario para crear o editar un Remito
 */
export interface RemitoFormData {
  id?: string; // Generado en frontend por ahora
  fecha: Dayjs | null; // Por defecto, se establece en la fecha de hoy
  remito: string;
  cartaPorte: string;
  remitenteId: { value: number; label: string } | null;
  destinatarioId: { value: number; label: string } | null;
  tipoPago: string;
  tracking?: string; // Opcional, proporcionado por backend
  valorDeclarado: number;
  descripcion: string;
  recoleccion: number;
  contrareembolso: number;
  seguro: number;
  productos: Producto[];
}

/**
 * Props para el componente RemitosForm
 */
export interface RemitosFormProps {
  initialData?: RemitoDto | null;
  onSubmit: (data: RemitoDto) => void;
}
