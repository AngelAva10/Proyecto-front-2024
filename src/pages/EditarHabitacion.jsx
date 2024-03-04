import useHabitaciones from "../hooks/useHabitaciones"
import { useParams } from "react-router-dom"
import { useEffect  } from "react"
import FormularioHabitacion from '../components/FormularioHabitacion'
import { Spinner } from "../components/Spinner"
const EditarHabitacion = () => {
  const params = useParams();
    const { obtenerHabitacion, habitacion, cargando, eliminarHabitacion } = useHabitaciones()
  
    useEffect( () => {
      obtenerHabitacion(params.id)
    }, [])

    const handleClick = () => {
        if(confirm('¿Deseas eliminar este habitacion?')) {
            eliminarHabitacion(params.id)
        } 
    }
  
    const { nombre } = habitacion

    if(cargando) return <Spinner />



  return (
    <>
      <div className='flex justify-center'>
        <h1 className='text-gray-600 text-center uppercase'><strong>Editar Habitacion: {nombre}</strong></h1>
      </div>

      <div className="mt-10 flex justify-center">
        <FormularioHabitacion />
      </div>
      
    </>
  )
}

export default EditarHabitacion