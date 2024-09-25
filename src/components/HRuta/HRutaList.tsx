import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { ColDef } from "ag-grid-community";
import HRutaForm from "./HRutaForm";
import { subDays, isAfter } from "date-fns";

const HRutaList: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rowData, setRowData] = useState<FormData[]>([]);
  const [searchText, setSearchText] = useState(""); // State for search input
  const [days, setDays] = useState<number>(1); // Default filter value for 10 days
  const gridRef = useRef<AgGridReact>(null); // Reference to the AgGridReact instance

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const modalContent = document.getElementById("modal-content");
    if (modalContent && !modalContent.contains(event.target as Node)) {
      closeForm();
    }
  };

  // Fetch JSON data on component mount
  useEffect(() => {
    fetch("HRuta.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setRowData(data);
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  // Filter data based on the selected number of days
  const filteredRowData = rowData.filter((row) => {
    const salidaDate = new Date(row.salida); // Convert 'salida' field to Date object
    const cutoffDate = subDays(new Date(), days); // Calculate the date n days ago
    return isAfter(salidaDate, cutoffDate); // Keep rows where 'salida' is after the cutoff date
  });

  // Definir columnas
  const columnDefs: ColDef[] = [
    {
      headerName: "Fecha Salida",
      field: "salida",
      sortable: true,
      filter: false,
      width: 120,
    },
    {
      headerName: "Fecha Llegada",
      field: "llegada",
      sortable: true,
      filter: false,
      width: 120,
    },
    {
      headerName: "Origen",
      field: "origen",
      sortable: false,
      filter: true,
      width: 100,
    },
    {
      headerName: "Destino",
      field: "destino",
      sortable: false,
      filter: true,
      width: 100,
      valueFormatter: (params) => params.value || "-",
    },
    {
      headerName: "Transportes",
      field: "transporteId",
      sortable: false,
      filter: true,
      width: 125,
      valueFormatter: (params) => params.value || "-",
    },
    {
      headerName: "Personal",
      field: "personalId",
      sortable: false,
      filter: true,
      width: 110,
      valueFormatter: (params) => params.value || "-",
    },
    {
      headerName: "Maquinaria",
      field: "maquinariaId",
      sortable: false,
      filter: true,
      width: 120,
      valueFormatter: (params) => params.value || "-",
    },
    {
      headerName: "Cerrada",
      field: "cerrada",
      sortable: true,
      filter: true,
      cellRenderer: (params) => (params.value ? "Sí" : "No"),
      width: 100,
    },
    {
      headerName: "Unidad",
      field: "unidad",
      sortable: false,
      filter: true,
      width: 100,
    },
    {
      headerName: "Código",
      field: "codigo",
      sortable: true,
      filter: true,
      width: 100,
    },
  ];

  const gridOptions = {
    rowHeight: 45, // Altura de filas para un diseño más compacto
    animateRows: true,
    pagination: true,
    paginationPageSize: 10,
    enableCharts: true,
    enableRangeSelection: true,
    enableCellChangeFlash: true, // Destacar cambios en las celdas
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
    },
  };

  // Exportar a Excel
  const exportToExcel = () => {
    gridRef.current?.api.exportDataAsExcel({
      fileName: "HRutaData.xlsx",
      sheetName: "HRutas",
    });
  };

  // Busqueda
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value); // Actualizar texto de búsqueda
  };

  // Manejar cambios de días
  const handleDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDays(Number(event.target.value)); // Actualizar el número de días
  };

  return (
    <div
      style={{color: "white", padding: "20px" }}
    >
      <div style={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
        {/* Botón para formulario */}
        <button onClick={openForm} style={{ borderRadius: "0.3rem" }}>
          Añadir
        </button>

        {/* Botón para exportar a Excel */}
        <button onClick={exportToExcel} style={{ borderRadius: "0.3rem" }}>
          Exportar a Excel
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div style={{ margin: "0" }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchText}
          onChange={onSearch}
          style={{ padding: "5px", borderRadius: "0.3rem", width: "225px" }}
        />
      </div>

      {/* Filtro de días */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <label htmlFor="days-input" style={{ marginRight: "10px" }}>
          Mostrar datos de los últimos
        </label>
        <input
          id="days-input"
          type="number"
          value={days}
          onChange={handleDaysChange}
          style={{
            padding: "5px",
            borderRadius: "0.3rem",
            width: "80px",
            marginRight: "10px",
          }}
        />
        <span> días</span>
      </div>

      {/* AG Grid */}
      {!isFormOpen && (
        <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            rowData={filteredRowData}
            columnDefs={columnDefs}
            domLayout="autoHeight"
            quickFilterText={searchText}
          />
        </div>
      )}

      {/* Formulario emergente */}
      {isFormOpen && (
        <div
          className="modal"
          style={{
            display: "block",
            position: "fixed",
            zIndex: 1,
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            overflow: "auto",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          onClick={handleClickOutside}
        >
          <div
            id="modal-content"
            style={{
              backgroundColor: "transparent",
              margin: "5% auto",
              padding: "0",
              width: "60%",
              borderRadius: "10px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="close"
              onClick={closeForm}
              style={{
                color: "#aaa",
                float: "right",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            >
              &times;
            </span>
            <HRutaForm closeForm={closeForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HRutaList;
