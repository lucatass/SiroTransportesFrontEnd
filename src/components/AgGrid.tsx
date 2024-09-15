import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Include the alpine theme

const AgGrid: React.FC = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [columnDefs] = useState([
    { headerName: 'ID', field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'CUIT', field: 'cuit' },
  ]);

  // Example of fetching data from a JSON file or API
  useEffect(() => {
    // Here, replace with the appropriate API call or use local JSON data
    const data = [
      { id: 1, name: 'Merrill Inchley', cuit: '62808074908' },
      { id: 2, name: 'Arline Kersley', cuit: '65998181978' },
    ];
    setRowData(data);
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: '400px', width: '600px' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default AgGrid;
