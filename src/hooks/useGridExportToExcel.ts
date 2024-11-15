// hooks/useGridExportToExcel.ts
import { useRef } from "react";
import { AgGridReact } from "ag-grid-react";

const useGridExportToExcel = () => {
  const gridRef = useRef<AgGridReact>(null);

  const exportToExcel = (fileName: string, sheetName: string) => {
    gridRef.current?.api.exportDataAsExcel({
      fileName: `${fileName}.xlsx`,
      sheetName,
    });
  };

  return { gridRef, exportToExcel };
};

export default useGridExportToExcel;
