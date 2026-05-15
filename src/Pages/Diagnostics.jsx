import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "./api";
import ProviderCard from "../card";

function Diagnostics() {
  const navigate = useNavigate()

  const [locations, setLocations] = useState([])
  const [centers, setCenters] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    API.get('/locations').then(res => setLocations(res.data))
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
      const res = await API.get(`/diagnostics?location_id=${selectedLocation}`)
      setCenters(res.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load diagnostic centers')
    } finally {
      setLoading(false)
    }
  }
    return (
    <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Diagnostics</h1>
        <p className="text-gray-500 mb-8">Find diagnostic centers near you for a full vehicle scan</p>

        {/* ── FILTER ── */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Location</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400"
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
                className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition text-sm"
              >
                Find Centers
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>
        {loading && (
          <p className="text-gray-400 text-sm text-center py-10">Finding diagnostic centers near you...</p>
        )}

        {searched && !loading && centers.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4"></div>
            <p className="text-gray-500 font-medium">No diagnostic centers found in this area</p>
            <p className="text-gray-400 text-sm mt-1">Try selecting a different location</p>
          </div>
        )}

        {centers.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              {centers.length} Center{centers.length > 1 ? 's' : ''} Found
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {centers.map(center => (
                <ProviderCard
                  key={center.id}
                  name={center.name}
                  phone={center.phone_number}
                  price={center.price_from}
                  priceLabel="From"
                  features={center.features}
                  mapUrl={center.map_url}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Diagnostics