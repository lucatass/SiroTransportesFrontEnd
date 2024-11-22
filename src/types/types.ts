// src/types/types.ts
import { TipoProducto } from "../remito-maqueta/remitoConstants";

export interface Option {
  value: string | number; // Generaliza para que sirva tanto para strings como números
  label: string;
}

export interface Direccion {
  domicilio: string;
  localidad: string;
  codigoPostal: string;
  provincia: string;
  pais: string;
}

export interface Cliente {
  id: number;
  razonSocial: string;
  tipoDoc: string;
  nroDoc: number;
  direcciones: Direccion[];
}

export interface Proveedor {
  id: string;
  razonSocial: string;
  tipoDoc: string;
  nroDoc: number;
  direcciones: Direccion[];
  transportista: boolean;
}

export interface Producto {
  producto: TipoProducto;
  unidad: string;
  cantidad: number;
  precio: number;
  total: number;
  descripcion: string;
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
  contraReembolso: ContraReembolso;
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

export interface RemitoRequest {
  fecha: string;
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

export interface RemitoFormProps {
  initialData?: RemitoDto | null;
  onSubmit: (data: RemitoRequest) => void;
  remitentesOptions: Option[];
  destinatariosOptions: Option[];
  remitentesData: Cliente[];
  destinatariosData: Cliente[];
}

export interface HojaRutaRequest {
  numero?: number;
  fecha: string | null;
  salida: string | null;
  llegada: string | null;
  origen: string | null;
  destino: string | null;
  transporteId: { value: number; label: string } | null;
  personalId: { value: number; label: string } | null;
  maquinariaId: { value: number; label: string } | null;
  remitosId: number[];
}

export interface HojaRutaDto {
  id: string;
  numero?: number;
  fecha: string;
  salida: string;
  llegada: string;
  cerrada: boolean;
  origen: string;
  destino: string;
  transporte: string | null;
  personal: string;
  camion: string;
  remitoDtos: RemitoDto[];
}

export interface HojaRutaFormProps {
  initialData?: HojaRutaDto | null;
  onSubmit: (data: HojaRutaRequest) => void;
  transporteOptions: Option[];
  personalOptions: Option[];
  camionOptions: Option[];
  remitentesOptions: Option[];
  destinatariosOptions: Option[];
  remitentesData: Cliente[];
  destinatariosData: Cliente[];
}

export interface Personal {
  id: string;
  nombre: string;
  nroDoc: number;
}

export interface Maquinaria {
  id: string;
  categoria: string;
  identificador: string;
  nombre: string;
  chasis: string;
  patente: string;
}
