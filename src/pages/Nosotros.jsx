// ESTA PAGINA NOSOTROS SERA PARA TODOS PARA QUE MUESTRE LA INFORMACIÓN DE LA EMPRESA (ANTES nosotros.html)

function Nosotros() {

    return (
        <main className="contenido-main">

            <title>Nosotros - Veterinaria San Marcos</title>

            {/* INFORMACIÓN GENERAL DE LA VETERINARIA */}
            <section className="seccion-nosotros">

                <div className="informacion-veterinaria">

                    <h1>Sobre Nosotros</h1>

                    <p>
                        Veterinaria San Marcos es una clínica veterinaria ubicada
                        en Rancagua, Región del Libertador General Bernardo O'Higgins.
                    </p>

                    <p>
                        Fue fundada en 2009 y actualmente cuenta con{" "}
                        <strong>3 médicos veterinarios</strong>,{" "}
                        <strong>1 técnico veterinario</strong> y{" "}
                        <strong>1 recepcionista administrativa</strong>.
                    </p>

                </div>

                {/* SERVICIOS */}
                <div className="servicios-veterinaria">

                    <h2>Nuestros Servicios</h2>

                    <p>
                        La clínica atiende principalmente mascotas domésticas,
                        especialmente perros y gatos, aunque también recibe
                        conejos y aves.
                    </p>

                    <ul>
                        <li>Consulta general</li>
                        <li>Vacunación</li>
                        <li>Cirugía menor</li>
                        <li>Desparasitación</li>
                        <li>Control de peso</li>
                    </ul>

                </div>

                {/* INFORMACIÓN DE ATENCIÓN */}
                <div className="atencion-veterinaria">

                    <h2>Atención</h2>

                    <p>
                        Veterinaria San Marcos atiende un promedio de{" "}
                        <strong>25 pacientes por día</strong>.
                    </p>

                    <p>
                        Durante los últimos dos años, el volumen de atención
                        ha aumentado considerablemente. Debido a este crecimiento,
                        la gestión manual de citas y fichas clínicas ya no resulta
                        suficiente para operar con eficiencia.
                    </p>

                </div>

                {/* UBICACIÓN */}
                <div className="ubicacion-veterinaria">

                    <h2>Ubicación</h2>

                    <p>
                        Nuestra clínica se encuentra ubicada en{" "}
                        <strong>Rancagua, Región del Libertador General Bernardo O'Higgins</strong>.
                    </p>

                    <p>
                        Próximamente podrás consultar nuestra ubicación mediante
                        un mapa interactivo y obtener indicaciones para llegar
                        a la clínica.
                    </p>

                </div>

            </section>

        </main>
    );

}

export default Nosotros;
