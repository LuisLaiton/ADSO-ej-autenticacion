import { useState } from 'react';

function App() {

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const respuesta = await fetch(
        'http://localhost:3000/api/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            usuario,
            password
          })
        }
      );

      const datos = await respuesta.json();

      setMensaje(datos.mensaje);

      if (respuesta.ok) {
        setTipoMensaje('success');
      } else {
        setTipoMensaje('danger');
      }

    } catch (error) {

      console.error(error);

      setMensaje('No fue posible conectar con la API');
      setTipoMensaje('danger');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Iniciar sesión</h2>

              <form onSubmit={iniciarSesion}>
                <div className="mb-3">
                  <label className="form-label">
                    Usuario
                  </label>
                  <input type="text" className="form-control" value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="Ingrese su usuario" />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Contraseña
                  </label>
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingrese su contraseña" />
                </div>

                <button type="submit" className="btn btn-primary w-100" >
                  Iniciar sesión
                </button>
              </form>

              {mensaje && (
                <div className={`alert alert-${tipoMensaje} mt-4`} >
                  {mensaje}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;