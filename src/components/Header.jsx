// ESTE COMPONENTE ES EL HEADER PLANTILLA PARA EL RESTO DE PAGINAS (ANTES header.html)

import { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
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
        // Navbar DE REACT BOOTSTRAP: expanded Y onToggle USAN EL MISMO ESTADO menuAbierto DE ANTES
        // role={null}: EL HEADER NO NECESITA role="navigation" PORQUE YA TIENE SU <nav> ADENTRO
        <Navbar as="header" role={null} expand="md" className={menuAbierto ? "cabecera menu-abierto" : "cabecera"} expanded={menuAbierto} onToggle={setMenuAbierto}>

            <Navbar.Brand as={Link} className="contenedor-marca" to="/" onClick={cerrarMenu}>

                <img className="logo" src="/assets/img/escudo.webp" alt="Logo Veterinaria San Miguel" />
                <span className="marca">Veterinaria SM</span>

            </Navbar.Brand>

            <Navbar.Toggle className="menu-toggle" label="Abrir menú" aria-controls="menu-principal" aria-expanded={menuAbierto}>
                <span></span>
            </Navbar.Toggle>

            <Navbar.Collapse id="menu-principal">

                <nav aria-label="Navegación principal">

                    <Nav as="ul" className="menu">
                        <Nav.Item as="li">
                            <Nav.Link as={NavLink} to="/" onClick={cerrarMenu}>Inicio</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link as={NavLink} to="/nosotros" onClick={cerrarMenu}>Nosotros</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link as={NavLink} className="icono-iniciar" to="/register" onClick={cerrarMenu}>
                                <img src="/assets/img/user.svg" alt="Iniciar sesion" />
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                </nav>

            </Navbar.Collapse>

        </Navbar>
    );

}

export default Header;
