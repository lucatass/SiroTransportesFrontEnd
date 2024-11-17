// src/types/types.ts

import { Dayjs } from "dayjs";
import { TipoProducto } from "../remito-maqueta/remitoConstants";

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
  producto: TipoProducto;
  unidad: string;
  cantidad: number;
  precio: number;
  total: number;
  descripcion: string;
}

/**
 * Datos de un Remito para mostrar en la tabla
 */
export interface RemitoDto {
  id: string;
  fecha: string;
  remito: string;
  cartaPorte: string;
  remitente?: string;
  destinatario?: string;
  tipoPago: string;
  tracking: string; // Siempre proporcionado por backend
  bultos: number;
  descripcion: string;
  seguro: Seguro;
  contrareembolso: ContraReembolso;
  montoOrigen?: number;
  montoDestino?: number;
  afectacion?: string; // Siempre proporcionado por backend
  facturaId?: string;
  factura?: string;
  hojaReparto?: string;
  hojaRuta?: string;
  detalleProductos: Producto[];
  lastModified?: string;
  createdOn?: string;
  usuario?: string;
}

export interface RemitoFormData {
  id?: string; // Generado en frontend por ahora
  fecha: Dayjs | null; // Por defecto, se establece en la fecha de hoy
  remito: string;
  cartaPorte: string;
  remitenteId: { value: number; label: string } | null;
  destinatarioId: { value: number; label: string } | null;
  tipoPago: string;
  tracking?: string; // Opcional, proporcionado por backend
  descripcion: string;
  bultos: number;
  seguro: Seguro;
  contrareembolso: ContraReembolso;
  detalleProductos: Producto[];
}

export interface ContraReembolso {
  importe: number;
  coeficiente: number;
  comision: number;
}

export interface Seguro {
  valorDeclarado: number;
  coeficiente: number;
  seguro: number;
}

export interface RemitosFormProps {
  initialData?: RemitoDto | null;
  onSubmit: (data: RemitoDto) => void;
}
