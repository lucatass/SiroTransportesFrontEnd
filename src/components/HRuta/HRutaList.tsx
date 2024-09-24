import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise'; // Excel 
import { ColDef } from 'ag-grid-community';
import HRutaForm from './HRutaForm';
import { format, subDays, isAfter } from 'date-fns'; // Import date-fns functions

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
  unidad: string;
}

const HRutaList: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rowData, setRowData] = useState<FormData[]>([]);
  const [searchText, setSearchText] = useState(''); // State for search input
  const [days, setDays] = useState<number>(1); // Default filter value for 10 days
  const gridRef = useRef<AgGridReact>(null); // Reference to the AgGridReact instance

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const modalContent = document.getElementById('modal-content');
    if (modalContent && !modalContent.contains(event.target as Node)) {
      closeForm();
    }
  };

  // Fetch JSON data on component mount
  useEffect(() => {
    fetch('HRuta.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setRowData(data);
      })
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);

  // Filter data based on the selected number of days
  const filteredRowData = rowData.filter((row) => {
    const salidaDate = new Date(row.salida); // Convert 'salida' field to Date object
    const cutoffDate = subDays(new Date(), days); // Calculate the date n days ago
    return isAfter(salidaDate, cutoffDate); // Keep rows where 'salida' is after the cutoff date
  });

  const columnDefs: ColDef[] = [
    { headerName: 'Fecha Salida', field: 'salida', sortable: true, filter: false, width: 120 },
    { headerName: 'Fecha Llegada', field: 'llegada', sortable: true, filter: false, width: 120 },
    { headerName: 'Origen', field: 'origen', sortable: false, filter: true, width: 100 },
    { headerName: 'Destino', field: 'destino', sortable: false, filter: true, width: 100, valueFormatter: (params) => params.value || '-' },
    { headerName: 'Transportes', field: 'transporteId', sortable: false, filter: true, width: 125, valueFormatter: (params) => params.value || '-' },
    { headerName: 'Personal', field: 'personalId', sortable: false, filter: true, width: 110, valueFormatter: (params) => params.value || '-' },
    { headerName: 'Maquinaria', field: 'maquinariaId', sortable: false, filter: true, width: 120, valueFormatter: (params) => params.value || '-' },
    { headerName: 'Cerrada', field: 'cerrada', sortable: true, filter: true, cellRenderer: (params: any) => (params.value ? 'Sí' : 'No'), width: 100 },
    { headerName: 'Unidad', field: 'unidad', sortable: false, filter: true, width: 100 },
    { headerName: 'Código', field: 'codigo', sortable: true, filter: true, width: 100 },
  ];

  const exportToExcel = () => {
    gridRef.current?.api.exportDataAsExcel({
      fileName: 'HRutaData.xlsx',
      sheetName: 'HRutas',
    });
  };

  // Search functionality
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value); // Update search text
  };

  // Handle days input change
  const handleDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDays(Number(event.target.value)); // Update the number of days
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
        {/* Form button */}
        <button onClick={openForm} style={{ borderRadius: '0.3rem' }}>
          Añadir
        </button>

        {/* Excel export button */}
        <button onClick={exportToExcel} style={{ borderRadius: '0.3rem' }}>
          Exportar a Excel
        </button>
      </div>

      {/* Search bar */}
      <div style={{ margin: '0' }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchText}
          onChange={onSearch}
          style={{ padding: '5px', borderRadius: '0.3rem', width: '225px' }}
        />
      </div>

      {/* Filtro de días */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label htmlFor="days-input" style={{ marginRight: '10px' }}>
          Mostrar datos de los últimos
        </label>
        <input
          id="days-input"
          type="number"
          value={days}
          onChange={handleDaysChange}
          style={{ padding: '5px', borderRadius: '0.3rem', width: '80px', marginRight: '10px' }}
        />
        <span> días</span>
      </div>

      {/* AG Grid Table */}
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact
          ref={gridRef} // Reference to access grid API
          rowData={filteredRowData} // Filtered data based on the number of days
          columnDefs={columnDefs}
          domLayout="autoHeight"
          quickFilterText={searchText} // Add the quick filter property
        />
      </div>

      {/* Popup form */}
      {isFormOpen && (
        <div
          className="modal"
          style={{ display: 'block', position: 'fixed', zIndex: 1, left: 0, top: 0, width: '100%', height: '100%', overflow: 'auto', backgroundColor: 'rgb(0,0,0)' }}
          onClick={handleClickOutside}
        >
          <div
            id="modal-content"
            className="modal-content"
            style={{ backgroundColor: '#fefefe', margin: '5% auto', padding: '20px', border: '1px solid #888', width: '60%', borderRadius: '0.3rem' }}
          >
            <span
              className="close"
              onClick={closeForm}
              style={{ color: '#aaa', float: 'right', fontSize: '28px', fontWeight: 'bold' }}
            >
              &times;
            </span>
            <HRutaForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default HRutaList;
