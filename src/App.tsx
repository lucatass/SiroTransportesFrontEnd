// App.tsx
import React from "react";
import HojaRepartoForm from "./components/hojareparto-maqueta/HojaRepartoForm";
import RemitoFormMock from "./remito-maqueta/RemitoFormMock";
import "./theme/App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="content">
        <RemitoFormMock />
      </div>
    </div>
  );
};

export default App;
