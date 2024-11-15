/* eslint-disable @typescript-eslint/no-explicit-any */
// DataTable.tsx
import { useState } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { TablePagination } from "@mui/material";
import { FaEye, FaPrint, FaTrash } from "react-icons/fa";
import "../../theme/AgGrid.css";

interface DataTableProps {
  rowData: any[];
  columnDefs: ColDef[];
  onEdit: (data: any) => void;
  onPrint: (data: any) => void;
  onDelete: (data: any) => void;
  searchText: string;
}

export interface DataTableRef {
  exportToExcel: () => void;
}

const DataTable = forwardRef<DataTableRef, DataTableProps>(
  ({ rowData, columnDefs, onEdit, onPrint, onDelete, searchText }, ref) => {
    const gridRef = useRef<AgGridReact<any>>(null);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useImperativeHandle(ref, () => ({
      exportToExcel: () => {
        gridRef.current?.api.exportDataAsExcel({
          fileName: "dataExport.xlsx",
          sheetName: "Data",
        });
      },
    }));

    // Handle page change
    const handleChangePage = (
      _event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number
    ) => {
      setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0); // Reset to first page
    };

    // Filtered data for pagination
    const paginatedRowData = rowData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    const mergedColumnDefs = [
      ...columnDefs,
      {
        headerName: "Actions",
        field: "actions",
        cellRenderer: (params: any) => (
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => onEdit(params.data)}
              className="action-button"
              title="View"
            >
              <FaEye />
            </button>
            <button
              onClick={() => onPrint(params.data)}
              className="action-button"
              title="Print"
            >
              <FaPrint />
            </button>
            <button
              onClick={() => onDelete(params.data)}
              className="action-button delete-button"
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>
        ),
        flex: 1,
      },
    ];

    return (
      <div>
        <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            rowData={paginatedRowData} // Only pass paginated data
            columnDefs={mergedColumnDefs}
            domLayout="autoHeight"
            quickFilterText={searchText}
          />
        </div>
        {/* Pagination controls */}
        <TablePagination
          component="div"
          count={rowData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </div>
    );
  }
);

export default DataTable;
