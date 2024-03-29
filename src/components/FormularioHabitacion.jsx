import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHabitaciones from "../hooks/useHabitaciones";
import Alerta from "./Alerta";

const FormularioHabitacion = () => {
  const [id, setId] = useState(null);
  const [icono, setIcono] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [cliente, setCliente] = useState("");

  const params = useParams();
  const { mostrarAlerta, alerta, submitHabitacion, habitacion } = useHabitaciones();

  useEffect(() => {
    if (params.id) {
      setId(habitacion._id);
      setIcono(habitacion.icono);
      setNombre(habitacion.nombre);
      setDescripcion(habitacion.descripcion);
      setFechaEntrega(habitacion.fechaEntrega?.split("T")[0]);
      setCliente(habitacion.cliente);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
      mostrarAlerta({
        msg: "Todos los Campos son Obligatorios",
        error: true,
      });

      return;
    }
    const formData = new FormData();
    if (id) {
      formData.append("id", id);
    }
    formData.append("icono", icono);
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("fechaEntrega", fechaEntrega);
    formData.append("cliente", cliente);

    // Pasar los datos hacia el provider
    await submitHabitacion(formData);

    setId(null);
    setNombre("");
    setDescripcion("");
    setFechaEntrega("");
    setCliente("");
  };

  const { msg } = alerta;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="nombre"
        >
          Icono de habitacion
        </label>

        <input
          id="icono"
          type="file"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Icono de habitacion"
          onChange={(e) => setIcono(e.target.files[0])}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="nombre"
        >
          Nombre Habitacion
        </label>

        <input
          id="nombre"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del Habitacion"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="descripcion"
        >
          Descripción
        </label>

        <textarea
          id="descripcion"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripción del Habitacion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="fecha-entrega"
        >
          Fecha Entrega
        </label>

        <input
          id="fecha-entrega"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="cliente"
        >
          Nombre Cliente
        </label>

        <input
          id="cliente"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={id ? "Actualizar Habitacion" : "Crear Habitacion"}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormularioHabitacion;
