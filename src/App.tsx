// App.tsx
import React from "react";
import HojaRepartoForm from "./components/hojareparto-maqueta/HojaRepartoForm";
import "./theme/App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="content">
        <HojaRepartoForm />
      </div>
    </div>
  );
};

export default App;
