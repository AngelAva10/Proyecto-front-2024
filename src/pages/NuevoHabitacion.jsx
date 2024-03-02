import FormularioHabitacion from "../components/FormularioHabitacion"
const NuevoHabitacion = () => {
  return (
    <>
      <h1 className="text-3xl text-gray-600 text-center"><strong>Nuevo Habitacion</strong></h1>
      <div className="mt-10 flex justify-center">
        <FormularioHabitacion />
      </div>
    </>
  )
}

export default NuevoHabitacion