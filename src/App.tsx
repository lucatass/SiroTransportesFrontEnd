import React, { useState } from 'react';
import './App.css';
import SidebarSection from './components/SidebarSection';
import SidebarButton from './components/SidebarButton';
import HrutaForm from './components/HRutaForm';
import RemitoForm from './components/RemitoForm';
import HRepartoForm from './components/HojaDeReparto/HRepartoForm';
import { useAuthStore } from './components/api/useAuthStore';
import { AfipClient } from './components/api/AfipClient';
import { FaBars, FaFileAlt, FaTruck, FaMapMarkedAlt, FaEdit, FaTools, FaShoppingCart, FaWallet } from 'react-icons/fa';

const App: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('HRepartoForm');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { setAuthData, getToken, isTokenExpired, clearAuthData } = useAuthStore();

  const handleFetchToken = async () => {
    setLoading(true);
    try {
      if (!getToken() || isTokenExpired()) {
        const afipClient = new AfipClient();
        const authResponse = await afipClient.getToken('dev', '20409378472', 'wsfe');
        setAuthData(authResponse.token, authResponse.sign, authResponse.expiration);
      }
    } catch (error) {
      console.error('Error fetching token:', error);
      clearAuthData();
    } finally {
      setLoading(false);
    }
  };

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
      <div
        className="dropdown-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaBars />
      </div>

      {!isSidebarOpen && (
        <div className="fetch-token">
          <button onClick={handleFetchToken} disabled={loading}>
            {loading ? 'Guardando token...' : 'Token'}
          </button>
        </div>
      )}

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <SidebarSection label="Cargos" icon={<FaFileAlt />}>
          <SidebarButton
            icon={<FaTruck />}
            label="HReparto"
            onClick={() => {
              setSelectedComponent('HRepartoForm');
              setIsSidebarOpen(false);
            }}
          />
          <SidebarButton
            icon={<FaMapMarkedAlt />}
            label="HRuta"
            onClick={() => {
              setSelectedComponent('HrutaForm');
              setIsSidebarOpen(false);
            }}
          />
          <SidebarButton
            icon={<FaEdit />}
            label="Remito"
            onClick={() => {
              setSelectedComponent('RemitoForm');
              setIsSidebarOpen(false);
            }}
          />
        </SidebarSection>

        <SidebarSection label="Maquinarias" icon={<FaTools />}>
          <SidebarButton
            icon={<FaTruck />}
            label="Ejemplo"
            onClick={() => {
              setSelectedComponent('HRepartoForm');
              setIsSidebarOpen(false);
            }}
          />
        </SidebarSection>

        <SidebarSection label="Compras" icon={<FaShoppingCart />}>
          <SidebarButton
            icon={<FaTruck />}
            label="Ejemplo"
            onClick={() => {
              setSelectedComponent('HRepartoForm');
              setIsSidebarOpen(false);
            }}
          />
        </SidebarSection>

        <SidebarSection label="Tesorería" icon={<FaWallet />}>
          <SidebarButton
            icon={<FaTruck />}
            label="Ejemplo"
            onClick={() => {
              setSelectedComponent('HRepartoForm');
              setIsSidebarOpen(false);
            }}
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
