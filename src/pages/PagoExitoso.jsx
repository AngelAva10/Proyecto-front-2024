import React, { useEffect, useState } from "react";
import useHabitacions from "../hooks/useHabitacions"

const PagoExitoso = () => {
  const { cambiarPremium } = useHabitacions()
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
    <h1>{data ? 'Pago exitoso, ya estás suscripto a la versión premium de HabitacionsApp' : ''}</h1>
    <h3>{data ? data : ''}</h3>
  </>
  
  )
}
export default PagoExitoso