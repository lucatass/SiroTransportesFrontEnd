import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
interface FormData {
  codigo: string;
  origen: string;
  destino: string;
  transporteId: string;
  personalId: string;
  maquinariaId: string;
  salida: string;
  llegada: string;
  cerrada: boolean;
}

type HRutaListProps = {
  formData: FormData | null;
};

const HRutaList: React.FC<HRutaListProps> = ({ formData }) => {
  const columnDefs: ColDef[] = [
    { headerName: 'Código', field: 'codigo' as keyof FormData, sortable: true, filter: true },
    { headerName: 'Sucursal Origen', field: 'origen' as keyof FormData, sortable: true, filter: true },
    { headerName: 'Sucursal Destino', field: 'destino' as keyof FormData, sortable: true, filter: true },
    { headerName: 'Transportes', field: 'transporteId' as keyof FormData, sortable: true, filter: true },
    { headerName: 'Fecha Salida', field: 'salida' as keyof FormData, sortable: true, filter: true },
    { headerName: 'Fecha Llegada', field: 'llegada' as keyof FormData, sortable: true, filter: true },
    { headerName: 'Cerrada', field: 'cerrada' as keyof FormData, sortable: true, filter: true, cellRenderer: (params: any) => (params.value ? 'Sí' : 'No') },
  ];
  // If no formData is passed, create an empty array
  const rowData = formData ? [formData] : [];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact 
        rowData={rowData}
        columnDefs={columnDefs}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default HRutaList;
