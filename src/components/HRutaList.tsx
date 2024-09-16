import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import HRutaForm from './HRutaForm';

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
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const modalContent = document.getElementById('modal-content');
    if (modalContent && !modalContent.contains(event.target as Node)) {
      closeForm();
    }
  };

  const columnDefs: ColDef[] = [
    { headerName: 'Código', field: 'codigo', sortable: true, filter: true },
    { headerName: 'Sucursal Origen', field: 'origen', sortable: true, filter: true },
    { headerName: 'Sucursal Destino', field: 'destino', sortable: true, filter: true },
    { headerName: 'Transportes', field: 'transporteId', sortable: true, filter: true },
    { headerName: 'Fecha Salida', field: 'salida', sortable: true, filter: true },
    { headerName: 'Fecha Llegada', field: 'llegada', sortable: true, filter: true },
    { headerName: 'Cerrada', field: 'cerrada', sortable: true, filter: true, cellRenderer: (params: any) => (params.value ? 'Sí' : 'No') },
  ];

  const rowData = formData ? [formData] : [];

  return (
    <div>
      {/* Button for opening the form, placed above the table */}
      <button onClick={openForm} style={{ marginBottom: '5px', marginLeft: '0px', borderRadius: '0.3rem' }}>
        Añadir
      </button>

      {/* AG Grid Table */}
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact 
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout="autoHeight"
        />
      </div>

      {/* Popup form */}
      {isFormOpen && (
        <div className="modal" style={{ display: 'block', position: 'fixed', zIndex: 1, left: 0, top: 0, width: '100%', height: '100%', overflow: 'auto', backgroundColor: 'rgb(0,0,0)' }} onClick={handleClickOutside}>
          <div id="modal-content" className="modal-content" style={{ backgroundColor: '#fefefe', margin: '15% auto', padding: '20px', border: '1px solid #888', width: '80%' }}>
            <span className="close" onClick={closeForm} style={{ color: '#aaa', float: 'right', fontSize: '28px', fontWeight: 'bold' }}>&times;</span>
            <HRutaForm />
          </div>
        </div>
      )}
    </div>
  );
};
// Styles for the modal
const modalStyles: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 11, // Ensure the modal is on top of everything
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional background overlay
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalContentStyles: React.CSSProperties = {
  backgroundColor: 'transparent',
  border: 'none',
  padding: '20px',
  width: '80%',
  maxWidth: '600px',
};

const closeButtonStyles: React.CSSProperties = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
  fontSize: '1.5rem',
};

export default HRutaList;
