// ESTA PAGINA ES LA PORTADA CON LAS TARJETAS DE ACCESO (ANTES index.html)

import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Inicio() {

    return (
        <main className="contenido-main">

            {/* GRILLA DE REACT BOOTSTRAP: 2 COLUMNAS EN CELULAR, 3 DESDE 576px Y 4 DESDE 768px */}
            <Row as="section" className="grill-tarjeta">


                <Col xs={6} sm={4} md={3}>
                    <Link to="/agendar">

                        <div className="tarjeta">
                            <img className="tarjeta-img" src="/assets/img/calendario.webp" alt="" />
                            <span className="descripcion-tarjeta">Agendar</span>
                        </div>

                    </Link>
                </Col>

                <Col xs={6} sm={4} md={3}>
                    <Link to="/login">

                        <div className="tarjeta">
                            <img className="tarjeta-img" src="/assets/img/miperfil.webp" alt="" />
                            <span className="descripcion-tarjeta">Mi Perfil</span>
                        </div>

                    </Link>
                </Col>

                <Col xs={6} sm={4} md={3}>
                    <Link to="/misMascotas">

                        <div className="tarjeta">
                            <img className="tarjeta-img" src="/assets/img/examenes.webp" alt="" />
                            <span className="descripcion-tarjeta">Examenes</span>
                        </div>

                    </Link>
                </Col>

                <Col xs={6} sm={4} md={3}>
                    <Link to="/nosotros">

                        <div className="tarjeta">
                            <img className="tarjeta-img" src="/assets/img/escudo.webp" alt="" />
                            <span className="descripcion-tarjeta">Nosotros</span>
                        </div>

                    </Link>
                </Col>

                <Col xs={6} sm={4} md={3}>
                    <Link to="/pacientes">

                        <div className="tarjeta">
                            <img className="tarjeta-img" src="/assets/img/escudo.webp" alt="" />
                            <span className="descripcion-tarjeta">Agenda</span>
                        </div>

                    </Link>
                </Col>

                <Col xs={6} sm={4} md={3}>
                    <Link to="/gestion">

                        <div className="tarjeta">
                            <img className="tarjeta-img" src="/assets/img/escudo.webp" alt="" />
                            <span className="descripcion-tarjeta">Gestion</span>
                        </div>

                    </Link>
                </Col>

                <Col xs={6} sm={4} md={3}>
                    <Link to="/nuevaReceta">

                        <div className="tarjeta">
                            <img className="tarjeta-img" src="/assets/img/escudo.webp" alt="" />
                            <span className="descripcion-tarjeta">Receta</span>
                        </div>

                    </Link>
                </Col>

                <Col xs={6} sm={4} md={3}>
                    <Link to="/nuevaVacuna">

                        <div className="tarjeta">
                            <img className="tarjeta-img" src="/assets/img/escudo.webp" alt="" />
                            <span className="descripcion-tarjeta">Vacuna</span>
                        </div>

                    </Link>
                </Col>

                <Col xs={6} sm={4} md={3}>
                    <Link to="/nuevoDiagnostico">

                        <div className="tarjeta">
                            <img className="tarjeta-img" src="/assets/img/escudo.webp" alt="" />
                            <span className="descripcion-tarjeta">Diagnostico</span>
                        </div>

                    </Link>
                </Col>

                <Col xs={6} sm={4} md={3}>
                    <Link to="/nuevoExamen">

                        <div className="tarjeta">
                            <img className="tarjeta-img" src="/assets/img/escudo.webp" alt="" />
                            <span className="descripcion-tarjeta">Examen</span>
                        </div>

                    </Link>
                </Col>

            </Row>

        </main>
    );

}

export default Inicio;
