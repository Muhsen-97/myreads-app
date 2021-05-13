import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// import "React Router" components
import { BrowserRouter as Router } from "react-router-dom";

// import custom components
import App from "./App";


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

