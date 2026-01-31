import LandingPage from "./LandingPage/LandingPage";
import BookingPage from "./BookingPage/BookingPage";
import { BrowserRouter,Routes,Route } from "react-router-dom";
function App() {
  return ( 
     <div className=" min-h-screen bg-gray-50">
      <Routes>
         <Route path="/" element={<LandingPage />} />
         <Route path="/booking" element={<BookingPage />} />
        </Routes>
        </div>
   )

}

export default App;
