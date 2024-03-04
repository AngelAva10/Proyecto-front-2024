import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import Habitaciones from "./pages/Habitaciones";
import NuevoHabitacion from "./pages/NuevoHabitacion";
import Habitacion from "./pages/Habitacion";
import EditarHabitacion from "./pages/EditarHabitacion";
import { AuthProvider } from "./context/AuthProvider";
import { HabitacionesProvider } from "./context/HabitacionesProvider";
import Perfil from "./pages/Perfil";
import EditarPerfil from "./pages/EditarPerfil";
import PagoExitoso from './pages/PagoExitoso'
import ServicioPremium from './pages/ServicioPremium'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HabitacionesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="/registrar" element={<Registrar />} />
              <Route path="/olvide-password" element={<OlvidePassword />} />
              <Route
                path="/olvide-password/:token"
                element={<NuevoPassword />}
              />
              <Route path="/confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            <Route path="/habitaciones" element={<RutaProtegida />}>
              <Route index element={<Habitaciones />} />
              <Route path="pago-exitoso" element={<PagoExitoso />} />
              <Route path="servicio-premium" element={<ServicioPremium />} />
              <Route path="crear-habitacion" element={<NuevoHabitacion />} />
              <Route path=":id" element={<Habitacion />} />
              <Route path="editar/:id" element={<EditarHabitacion />} />
            </Route>

            <Route path="/perfil" element={<RutaProtegida />}>
              <Route index element={<Perfil />} />
              <Route path="editar" element={<EditarPerfil />} />
            </Route>
          </Routes>
        </HabitacionesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
