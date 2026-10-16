// ESTE COMPONENTE ES EL HEADER PLANTILLA PARA EL RESTO DE PAGINAS (ANTES header.html)

import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {

    const [menuAbierto, setMenuAbierto] = useState(false);

    /* MENU HAMBURGUESA */

    useEffect(() => {

        function cerrarAlHacerClicFuera(event) { // SI SE HACE CLIC FUERA DE LA CABECERA SE CIERRA EL MENU

            const cabecera = event.target.closest(".cabecera");

            if (!cabecera) {
                setMenuAbierto(false);
            }

        }

        function cerrarConEscape(event) { // SI SE PRESIONA ESCAPE SE CIERRA EL MENU

            if (event.key !== "Escape") return;

            setMenuAbierto(false);

        }

        document.addEventListener("click", cerrarAlHacerClicFuera);
        document.addEventListener("keydown", cerrarConEscape);

        return () => {
            document.removeEventListener("click", cerrarAlHacerClicFuera);
            document.removeEventListener("keydown", cerrarConEscape);
        };

    }, []);

    function cerrarMenu() { // AL ELEGIR UN ENLACE SE CIERRA EL MENU
        setMenuAbierto(false);
    }

    return (
        <header className={menuAbierto ? "cabecera menu-abierto" : "cabecera"}>

            <Link className="contenedor-marca" to="/" onClick={cerrarMenu}>

                <img className="logo" src="/assets/img/escudo.webp" alt="Logo Veterinaria San Miguel" />
                <span className="marca">Veterinaria SM</span>

            </Link>

            <button type="button" className="menu-toggle" aria-label="Abrir menú" aria-expanded={menuAbierto} onClick={() => setMenuAbierto(!menuAbierto)}>
                <span></span>
            </button>

            <nav aria-label="Navegación principal">

                <ul className="menu">
                    <li>
                        <NavLink to="/" onClick={cerrarMenu}>Inicio</NavLink>
                    </li>
                    <li>
                        <NavLink to="/nosotros" onClick={cerrarMenu}>Nosotros</NavLink>
                    </li>
                    <li>
                        <NavLink className="icono-iniciar" to="/register" onClick={cerrarMenu}>
                            <img src="/assets/img/user.svg" alt="Iniciar sesion" />
                        </NavLink>
                    </li>
                </ul>

            </nav>
        </header>
    );

}

export default Header;
