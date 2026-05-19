import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../auth/api"; 
import ProviderCard from "../card";

function GeneralService() {
  const navigate = useNavigate()

  const [locations, setLocations] = useState([])
  const [services, setServices] = useState([])
  const [garages, setGarages] = useState([])

  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch locations and general services on load
  useEffect(() => {
    API_URL.get('/locations').then(res => setLocations(res.data))

    // Get General Service category id then fetch its services
    API_URL.get('/services/categories').then(res => {
      const general = res.data.find(c => c.name === 'General Service')
      if (general) {
        API_URL.get(`/services/category/${general.id}`).then(r => setServices(r.data))
      }
    })
  }, [])

  const handleSearch = async () => {
    if (!selectedLocation) {
      setError('Please select a location')
      return
    }
    setError('')
    setLoading(true)
    setSearched(true)
    try {
      const res = await API_URL.get(`/garages?location_id=${selectedLocation}`)
      setGarages(res.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load garages')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-gradient-to-l from-blue-600 to-blue-800 text-white py-12">

        <button
                onClick={() => navigate("/customer/dashboard")}
                className="absolute top-4 left-4 px-3 py-1 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                    >
                        Back to Services
                    </button>
      <div className="max-w-5xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold mb-3">
          General Service
          </h1>

          <p className="text-blue-100 mb-8">
          Select your service and location to find nearby garages
          </p>
        </div>
      </div>

        {/* ── FILTERS ── */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service
                </label>

              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                value={selectedService}
                onChange={e => setSelectedService(e.target.value)}
              >
                <option value="">All services</option>

                {services.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                    </option>
                ))}
              </select>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Location
                </label>

              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
              >

                <option value="">Select location</option>

                {locations.map(l => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition text-sm"
              >
                Find Garages
              </button>
            </div>

        </div>
        
              {error && (
                <p className="text-red-500 text-sm mt-3">
                  {error}
                  </p>
                )}
        </div>


        {/* RESULTS */}
        {loading && (
          <p className="text-gray-400 text-sm text-center py-10">
            Finding garages near you...
            </p>
        )}

        {searched && !loading && garages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 font-medium">
              No garages found in this area
              </p>

            <p className="text-gray-400 text-sm mt-1">
              Try selecting a different location
              </p>
          </div>
        )}

        {garages.length > 0 && (
          <div>

            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              GarageFound
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {garages.map(garage => (
                <ProviderCard
                  key={garage.id}
                  name={garage.name}
                  phone={garage.phone_number}
                  address={garage.address}
                  map_url={garage.map_url}
                />
              ))}

            </div>
          </div>

        
        )}
        </div>

    
    )}
    

export default GeneralService
