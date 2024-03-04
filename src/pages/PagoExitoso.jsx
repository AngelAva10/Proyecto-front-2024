import React, { useEffect, useState } from "react";
import useHabitaciones from "../hooks/useHabitaciones"

const PagoExitoso = () => {
  const { cambiarPremium } = useHabitaciones()
  const [data, setData] = useState('')

  const actualizarPremium = async()=>{
    const data = await cambiarPremium()
    setData(data.msg)
  }

  useEffect(()=>{
    actualizarPremium()
  },[])
  return (
  <>
    <h1>{data ? 'Pago exitoso, ya estás suscripto a la versión premium de HabitacionesApp' : ''}</h1>
    <h3>{data ? data : ''}</h3>
  </>
  
  )
}
export default PagoExitoso