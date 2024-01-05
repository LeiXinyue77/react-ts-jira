import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ProjectListScreen } from "screens/project-list";
import { TsReactTest } from "assignments/try-use-array";
import { LoginScreen } from "screens/login";

function App() {
  return (
    <div className="App">
      <LoginScreen />
      {/* <ProjectListScreen /> */}
      {/* <TsReactTest /> */}
    </div>
  );
}

export default App;
