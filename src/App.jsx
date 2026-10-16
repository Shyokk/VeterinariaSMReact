import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Inicio from "./pages/Inicio";
import Nosotros from "./pages/Nosotros";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MisMascotas from "./pages/MisMascotas";
import Perfil from "./pages/Perfil";
import Reportes from "./pages/Reportes";
import Usuarios from "./pages/Usuarios";
import NuevoExamen from "./pages/NuevoExamen";
import Agendar from "./pages/Agendar";
import CrearFicha from "./pages/CrearFicha";
import Gestion from "./pages/Gestion";
import Historial from "./pages/Historial";
import NoEncontrada from "./pages/NoEncontrada";

function App() {

    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/misMascotas" element={<MisMascotas />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/reportes" element={<Reportes />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/nuevoExamen" element={<NuevoExamen />} />
                <Route path="/nuevoExamen/:codUnico" element={<NuevoExamen />} />
                <Route path="/agendar" element={<Agendar />} />
                <Route path="/crearFicha" element={<CrearFicha />} />
                <Route path="/gestion" element={<Gestion />} />
                <Route path="/historial" element={<Historial />} />
                <Route path="/historial/:codUnico" element={<Historial />} />
                <Route path="*" element={<NoEncontrada />} />
            </Routes>

            <Footer />
        </>
    );

}

export default App;
