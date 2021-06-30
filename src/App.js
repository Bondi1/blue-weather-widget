import React from "react";
import { useState } from "react";
import FormComponent from "./components/createForm";
import DisplayWidget from "./components/displayWidget";
import SelectWidget from "./components/selectDropdown";
import logo from "./images/logo-blue-web.png";
import "./App.css";

function App() {
  const [createdWidgets, setCreatedWidgets] = useState([]);
  const [selectedWidget, setSelectedWidget] = useState("");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <FormComponent
        createdWidgets={createdWidgets}
        setCreatedWidgets={setCreatedWidgets}
      />
      <SelectWidget
        createdWidgets={createdWidgets}
        setSelectedWidget={setSelectedWidget}
      />
      <DisplayWidget selectedWidget={selectedWidget} />
    </div>
  );
}

export default App;
