import React from "react";
import LogTable from "./components/logTable";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App" data-testid="App">
      <BrowserRouter>
        <LogTable />
      </BrowserRouter>
    </div>
  );
}

export default App;
