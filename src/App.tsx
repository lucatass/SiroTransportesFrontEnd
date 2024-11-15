import React, { useState, useRef } from "react";
import "ag-grid-enterprise";
import SidebarSection from "./components/sidebar/SidebarSection";
import SidebarButton from "./components/sidebar/SidebarButton";
import HRutaList from "./components/hojaRuta/HRutaList";
import RemitosList from "./screens/remitos/RemitosView";
import HRepList from "./components/hojaReparto/HRepList";
import Placeholder from "./screens/Placeholder";
import {
  FaBars,
  FaFileAlt,
  FaTruck,
  FaMapMarkedAlt,
  FaEdit,
} from "react-icons/fa";
import "./theme/App.css";
import "./theme/Sidebar.css";

const App: React.FC = () => {
  const [selectedComponent, setSelectedComponent] =
    useState<string>("HRepForm");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const renderComponent = () => {
    switch (selectedComponent) {
      case "HRutaList":
        return <HRutaList />;
      case "RemitosList":
        return <RemitosList />;
      case "HRepList":
        return <HRepList />;
      case "Proforma":
        return <Placeholder />;
      case "Configuracion":
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

      <div
        ref={sidebarRef}
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
      >
        <SidebarSection label="Logística" icon={<FaFileAlt />}>
          <SidebarButton
            icon={<FaEdit />}
            label="Remitos"
            onClick={() => {
              setSelectedComponent("RemitosList");
              setIsSidebarOpen(false);
            }}
          />
          <SidebarButton
            icon={<FaTruck />}
            label="Hoja Reparto"
            onClick={() => {
              setSelectedComponent("HRepList");
              setIsSidebarOpen(false);
            }}
          />
          <SidebarButton
            icon={<FaMapMarkedAlt />}
            label="Hoja Ruta"
            onClick={() => {
              setSelectedComponent("HRutaList");
              setIsSidebarOpen(false);
            }}
          />
          <SidebarButton
            icon={<FaTruck />}
            label="Proforma"
            onClick={() => {
              setSelectedComponent("Placeholder");
              setIsSidebarOpen(false);
            }}
          />
          <SidebarButton
            icon={<FaTruck />}
            label="Configuración"
            onClick={() => {
              setSelectedComponent("Placeholder");
              setIsSidebarOpen(false);
            }}
          />
        </SidebarSection>

        {/* Other SidebarSections... */}
      </div>

      <div className="content">{renderComponent()}</div>
    </div>
  );
};

export default App;
