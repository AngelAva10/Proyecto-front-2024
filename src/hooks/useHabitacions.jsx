import { useContext } from "react";
import HabitacionsContext from "../context/HabitacionsProvider";

const useHabitacions = () => {
  return useContext(HabitacionsContext)
}

export default useHabitacions