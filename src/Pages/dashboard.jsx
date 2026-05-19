import Services from "./Services";

function BookingPage() {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen bg-gray-50"> 
    
    <nav className="bg-gradient-to-l from-blue-900 to-blue-800 shadow-md py-4 px-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-800">
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-gray-200  text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
          >
            Logout
          </button>
        </div>
      </nav>   
      
      {/* HERO SECTION */}
      <section className="bg-gradient-to-l from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Professional Vehicle Services
          </h1>

          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Book trusted garages, diagnostics, detailing, and emergency
            roadside assistance — all in one place.
          </p>

        </div>
      </section>

      
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Our Services
            </h2>

            <p className="text-gray-500">
              Choose the service you need and find providers near you
            </p>
          </div>

          <Services />

        </div>
      </section>
    </div>
  );
}

export default BookingPage;