import React from "react";
import "./css/App.css";
import Weather from "./Weather";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather defaultCity="Minneapolis" />
      </div>
    </div>
  );
}

export default App;
