import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
    <HelmetProvider>
      <CssBaseline />
      <div onContextMenu={e => e.preventDefault()}> 
        <App />
      </div>
    </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
