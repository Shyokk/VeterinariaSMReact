// ESTA PAGINA MISMASCOTAS SERÁ PARA VER LA INFORMACIÓN DE LA MASCOTA EN LA VISTA DEL USUARIO (ANTES misMascotas.html)

import { Link } from "react-router-dom";

function MisMascotas() {

    return (
        <main className="contenido-main">

            <title>Mis Mascotas - Veterinaria San Marcos</title>

            <section className="seccion-mis-mascotas">

                <div>

                    <h1>Mis Mascotas</h1>

                    <p>
                        Aquí puedes consultar la información de tus mascotas,
                        revisar sus controles y acceder a sus antecedentes.
                    </p>

                    <div className="listado-mascotas">

                        {/* INFORMACIÓN DE THOR */}
                        <article className="info-mascota">

                            <h2>Thor</h2>

                            <p><strong>Próxima revisión:</strong> 05/11/2026</p>

                            <div className="acciones-mascota">
                                <Link to="/historial">Ver historial clínico</Link>{" "}
                                <Link to="/nuevaVacuna">Registrar nueva vacuna</Link>{" "}
                                <Link to="/nuevoDiagnostico">Registrar diagnóstico</Link>{" "}
                                <Link to="/nuevaReceta">Crear nueva receta</Link>
                            </div>

                        </article>

                        {/* INFORMACIÓN DE KIRA */}
                        <article className="info-mascota">

                            <h2>Kira</h2>

                            <p><strong>Próxima revisión:</strong> 12/01/2027</p>

                            <div className="acciones-mascota">
                                <Link to="/historial">Ver historial clínico</Link>{" "}
                                <Link to="/nuevaVacuna">Registrar nueva vacuna</Link>{" "}
                                <Link to="/nuevoDiagnostico">Registrar diagnóstico</Link>{" "}
                                <Link to="/nuevaReceta">Crear nueva receta</Link>
                            </div>

                        </article>

                    </div>

                </div>

            </section>

        </main>
    );

}

export default MisMascotas;
