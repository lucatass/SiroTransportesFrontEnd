// hooks/useRemitoFilters.ts
import { useState, useMemo, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import { RemitoDto } from "../types/types";

export const useRemitoFilters = (data: RemitoDto[]) => {
  const [fechaDesde, setFechaDesde] = useState<Dayjs>(dayjs().subtract(7, "day"));
  const [fechaHasta, setFechaHasta] = useState<Dayjs>(dayjs());
  const [errorFecha, setErrorFecha] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const handleFechaDesdeChange = useCallback((newValue: Dayjs | null) => {
    if (newValue) {
      if (newValue.isAfter(fechaHasta)) {
        setErrorFecha('"Fecha Desde" no puede ser posterior a "Fecha Hasta".');
      } else {
        setErrorFecha(null);
        setFechaDesde(newValue);
      }
    }
  }, [fechaHasta]);

  const handleFechaHastaChange = useCallback((newValue: Dayjs | null) => {
    if (newValue) {
      if (newValue.isBefore(fechaDesde)) {
        setErrorFecha('"Fecha Hasta" no puede ser anterior a "Fecha Desde".');
      } else {
        setErrorFecha(null);
        setFechaHasta(newValue);
      }
    }
  }, [fechaDesde]);

  const handleSearchTextChange = useCallback((newText: string) => {
    setSearchText(newText);
  }, []);

  const filteredRowData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return data.filter((remito) => {
      const remitoFecha = dayjs(remito.fecha, "DD-MM-YYYY");
      return (
        (remitoFecha.isAfter(fechaDesde) || remitoFecha.isSame(fechaDesde, "day")) &&
        (remitoFecha.isBefore(fechaHasta) || remitoFecha.isSame(fechaHasta, "day"))
      );
    });
  }, [data, fechaDesde, fechaHasta]);

  return {
    fechaDesde,
    fechaHasta,
    errorFecha,
    handleFechaDesdeChange,
    handleFechaHastaChange,
    searchText,
    handleSearchTextChange,
    filteredRowData,
  };
};
