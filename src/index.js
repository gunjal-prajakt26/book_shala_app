import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { DataProvider, DataContext } from "./Context/DataContext";
import { AuthProvider, AuthContext } from "./Context/AuthContext";
import {BrowserRouter as Router} from "react-router-dom"
import { FilterContext, FilterProvider } from "./Context/FilterContext";

// Call make Server
makeServer();

export {DataContext, AuthContext, FilterContext}

ReactDOM.render(
  <React.StrictMode>
  <Router>
   <DataProvider>
  <AuthProvider>
  <FilterProvider>
    <App />
    </FilterProvider>
    </AuthProvider>
    </DataProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
