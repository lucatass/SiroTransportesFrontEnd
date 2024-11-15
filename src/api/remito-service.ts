import { RemitoDto } from "../types/types";
import { Dayjs } from "dayjs";

const BASE_URL = `http://localhost:8080/api`;

export const fetchRemitos = async (
  fechaDesde?: Dayjs,
  fechaHasta?: Dayjs
): Promise<RemitoDto[]> => {
  const params = new URLSearchParams();
  if (fechaDesde) params.append("fechaDesde", fechaDesde.format("DD-MM-YYYY"));
  if (fechaHasta) params.append("fechaHasta", fechaHasta.format("DD-MM-YYYY"));

  // const response = await fetch(`${BASE_URL}/remitos?${params.toString()}`, {
  //   cache: "no-store",
  // });

  const response = await fetch(`${BASE_URL}/remitos`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error al obtener los remitos");
  }

  return response.json();
};

export const addRemitoApi = async (remito: RemitoDto): Promise<RemitoDto> => {
  const response = await fetch(`${BASE_URL}/remitos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(remito),
  });

  if (!response.ok) {
    throw new Error("Error al agregar el remito");
  }

  return response.json();
};

export const updateRemitoApi = async (
  remito: RemitoDto
): Promise<RemitoDto> => {
  const response = await fetch(`${BASE_URL}/remitos/${remito.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(remito),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el remito");
  }

  return response.json();
};

export const deleteRemitoApi = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/remitos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el remito");
  }

  return;
};
