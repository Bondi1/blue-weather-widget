import React from "react";
import { useState } from "react";
import FormComponent from "./components/createForm";
import DisplayWidget from "./components/displayWidget";
import SelectWidget from "./components/selectDropdown";
import logo from "./images/logo-blue-web.png";
import "./App.css";

/**
 * Main App file that brings all the components together
 * Three components: 
 *  1. A form to create new widgets
 *  2. A dropdown to display all the widgets and select one
 *  3. A Card to show the weather based on the chosen widget
 */
function App() {
  // Need to share the list of created widgets and the selected widgets
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
