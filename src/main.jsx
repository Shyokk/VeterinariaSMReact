import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css"; // SE CARGA PRIMERO PARA QUE LOS CSS DEL PROYECTO TENGAN PRIORIDAD
import "./assets/css/bootstrapAjustes.css";
import "./index.css";
import "./assets/css/estilos.css";
import "./assets/css/form.css";
import "./assets/css/gestionPacientes.css";
import "./assets/css/headFoot.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);
