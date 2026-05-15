
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "./api";
import ProviderCard from "../card";

function CarDetailing() {
  const navigate = useNavigate()

  const [locations, setLocations] = useState([])
  const [carwashes, setCarwashes] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    API_URL.get('/locations').then(res => setLocations(res.data))
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
        const res = await API.get(`/carwashes?location_id=${selectedLocation}`)
      setCarwashes(res.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load car washes')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Car Detailing</h1>
        <p className="text-gray-500 mb-8">Find professional car washes near you</p>

        {/* ── FILTER ── */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Location</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-400"
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
              >
                <option value="">Select your area</option>
                {locations.map(l => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </div>
              <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition text-sm"
              >
                Find Car Washes
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>
        {loading && (
          <p className="text-gray-400 text-sm text-center py-10">Finding car washes near you...</p>
        )}

        {searched && !loading && carwashes.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4"></div>
            <p className="text-gray-500 font-medium">No car washes found in this area</p>
            <p className="text-gray-400 text-sm mt-1">Try selecting a different location</p>
          </div>
        )}

        {carwashes.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              {carwashes.length} Car WashFound
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {carwashes.map(cw => (
                <div key={cw.id} className="relative">
                  {/* Door to door badge */}
                  {cw.is_door_to_door && (
                    <span className="absolute top-4 right-4 bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full font-medium z-10">
                      Door to Door
                    </span>
                  )}
                  <ProviderCard
                    name={cw.name}
                    phone={cw.phone_number}
                    price={cw.price}
                    priceLabel="From"
                    features={cw.features}
                    mapUrl={cw.map_url}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}   
export default CarDetailing