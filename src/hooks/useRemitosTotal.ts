// src/hooks/useTotals.ts
import { useMemo } from "react";
import { RemitoDto } from "../types/types";

interface Totals {
  bultos: number;
  valorDeclarado: number;
  montoOrigen: number;
  montoDestino: number;
  contraReembolso: number;
  seguro: number;
}

export const useRemitosTotal = (remitos: RemitoDto[]): Totals => {
  const totals = useMemo(() => {
    return remitos.reduce(
      (acc, remito) => {
        acc.bultos += remito.bultos || 0;
        acc.valorDeclarado += remito.seguro?.valorDeclarado || 0;
        acc.montoOrigen += remito.montoOrigen || 0;
        acc.montoDestino += remito.montoDestino || 0;
        acc.contraReembolso += remito.contraReembolso?.comision || 0;
        acc.seguro += remito.seguro?.seguro || 0;
        return acc;
      },
      {
        bultos: 0,
        valorDeclarado: 0,
        montoOrigen: 0,
        montoDestino: 0,
        contraReembolso: 0,
        seguro: 0,
      }
    );
  }, [remitos]);

  return totals;
};
