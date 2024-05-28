import { useState, useEffect } from "react";

export const Procuradores = () => {
  const [procuradores, setProcuradores] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProcuradores();
  }, []);

  const fetchProcuradores = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/procurador");
      const data = await response.json();
      setProcuradores(data);
    } catch (error) {
      setError("Error al obtener los procuradores");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/procurador", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, apellido, telefono }),
      });
      const newProcurador = await response.json();
      setProcuradores([...procuradores, newProcurador]);
      setNombre("");
      setApellido("");
      setTelefono("");
    } catch (error) {
      setError("Error al ingresar un procurador");
    }
  };

  return (
    <div className="mt-5 ms-5">
      <h2 className="mb-5">POSTGRESQL LOCAL</h2>
      <h3>Procuradores</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-success mt-3">
          Agregar Procurador
        </button>
      </form>

      {error && <p>{error}</p>}

      <h2 className="mt-5 text-center">Lista de Procuradores</h2>
      <table className="mt-3 table table-striped mb-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {procuradores.map((procurador) => (
            <tr key={procurador.id_procurador}>
              <td>{procurador.id_procurador}</td>
              <td>{procurador.nombre}</td>
              <td>{procurador.apellido}</td>
              <td>{procurador.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
