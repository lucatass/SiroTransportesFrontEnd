import React, { useState } from 'react';
import './App.css';
import SidebarSection from './components/SidebarSection';
import SidebarButton from './components/SidebarButton';
import HrutaForm from './components/HRutaForm';
import RemitoForm from './components/RemitoForm';
import HRepartoForm from './components/HojaDeReparto/HRepartoForm';
import { FaTruck, FaFileAlt, FaMapMarkedAlt, FaEdit } from 'react-icons/fa';

const App: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('HRepartoForm');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'HrutaForm':
        return <HrutaForm />;
      case 'RemitoForm':
        return <RemitoForm />;
      case 'HRepartoForm':
        return <HRepartoForm />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <SidebarSection label="Facturación" icon={<FaFileAlt  />}>
          <SidebarButton
            icon={<FaTruck />}
            label="HReparto"
            onClick={() => setSelectedComponent('HRepartoForm')}
          />
          <SidebarButton
            icon={<FaMapMarkedAlt />}
            label="HRuta"
            onClick={() => setSelectedComponent('HrutaForm')}
          />
          <SidebarButton
            icon={<FaEdit />}
            label="Remito"
            onClick={() => setSelectedComponent('RemitoForm')}
          />
        </SidebarSection>
      </div>
      <div className="content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default App;
