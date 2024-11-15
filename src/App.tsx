// App.tsx
import React from "react";
import TestForm from "./form/TestForm";
import "./theme/App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="content">
        <TestForm />
      </div>
    </div>
  );
};

export default App;
