import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise'; // Excel
import { ColDef } from 'ag-grid-community';
import { format, subDays, isAfter } from 'date-fns';
import HRepForm from './HRepForm';

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
  const [originalData, setOriginalData] = useState<FormData[]>([]); // Store original data
  const [searchText, setSearchText] = useState('');
  const [days, setDays] = useState<number>(1);
  const gridRef = useRef<AgGridReact>(null);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  useEffect(() => {
    // Fetch data from HRuta.json
    fetch('HRuta.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setRowData(data);
        setOriginalData(data); // Store the original data when loaded
      })
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);

// Function to check if a date is within the last N days
const isWithinLastNDays = (salida: string) => {
  const salidaDate = new Date(salida);
  const cutoffDate = subDays(new Date(), days);
  return isAfter(salidaDate, cutoffDate);
};

// Filter data based on days without losing original data
const handleFilter = () => {
  const filteredData = originalData.filter((row) => isWithinLastNDays(row.salida)); 
  setRowData(filteredData); // Update the filtered data
};

// Reset filter to show all data
const resetFilter = () => {
  setRowData([...originalData]); // Spread original data to avoid mutation
};

  const columnDefs: ColDef[] = [
    { headerName: 'Fecha Salida', field: 'salida', sortable: true, filter: false, width: 120 },
    { headerName: 'Fecha Llegada', field: 'llegada', sortable: true, filter: false, width: 120 },
    { headerName: 'Origen', field: 'origen', sortable: false, filter: true, width: 100 },
    { headerName: 'Destino', field: 'destino', sortable: false, filter: true, width: 100 },
    { headerName: 'Transportes', field: 'transporteId', sortable: false, filter: true, width: 125 },
    { headerName: 'Personal', field: 'personalId', sortable: false, filter: true, width: 110 },
    { headerName: 'Maquinaria', field: 'maquinariaId', sortable: false, filter: true, width: 120 },
    { headerName: 'Cerrada', field: 'cerrada', sortable: true, filter: true, cellRenderer: (params: { value: boolean; }) => (params.value ? 'Sí' : 'No'), width: 100 },
    { headerName: 'Unidad', field: 'unidad', sortable: false, filter: true, width: 100 },
    { headerName: 'Código', field: 'codigo', sortable: true, filter: true, width: 100 },
  ];

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
        {/* Form button */}
        <button onClick={openForm} style={{ borderRadius: '0.3rem' }}>
          Añadir
        </button>

        {/* Excel export button */}
        <button onClick={handleFilter} style={{ borderRadius: '0.3rem' }}>
          Filtrar por últimos {days} días
        </button>

        {/* Reset filter button */}
        <button onClick={resetFilter} style={{ borderRadius: '0.3rem' }}>
          Resetear filtro
        </button>
      </div>

      {/* AG Grid Table */}
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact
          ref={gridRef} // Reference to access grid API
          rowData={rowData} // Use filtered data
          columnDefs={columnDefs}
          domLayout="autoHeight"
        />
      </div>

      {/* Popup form */}
      {isFormOpen && (
        <div
          className="modal"
          style={{
            display: 'block',
            position: 'fixed',
            zIndex: 1,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            overflow: 'auto',
            backgroundColor: 'rgb(0,0,0)',
          }}
        >
          <div
            id="modal-content"
            className="modal-content"
            style={{
              backgroundColor: '#fefefe',
              margin: '5% auto',
              padding: '20px',
              border: '1px solid #888',
              width: '60%',
              borderRadius: '0.3rem',
            }}
          >
            <span
              className="close"
              onClick={closeForm}
              style={{ color: '#aaa', float: 'right', fontSize: '28px', fontWeight: 'bold' }}
            >
              &times;
            </span>
            <HRepForm/>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRutaList;
