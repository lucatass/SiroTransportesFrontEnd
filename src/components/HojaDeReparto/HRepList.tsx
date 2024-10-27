import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { ColDef } from 'ag-grid-community';
import HRepForm from './HRepForm';

interface HRepData {
  // Define the fields specific to HRepList
  codigo: string;
  nombre: string;
  categoria: string;
  fechaIngreso: string;
  ubicacion: string;
  estado: boolean;
}

const HRepList: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rowData, setRowData] = useState<HRepData[]>([]);
  const [searchText, setSearchText] = useState('');
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
    fetch('public/HRep.json')
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

  const columnDefs: ColDef[] = [
    { headerName: 'Código', field: 'codigo', sortable: true, filter: true, width: 100 },
    { headerName: 'Nombre', field: 'nombre', sortable: true, filter: true, width: 150 },
    { headerName: 'Categoría', field: 'categoria', sortable: true, filter: true, width: 150 },
    { headerName: 'Fecha de Ingreso', field: 'fechaIngreso', sortable: true, filter: true, width: 150 },
    { headerName: 'Ubicación', field: 'ubicacion', sortable: true, filter: true, width: 150 },
    { headerName: 'Estado', field: 'estado', sortable: true, filter: true, cellRenderer: (params: any) => (params.value ? 'Activo' : 'Inactivo'), width: 100 },
  ];

  const exportToExcel = () => {
    gridRef.current?.api.exportDataAsExcel({
      fileName: 'HRepData.xlsx',
      sheetName: 'HReps',
    });
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
        <button onClick={openForm} style={{ borderRadius: '0.3rem' }}>Añadir</button>
        <button onClick={exportToExcel} style={{ borderRadius: '0.3rem' }}>Exportar a Excel</button>
      </div>

      <div style={{ margin: '0' }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchText}
          onChange={onSearch}
          style={{ padding: '5px', borderRadius: '0.3rem', width: '100%' }}
        />
      </div>

      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
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
