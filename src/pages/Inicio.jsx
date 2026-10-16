// ESTA PAGINA ES LA PORTADA CON LAS TARJETAS DE ACCESO (ANTES index.html)

import { Link } from "react-router-dom";

function Inicio() {

    return (
        <main className="contenido-main">

            <section className="grill-tarjeta">


                <div>
                    <Link to="/agendar">

                        <div className="tarjeta">
                            <img className="tarjeta-img" src="/assets/img/calendario.webp" alt="" />
                            <span className="descripcion-tarjeta">Agendar</span>
                        </div>

                    </Link>
                </div>

                <div>
                    <Link to="/login">

                        <div className="tarjeta">
                            <img className="tarjeta-img" src="/assets/img/miperfil.webp" alt="" />
                            <span className="descripcion-tarjeta">Mi Perfil</span>
                        </div>

                    </Link>
                </div>

                <div>
                    <Link to="/misMascotas">

                        <div className="tarjeta">
                            <img className="tarjeta-img" src="/assets/img/examenes.webp" alt="" />
                            <span className="descripcion-tarjeta">Examenes</span>
                        </div>

                    </Link>
                </div>

                <div>
                    <Link to="/nosotros">

                        <div className="tarjeta">
                            <img className="tarjeta-img" src="/assets/img/escudo.webp" alt="" />
                            <span className="descripcion-tarjeta">Nosotros</span>
                        </div>

                    </Link>
                </div>

                <div>
                    <Link to="/pacientes">

                        <div className="tarjeta">
                            <img className="tarjeta-img" src="/assets/img/escudo.webp" alt="" />
                            <span className="descripcion-tarjeta">Agenda</span>
                        </div>

                    </Link>
                </div>

                <div>
                    <Link to="/gestion">

                        <div className="tarjeta">
                            <img className="tarjeta-img" src="/assets/img/escudo.webp" alt="" />
                            <span className="descripcion-tarjeta">Gestion</span>
                        </div>

                    </Link>
                </div>

                <div>
                    <Link to="/nuevaReceta">

                        <div className="tarjeta">
                            <img className="tarjeta-img" src="/assets/img/escudo.webp" alt="" />
                            <span className="descripcion-tarjeta">Receta</span>
                        </div>

                    </Link>
                </div>

                <div>
                    <Link to="/nuevaVacuna">

                        <div className="tarjeta">
                            <img className="tarjeta-img" src="/assets/img/escudo.webp" alt="" />
                            <span className="descripcion-tarjeta">Vacuna</span>
                        </div>

                    </Link>
                </div>

                <div>
                    <Link to="/nuevoDiagnostico">

                        <div className="tarjeta">
                            <img className="tarjeta-img" src="/assets/img/escudo.webp" alt="" />
                            <span className="descripcion-tarjeta">Diagnostico</span>
                        </div>

                    </Link>
                </div>

                <div>
                    <Link to="/nuevoExamen">

                        <div className="tarjeta">
                            <img className="tarjeta-img" src="/assets/img/escudo.webp" alt="" />
                            <span className="descripcion-tarjeta">Examen</span>
                        </div>

                    </Link>
                </div>

            </section>

        </main>
    );

}

export default Inicio;
