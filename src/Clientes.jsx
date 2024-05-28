import { useState, useEffect } from "react";

export const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/clientes");
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      setError("Error al obtener los clientes");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, apellido, correo }),
      });
      const newCliente = await response.json();
      setClientes([...clientes, newCliente]);
      setNombre("");
      setApellido("");
      setCorreo("");
    } catch (error) {
      setError("Error al ingresar un cliente");
    }
  };

  return (
    <div className="mt-5 me-5">
      <h2 className="mb-5">POSTGRESQL EN LA NUBE</h2>
      <h3>Clientes</h3>
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
          <label>Correo:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-success mt-3">
          Agregar Cliente
        </button>
      </form>

      {error && <p>{error}</p>}

      <h2 className="mt-5 text-center">Lista de Clientes</h2>
      <table className="mt-3 table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id_cliente}>
              <td>{cliente.id_cliente}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              <td>{cliente.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
