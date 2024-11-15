import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';//Excel 

const AgGrid: React.FC = () => {
  const [rowData, setRowData] = useState<any[]>([]);

  
  const gridRef = useRef<AgGridReact>(null); // Reference to the AgGridReact component


  // Function to export data to Excel
  const exportToExcel = () => {
    gridRef.current?.api.exportDataAsExcel({
      fileName: 'AgGridData.xlsx', // Name of the exported Excel file
      sheetName: 'Table Data', // Name of the sheet in Excel
    });
  };

  return (
    <div>
      {/* Button to trigger Excel export */}
      <button onClick={exportToExcel} style={{ marginBottom: '10px' }}>
        Export to Excel
      </button>


      <div className="ag-theme-alpine" style={{ height: '400px', width: '600px' }}>
        <AgGridReact
          ref={gridRef} // Attach the reference to the grid
          rowData={rowData}
          pagination={true}
          paginationPageSize={10}
          
        />
      </div>
    </div>
  );
};

export default AgGrid;
