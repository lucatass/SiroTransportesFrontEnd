import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import HrutaForm from './components/HRuta';
import RemitoForm from './components/RemitoForm';
import HRepartoForm from './components/HojaDeReparto/HRepartoForm';

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
      <Sidebar onSelect={setSelectedComponent} />
      <div className="content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default App;
