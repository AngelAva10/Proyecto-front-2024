import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const HabitacionesContext = createContext();

const HabitacionesProvider = ({ children }) => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [habitacion, setHabitacion] = useState({});
  const [cargando, setCargando] = useState(false);
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [tarea, setTarea] = useState({});
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
  const [colaborador, setColaborador] = useState({});
  const [modalEliminarColaborador, setModalEliminarColaborador] =
    useState(false);
  const [buscador, setBuscador] = useState(false);

  const navigate = useNavigate();
  const { auth } = useAuth();

  const cambiarPremium = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        "/pagos/pagosuccess",
        {},
        config
      );
      return data;
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const obtenerHabitaciones = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios("/habitaciones", config);
      setHabitaciones(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerHabitaciones();
  }, [auth]);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  const submitHabitacion = async (habitacion) => {
    const habitacionId = habitacion.get("id") || "";
    if (habitacionId && habitacionId !== "") {
      await editarHabitacion(habitacion);
    } else {
      await nuevoHabitacion(habitacion);
    }
  };

  const editarHabitacion = async (habitacion) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/habitaciones/${habitacion.get("id")}`,
        habitacion,
        config
      );

      // Sincronizar el state
      const habitacionesActualizados = habitaciones.map((habitacionState) =>
        habitacionState._id === data._id ? data : habitacionState
      );
      setHabitaciones(habitacionesActualizados);

      setAlerta({
        msg: "Habitacion Actualizado Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/habitaciones");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoHabitacion = async (habitacion) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/habitaciones", habitacion, config);
      if (data.nombre) {
        setHabitaciones([...habitaciones, data]);

        setAlerta({
          msg: "Habitacion Creado Correctamente",
          error: false,
        });

        setTimeout(() => {
          setAlerta({});
          navigate("/habitaciones");
        }, 1000);
      } else {
        setAlerta({
          msg: "Alcanzo el limite de habitaciones(5)",
          error: false,
        });

        setTimeout(() => {
          setAlerta({});
          navigate("/habitaciones");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerHabitacion = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/habitaciones/${id}`, config);
      setHabitacion(data);
      setAlerta({});
    } catch (error) {
      navigate("/habitaciones");
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } finally {
      setCargando(false);
    }
  };

  const eliminarHabitacion = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(`/habitaciones/${id}`, config);

      // Sincronizar el state
      const habitacionesActualizados = habitaciones.filter(
        (habitacionState) => habitacionState._id !== id
      );
      setHabitaciones(habitacionesActualizados);

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/habitaciones");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea);
    setTarea({});
  };

  const submitTarea = async (tarea) => {
    if (tarea?.id) {
      await editarTarea(tarea);
    } else {
      await crearTarea(tarea);
    }
  };

  const crearTarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post("/tareas", tarea, config);
      if (data.nombre) {
        const habitacionActualizado = { ...habitacion };
        habitacionActualizado.tareas = [...habitacion.tareas, data];

        setHabitacion(habitacionActualizado);
        setAlerta({});
        setModalFormularioTarea(false);
      } else {
        const habitacionActualizado = { ...habitacion };

        setHabitacion(habitacionActualizado);
        setModalFormularioTarea(false)
        setAlerta({
            msg:data.msg,
            error:false
        });
        setTimeout(() => {
            setAlerta({});
          }, 2000);
      }
      // Agrega la tarea al state
    } catch (error) {
      console.log(error);
    }
  };

  const editarTarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.put(
        `/tareas/${tarea.id}`,
        tarea,
        config
      );
        console.log(data, "Edit tarea")
      const habitacionActualizado = { ...habitacion };
      habitacionActualizado.tareas = habitacionActualizado.tareas.map(
        (tareaState) => (tareaState._id === data._id ? data : tareaState)
      );
      setHabitacion(habitacionActualizado);
      setAlerta({});
      setModalFormularioTarea(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEditarTarea = (tarea) => {
    setTarea(tarea);
    setModalFormularioTarea(true);
  };

  const handleModalEliminarTarea = (tarea) => {
    setTarea(tarea);
    setModalEliminarTarea(!modalEliminarTarea);
  };

  const eliminarTarea = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(
        `/tareas/${tarea._id}`,
        config
      );

      setModalEliminarTarea(false);
      if(tarea.habitacion._id){
        obtenerHabitacion(tarea.habitacion._id)
    }else{
        obtenerHabitacion(tarea.habitacion)
      }
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setTimeout(() => {
        setAlerta({});
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  const submitColaborador = async (email) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        "/habitaciones/colaboradores",
        { email },
        config
      );

      setColaborador(data);
      setAlerta({});
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setCargando(false);
    }
  };

  const agregarColaborador = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/habitaciones/colaboradores/${habitacion._id}`,
        email,
        config
      );

      setAlerta({
        msg: data.msg,
        error: false,
      });
      setColaborador({});

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const handleModalEliminarColaborador = (colaborador) => {
    setModalEliminarColaborador(!modalEliminarColaborador);
    setColaborador(colaborador);
  };

  const eliminarColaborador = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/habitaciones/eliminar-colaborador/${habitacion._id}`,
        { id: colaborador._id },
        config
      );

      const habitacionActualizado = { ...habitacion };

      habitacionActualizado.colaboradores =
        habitacionActualizado.colaboradores.filter(
          (colaboradorState) => colaboradorState._id !== colaborador._id
        );

      setHabitacion(habitacionActualizado);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setColaborador({});
      setModalEliminarColaborador(false);

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleBuscador = () => {
    setBuscador(!buscador);
  };

  const submitTareasHabitacion = (tarea) => {
    const habitacionActualizado = { ...habitacion };
    habitacionActualizado.tareas = [...habitacionActualizado.tareas, tarea];
    setHabitacion(habitacionActualizado);
  };
  const eliminarTareaHabitacion = (tarea) => {
    console.log(tarea);
    const habitacionActualizado = { ...habitacion };
    habitacionActualizado.tareas = habitacionActualizado.tareas.filter(
      (tareaState) => tareaState._id !== tarea._id
    );
    console.log(habitacionActualizado);
    setHabitacion(habitacionActualizado);
  };

  const actualizarTareaHabitacion = (tarea) => {
    const habitacionActualizado = { ...habitacion };
    habitacionActualizado.tareas = habitacionActualizado.tareas.map((tareaState) =>
      tareaState._id === tarea._id ? tarea : tareaState
    );
    setHabitacion(habitacionActualizado);
  };

  const cerrarSesionHabitaciones = () => {
    setHabitaciones([]);
    setHabitacion({});
    setAlerta({});
  };

  return (
    <HabitacionesContext.Provider
      value={{
        habitaciones,
        mostrarAlerta,
        alerta,
        submitHabitacion,
        obtenerHabitacion,
        habitacion,
        cargando,
        eliminarHabitacion,
        modalFormularioTarea,
        handleModalTarea,
        submitTarea,
        handleModalEditarTarea,
        tarea,
        modalEliminarTarea,
        handleModalEliminarTarea,
        eliminarTarea,
        submitColaborador,
        colaborador,
        agregarColaborador,
        handleModalEliminarColaborador,
        modalEliminarColaborador,
        eliminarColaborador,
        buscador,
        handleBuscador,
        submitTareasHabitacion,
        eliminarTareaHabitacion,
        actualizarTareaHabitacion,
        cerrarSesionHabitaciones,
        cambiarPremium,
      }}
    >
      {children}
    </HabitacionesContext.Provider>
  );
};
export { HabitacionesProvider };

export default HabitacionesContext;
