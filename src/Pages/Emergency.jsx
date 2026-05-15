import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "./api";
import ProviderCard from "../card";

function Emergency() {
  const navigate = useNavigate()

  const [locations, setLocations] = useState([])
  const [emergencyTypes, setEmergencyTypes] = useState([])
  const [providers, setProviders] = useState([])

  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    API.get('/locations').then(res => setLocations(res.data))
    API.get('/emergency/types').then(res => setEmergencyTypes(res.data))
  }, [])

  const handleGetHelp = async () => {
    if (!selectedLocation || !selectedType) {
      setError('Please select both your location and emergency type')
      return
    }
    setError('')
    setLoading(true)
    setSearched(true)
    try {
      const res = await API.get(`/emergency/providers?type_id=${selectedType}&location_id=${selectedLocation}`)
      setProviders(res.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load emergency providers')
    } finally {
      setLoading(false)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Emergency Service</h1>
        <p className="text-gray-500 mb-8">Select your situation and location — help is on the way</p>

        {/* ── EMERGENCY TYPE CARDS ── */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-700 mb-3">What is your emergency?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {emergencyTypes.map(type => (
              <div
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`bg-white rounded-xl p-5 text-center shadow-sm border-2 cursor-pointer transition ${
                  selectedType === type.id
                    ? 'border-red-500 bg-red-50'
                    : 'border-transparent hover:border-red-200'
                }`}
                >
                <div className="text-4xl mb-2"></div>
                <p className="text-sm font-semibold text-gray-700">{type.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── LOCATION + GET HELP ── */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Location</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-400"
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
                onClick={handleGetHelp}
                className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition text-sm"
              >
                Get Help
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>
        {loading && (
          <p className="text-gray-400 text-sm text-center py-10">Finding help near you...</p>
        )}

        {searched && !loading && providers.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4"></div>
            <p className="text-gray-500 font-medium">No providers found in this area</p>
            <p className="text-gray-400 text-sm mt-1">Try selecting a different location</p>
          </div>
        )}

        {providers.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              {providers.length} Provider{providers.length > 1 ? 's' : ''} Available
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>

            {providers.map(provider => (
                <ProviderCard
                  key={provider.id}
                  name={provider.name}
                  phone={provider.phone_number}
                  price={provider.price !== 'Call for price' ? provider.price : null}
                  features={provider.features}
                  mapUrl={provider.map_url}
                />
              ))}
            </div>  
        )}
      </div>
    </div>
  )
}}

export default Emergency

