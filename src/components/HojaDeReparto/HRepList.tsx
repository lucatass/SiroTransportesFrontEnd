import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise'; // Excel 
import { ColDef } from 'ag-grid-community';
import { format } from 'date-fns';
import HRepForm from './HRepForm';

interface FormData {
  salida: string;
  llegada: string;
  origen: string;
  destino: string;
  personalId: string;
  maquinariaId: string;
  cerrada: boolean;
  kms: number;
  gastos: number;
  codigo: string;
  remitoid: string;
}

const HRepList: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rowData, setRowData] = useState<FormData[]>([]);
  const [filteredData, setFilteredData] = useState<FormData[]>([]);
  const [searchText, setSearchText] = useState('');
  const [days, setDays] = useState(10); // Default days to filter
  const gridRef = useRef<AgGridReact>(null);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const modalContent = document.getElementById('modal-content');
    if (modalContent && !modalContent.contains(event.target as Node)) {
      closeForm();
    }
  };

  useEffect(() => {
    fetch('/hreparto.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);
        setRowData(data);
      })
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);

  const getOldestDate = (days: number) => {
    const today = new Date();
    return new Date(today.setDate(today.getDate() - days));
  };

  const isWithinLastNDays = (dateStr: string) => {
    const date = new Date(dateStr);
    const oldestDate = getOldestDate(days);
    return date >= oldestDate;
  };

  const dateFormat = (dateStr: string) => {
    return format(new Date(dateStr), 'dd/MM/yy ');
  }
  const columnDefs: ColDef[] = [
    {headerName: 'Salida',field: 'salida',sortable: true,filter: false,width: 120,
      filterParams: {
        filterOptions: ['date'],
        comparator: (filterValue: string, cellValue: string) => {
          if (!cellValue) return -1;
          return isWithinLastNDays(cellValue) ? 0 : 1;
        },
      },
      cellRenderer: (params: { value: string; }) => dateFormat(params.value),
    },
    {headerName: 'Llegada',field: 'llegada',sortable: true,filter: false,width: 120,cellRenderer: (params: { value: string; }) => dateFormat(params.value)},
    { headerName: 'Origen', field: 'origen', sortable: true, filter: false, width: 100 },
    { headerName: 'Destino', field: 'destino', sortable: true, filter: false, width: 100 },
    { headerName: 'Personal ID', field: 'personalId', sortable: true, filter: false, width: 120 },
    { headerName: 'Maquinaria ID', field: 'maquinariaId', sortable: true, filter: false, width: 140 },
    { headerName: 'Cerrada', field: 'cerrada', sortable: true, filter: true, width: 100 },
    { headerName: 'KMs', field: 'kms', sortable: true, filter: false, width: 80 },
    { headerName: 'Gastos', field: 'gastos', sortable: true, filter: false, width: 100 },
    { headerName: 'RemitoID', field: 'remitoid', sortable: true, filter: false, width: 100 },
    { headerName: 'Código', field: 'codigo', sortable: true, filter: true, width: 100 },
  ];

  const exportToExcel = () => {
    gridRef.current?.api.exportDataAsExcel({
      fileName: 'remitosData.xlsx',
      sheetName: 'remitos',
    });
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
  };

  const handleDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setDays(value);
    }
  };

  const handleFilter = () => {
    const filteredData = rowData.filter(row => isWithinLastNDays(row.salida));
    setFilteredData(filteredData);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
        <button onClick={openForm} style={{ borderRadius: '0.3rem' }}>
          Añadir
        </button>

        <button onClick={exportToExcel} style={{ borderRadius: '0.3rem' }}>
          Exportar a Excel
        </button>
      </div>


      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
        {/* Barra de busqueda */}
        <input
          type="text"
          placeholder="Buscar..."
          value={searchText}
          onChange={onSearch}
          style={{ padding: '5px', borderRadius: '0.3rem', width: '225px' }}
        />
        {/* Filtro de días */}
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '1px', borderRadius: '0.3rem', border: '1px solid lightgray',height: '35px' }}>
          <label htmlFor="days-input" style={{ marginRight: '1px' }}>
            Mostrar datos de los últimos
          </label>
          <input
            id="days-input"
            type="number"
            value={days}
            onChange={handleDaysChange}
            style={{ padding: '2px', borderRadius: '0.3rem', width: '45px', marginRight: '10px' }}
          />
          <span> días</span>
        

        <button onClick={handleFilter} style={{ padding: '3px 10px', borderRadius: '0.3rem' }}>
          Filtrar
        </button>
        </div>      
      </div>

      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          ref={gridRef}
          rowData={filteredData}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          quickFilterText={searchText}
        />
      </div>

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
            <HRepForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default HRepList;
