import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Combobox} from '@headlessui/react'
import useAuth from '../hooks/useAuth'
import useHabitacions from '../hooks/useHabitacions'
import Busqueda from "./Busqueda"
import PreviewHabitacion from "./PreviewHabitacion";
import {
ArrowLeftOnRectangleIcon,
Bars3Icon,
XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, UserCircleIcon, ArrowLeftOnRectangle } from '@heroicons/react/20/solid'
function classNames(...classes) {
return classes.filter(Boolean).join(' ')
}
const Sidebar = () => {
const { auth } = useAuth()
const {pathname} = useLocation();
const [path] = pathname.split('/').filter((el) => el !== "");
const [ busqueda, setBusqueda ] = useState('')
const { habitacions } = useHabitacions()
const habitacionsFiltrados = busqueda === '' ? [] : habitacions.filter(habitacion => habitacion.nombre.toLowerCase().includes(busqueda.toLowerCase()))
return (
path === 'habitacions' ? 
<aside className='hidden lg:block lg:w-1/4 lg:py-10 lg:px-4 lg:bg-white lg:text-center'>
   <img
   className="w-24 h-24 rounded-full shadow-lg m-auto"
   src={auth.avatar ?auth.avatar : ""}
   alt="PerfilImagen"
   />
   <p className='lg:text-3xl lg:font-bold lg:my-5 lg:text-gray-500'>¡Hola { auth.nombre }!</p>
   {/*<button
      type="button"
      className='bg-zinc-300 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg'
      onClick={handleBuscador}
      >Buscar Habitacion</button>
   <input 
      type="search" 
      placeholder='Buscar Habitacion'
      className='rounded-lg lg:w-56 block p-2 border mt-5 mb-8'  
      onClick={handleBuscador}
      />*/}
   <Combobox
   as="div"
   className="rounded-lg w-full block p-2 border mt-5 mb-8 text-left"
   onChange={ (habitacion) => (window.location = `/habitacions/${habitacion._id}`) }
   >
   <div className="relative">
      <Combobox.Input
         className="h-8 bg-transparent pl-4 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-none sm:text-sm"
         placeholder="Buscar Habitacion"
         onChange={e =>
      setBusqueda(e.target.value)}
      />
   </div>
   {habitacionsFiltrados.length > 0 && (
   <Combobox.Options static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 grid grid-cols-1 divide-y-2">
      {habitacionsFiltrados.map( habitacion => (
      <Combobox.Option
         key={habitacion._id}
         value={habitacion}
         className={({active}) => classNames('cursor-default select-none px-4 py-2', active && 'bg-sky-600 text-white') }
         >
         {habitacion.nombre}
      </Combobox.Option>
      ))}
   </Combobox.Options>
   )}
   </Combobox>
   <Link
      to="crear-habitacion"
      className='bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg'
      >
   Nuevo Habitacion</Link>
   <Link
      to="servicio-premium"
      className='bg-green-400 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg'
      >
   Premium</Link>
   <Busqueda />
   <ul role="list" className="divide-y divide-gray-300">
      { habitacions.length ? 
      habitacions.map(habitacion => (
      <PreviewHabitacion 
         key={habitacion._id}
         habitacion={habitacion}
         />
      ))
      : 
      <div>
         <p className="text-center text-lg uppercase font-bold text-sky-500 pt-10">No hay habitacions</p>
         <img className="w-1/2 h-auto m-auto"
            src='https://cdn.dribbble.com/users/363634/screenshots/4200296/attachments/960005/cactus-lendit.jpg?compress=1&resize=400x300&vertical=top'/>
      </div>
      }
   </ul>
</aside>
:
<aside></aside>
);
}
export default Sidebar