// ESTA PAGINA LOGIN SERA PARA USUARIOS DONDE SE PODRÁN LOGEAR CON SU CUENTA (ANTES login.html)

import { Link } from "react-router-dom";

function Login() {

    return (
        <main className="contenido-main">

            <section className="seccion-login">

                <div>

                    <h1>Iniciar Sesión</h1>

                    <form className="formulario-login">

                        <div>

                            <label htmlFor="correo-usuario">Correo Electrónico</label>{" "}
                            <input type="email" id="correo-usuario" name="correo-usuario" required />

                        </div>

                        <div>

                            <label htmlFor="clave-usuario">Contraseña</label>{" "}
                            <input type="password" id="clave-usuario" name="clave-usuario" required />

                        </div>

                        <div>

                            <button type="submit" className="btnInicioSesion">Iniciar Sesión</button>

                        </div>

                    </form>

                    <Link to="/register">No tienes una cuenta?</Link>

                </div>

            </section>

        </main>
    );

}

export default Login;
