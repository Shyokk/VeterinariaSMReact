import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Inicio from "./pages/Inicio";
import NoEncontrada from "./pages/NoEncontrada";

function App() {

    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="*" element={<NoEncontrada />} />
            </Routes>

            <Footer />
        </>
    );

}

export default App;
