// App.tsx
import React from "react";
import HojaRepartoForm from "./components/hojareparto-maqueta/HojaRepartoForm";
import RemitoFormMock from "./remito-maqueta/RemitoFormMock";
import HojaRutaForm from "./hojaruta-maqueta/HojaRutaForm";
import "./theme/App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="content">
        <HojaRutaForm />
      </div>
    </div>
  );
};

export default App;
