import LandingPage from "./LandingPage/LandingPage";
import BookingPage from "./Pages/dashboard";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from "./auth/Register"
import Login from "./auth/Login";
import MechanicDashboard from "./Pages/mechanicdashboard";

function App() {
  return ( 
     <div className=" min-h-screen bg-gray-50">
      <Routes>
         <Route path="/" element={<LandingPage />} />
         <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
         <Route path="/customer/dashboard" element={<BookingPage />} />
         <Route path="/mechanic/dashboard" element={<MechanicDashboard />} />
        </Routes>
        </div>
   )

}

export default App;
