import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise"; //Excel
import { ColDef } from "ag-grid-community";
import RemitosForm from "./RemitosForm";

interface FormData {
  remitosid: number;
  remitos: string;
  fecha: string;
}

const RemitosList: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rowData, setRowData] = useState<FormData[]>([]);
  const [searchText, setSearchText] = useState("");
  const gridRef = useRef<AgGridReact>(null);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const modalContent = document.getElementById("modal-content");
    if (modalContent && !modalContent.contains(event.target as Node)) {
      closeForm();
    }
  };

  useEffect(() => {
    fetch("/public/remitos.json") // Adjust this to match your correct path
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); // Check if the data has `nombre` and `id`
        setRowData(data);
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  const columnDefs: ColDef[] = [
    {
      headerName: "Tercero",
      field: "nombre",
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      headerName: "ID",
      field: "remitosid",
      sortable: false,
      filter: true,
      width: 100,
    },
    {
      headerName: "Fecha",
      field: "fecha",
      sortable: false,
      filter: true,
      width: 100,
    },
  ];

  const exportToExcel = () => {
    gridRef.current?.api.exportDataAsExcel({
      fileName: "remitosData.xlsx",
      sheetName: "remitos",
    });
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value); // Update text
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
        {/* Form button */}
        <button onClick={openForm} style={{ borderRadius: "0.3rem" }}>
          Añadir
        </button>

        {/* Excel export button */}
        <button onClick={exportToExcel} style={{ borderRadius: "0.3rem" }}>
          Exportar a Excel
        </button>
      </div>

      {/* Search bar */}
      <div style={{ margin: "0" }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchText}
          onChange={onSearch}
          style={{ padding: "5px", borderRadius: "0.3rem", width: "225px" }}
        />
      </div>

      {/* AG Grid Table */}
      <div className="ag-theme-alpine" style={{ height: 400, width: 400 }}>
        <AgGridReact
          ref={gridRef} // Reference to access grid API
          rowData={rowData} // Make sure rowData is populated
          columnDefs={columnDefs}
          domLayout="autoHeight"
          quickFilterText={searchText} // Add the quick filter property
        />
      </div>

      {/* Popup form */}
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
            backgroundColor: "rgb(0,0,0)",
          }}
          onClick={handleClickOutside}
        >
          <div
            id="modal-content"
            className="modal-content"
            style={{
              backgroundColor: "#fefefe",
              margin: "5% auto",
              padding: "20px",
              border: "1px solid #888",
              width: "60%",
              borderRadius: "0.3rem",
            }}
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
            <RemitosForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default RemitosList;
