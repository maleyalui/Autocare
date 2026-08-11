import LandingPage from "./LandingPage/LandingPage";
import BookingPage from "./Pages/dashboard";
import { BrowserRouter,Routes,Route , Navigate } from "react-router-dom";
import Register from "./auth/Register"
import Login from "./auth/Login";
import MechanicDashboard from "./Pages/mechanicdashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import Diagnostics from "./Pages/Diagnostics";
import Emergency from "./Pages/Emergency";
import GeneralService from "./Pages/GeneralService";
import CarDetailing from "./Pages/Cardetailing";
import Verify from "./Pages/Verify";

function App() {
const isLoggedIn = () => localStorage.getItem('token') !== null

const getUserRole = () => {
  const user = localStorage.getItem('user')
  if (!user) return null
  return JSON.parse(user).role
}

  return ( 
     <div className=" min-h-screen bg-gray-50">
         <Route
         path="/customer/dashboard"
        element={isLoggedIn() ? <BookingPage /> : <Navigate to="/login" />} />
         
         <Route
          path="/verify" element={<Verify />} />
          
          <Route
         path="/mechanic/dashboard"
         element={isLoggedIn() && getUserRole() === 'mechanic' ? <MechanicDashboard /> : <Navigate to="/login" />} />
          
         <Route
         path="/admin/dashboard"
         element={isLoggedIn() && getUserRole() === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
         <Route
         path="/diagnostics"
         element={isLoggedIn() ? <Diagnostics /> : <Navigate to="/login" />} />
         
         <Route
         path="/emergency"
         element={isLoggedIn() ? <Emergency /> : <Navigate to="/login" />} />
         
         <Route
         path="/general-service"
         element={isLoggedIn() ? <GeneralService /> : <Navigate to="/login" />} />
         
         <Route
         path="/car-detailing"
         element={isLoggedIn() ? <CarDetailing /> : <Navigate to="/login" />} />
        

        </div>

        
   )
  }
export default App;
