import { useContext } from "react";
import HabitacionesContext from "../context/HabitacionesProvider";

const useHabitaciones = () => {
  return useContext(HabitacionesContext)
}

export default useHabitaciones