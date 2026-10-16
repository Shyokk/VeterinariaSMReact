// ESTA PAGINA REGISTER SERA PARA USUARIOS DONDE SE PODRÁN REGISTRAR (ANTES register.html)

import { Link } from "react-router-dom";

function Register() {

    return (
        <main className="contenido-main">

            <section className="seccion-register">

                <div>

                    <h1>Registro de Tutor</h1>

                    <form className="formulario-register" method="get">

                        <div>

                            <label htmlFor="nombres">Nombres</label>{" "}
                            <input type="text" id="nombres" name="nombres" required />

                        </div>

                        <div>

                            <label htmlFor="apellidos">Apellidos</label>{" "}
                            <input type="text" id="apellidos" name="apellidos" required />

                        </div>

                        <div>

                            <label htmlFor="rut">RUT</label>{" "}
                            <input type="text" id="rut" name="rut" placeholder="12.345.678-K" required />

                        </div>

                        <div>

                            <label htmlFor="correo">Correo Electrónico</label>{" "}
                            <input type="email" id="correo" name="correo" required />

                        </div>

                        <div>

                            <label htmlFor="telefono">Número de Teléfono</label>{" "}
                            <input type="tel" id="telefono" name="telefono" placeholder="+56912345678" required />

                        </div>

                        <div>

                            <label htmlFor="contrasena">Contraseña</label>{" "}
                            <input type="password" id="contrasena" name="contrasena" required />

                        </div>

                        <div>

                            <input type="checkbox" id="terminos" name="terminos" required />{" "}
                            <label htmlFor="terminos">Acepto los términos de uso</label>

                        </div>

                        <button type="submit">Registrar Cuenta</button>{" "}

                        <Link to="/login">

                            <button type="button" className="btnInicioSesion">Iniciar Sesión</button>

                        </Link>

                    </form>

                </div>

            </section>

        </main>
    );

}

export default Register;
