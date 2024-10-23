import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import 'ag-grid-enterprise';
import SidebarSection from './components/SidebarSection';
import SidebarButton from './components/SidebarButton';
import HRutaList from './components/HRuta/HRutaList';
import RemitosList from './components/remitos/RemitosList';
import HRepartoForm from './components/HojaDeReparto/HRepForm';
import FactForm from './components/FactForm';
import Placeholder from './components/Placeholder';
import { useAuthStore } from './components/api/useAuthStore';
import { AfipClient } from './components/api/AfipClient';
import { FaBars, FaFileAlt, FaTruck, FaMapMarkedAlt, FaEdit, FaTools, FaShoppingCart, FaWallet } from 'react-icons/fa';
import HRepList from './components/HojaDeReparto/HRepList';

const App: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('HRepForm');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { setAuthData, getToken, isTokenExpired, clearAuthData } = useAuthStore();
  const sidebarRef = useRef<HTMLDivElement>(null); // Sidebar reference

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

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false); // Close sidebar if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'HRutaList':
        return <HRutaList />;
      case 'RemitosList':
        return <RemitosList />;
      case 'HRepList':
        return <HRepList />;
      case 'FactForm':
        return <FactForm />;
      case 'Proforma':
        return <Placeholder />;
      case 'Configuracion':
        return <Placeholder />;
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

      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <FaBars />
        <SidebarSection label="Logística" icon={<FaFileAlt />}>
          <SidebarButton
            icon={<FaTruck />}
            label="HReparto"
            onClick={() => {
              setSelectedComponent('HRepList');
              setIsSidebarOpen(false);
            }}
          />
          <SidebarButton
            icon={<FaMapMarkedAlt />}
            label="HRuta"
            onClick={() => {
              setSelectedComponent('HRutaList');
              setIsSidebarOpen(false);
            }}
          />
          <SidebarButton
            icon={<FaEdit />}
            label="Remito"
            onClick={() => {
              setSelectedComponent('RemitosList');
              setIsSidebarOpen(false);
            }}
          />
          <SidebarButton
            icon={<FaTruck />}
            label="Proforma"
            onClick={() => {
              setSelectedComponent('Placeholder');
              setIsSidebarOpen(false);
            }}
          />
          <SidebarButton
            icon={<FaTruck />}
            label="Configuración"
            onClick={() => {
              setSelectedComponent('Placeholder');
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

        <SidebarSection label="Ventas" icon={<FaWallet />}>
          <SidebarButton
            icon={<FaTruck />}
            label="Facturación"
            onClick={() => {
              setSelectedComponent('FactForm');
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
