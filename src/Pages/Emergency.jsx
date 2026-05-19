import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../auth/api";
import ProviderCard from "../card";
import Confirmation from "./confirmation";

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
  const [selectedProvider, setSelectedProvider] = useState(null)

  //confirmation
  const [showConfirm, setShowConfirm] = useState(false)
  const [requestSuccess, setRequestSuccess] = useState(false)

  useEffect(() => {
    API_URL.get('/locations').then(res => setLocations(res.data))
    API_URL.get('/emergency/types').then(res => setEmergencyTypes(res.data))
  }, [])

  const handleConfirmRequest = async () => {

  console.log("CONFIRM CLICKED");

  try {

    console.log(JSON.stringify(selectedProvider, null, 2));

    const providerId = selectedProvider?.id;

    console.log("Provider ID:", providerId);
    console.log("Location ID:", selectedLocation);

    if (!providerId) {
      console.log("NO PROVIDER ID FOUND");
      setError('No emergency services available');
      setShowConfirm(false);
      return;
    }

    const payload = {
      provider_id: providerId,
      location_id: selectedLocation,
    };

    console.log("SENDING PAYLOAD:", payload);

    const res = await API_URL.post('/requests', payload);

    console.log("SUCCESS RESPONSE:", res.data);

    setShowConfirm(false);
    setRequestSuccess(true);

    setTimeout(() => setRequestSuccess(false), 5000);

  } catch (err) {

    console.log("FULL ERROR:", err);

    if (err.response) {
      console.log("ERROR RESPONSE:", err.response.data);
      console.log("STATUS:", err.response.status);
    }

    setError(
      err.response?.data?.error ||
      err.message ||
      'Failed to request emergency service'
    );

    setShowConfirm(false);
  }
};


  const handleGetHelp = async () => {
    if (!selectedLocation || !selectedType) {
      setError('Please select both your location and emergency type')
      return
    }
    setError('')
    setLoading(true)
    setSearched(true)
    try {
      const res = await API_URL.get(`/emergency/providers?type_id=${selectedType}&location_id=${selectedLocation}`)
      setProviders(res.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load emergency providers')
    } finally {
      setLoading(false)
    }
  }

    const selectedTypeName = emergencyTypes.find(t => t.id === selectedType)?.name || 'Emergency'

    return (
        <div className="min-h-screen bg-gray-50">

        <div className="bg-gradient-to-l from-red-600 to-red-800 text-white py-12">

                  <button
                    onClick={() => navigate("/customer/dashboard")}
                    className="absolute top-4 left-4 px-3 py-1 bg-white text-red-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                    >
                        Back to Services
                    </button>

          <div className="max-w-5xl mx-auto px-6 py-10">
          
            <h1 className="text-3xl font-bold mb-2">
              Emergency Service
              </h1>

              <p className="text-lg mb-8">
                Select your situation and location — help is on the way
              </p>

              {requestSuccess && (
                <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                  Your request for {selectedTypeName} has been submitted ! A mechanic will contact you shortly. Stay safe.
                </div>
              )} 

            </div>
          </div>

        {/* ── EMERGENCY TYPE CARDS ── */}
        <div className="max-w-5xl mx-auto px-6 py-18">

          <div className="mb-8">
            <h2
             className="text-sm font-medium text-gray-700 mb-3">
              What is your emergency?
              </h2>

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

                <h3
                 className="text-sm font-semibold text-gray-700">
                  {type.name}
                </h3>

              </div>
            ))}
          </div>
        </div>

        {/*  LOCATION  & GET HELP */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Location
                </label>

              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-400"
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
              >

                <option value="">Select your area</option>

                {locations.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
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

          {error && (<p className="text-red-500 text-sm mt-3">
            {error}
            </p>
            )}
        </div>

          {/* LOADING */}
        {loading && (
          <p className="text-gray-400 text-sm text-center py-10">
            Finding help near you...
          </p>
        )}

          {/* NO RESULTS */}
        {searched && !loading && providers.length === 0 && (
          <div className="text-center rounded-2xl shadow-sm p-10">
            <p className="text-gray-500 font-medium">
              No providers found in this area
            </p>

            <p className="text-gray-400 text-sm mt-1">
              Try selecting a different location
            </p>
          </div>
        )}

          {/* PROVIDERS LIST */}
        {providers.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Available Providers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {providers.map(provider => (
              <div
                key={provider.id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between"
                >
                <div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-1"
                  >
                    {provider.name}
                    </h3>

                  {/*emergency type badge*/}
                  <span className="inline-block bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium mb-3"
                  >
                    {provider.emergency_type}
                  </span>

                  {/*price*/}
                  {provider.price &&(
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Kshs {provider.price}
                    </p>
                  )}

                  {/*features*/}
                  {provider.features && provider.features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {(Array.isArray(provider.features)
                       ? provider.features
                      : provider.features.split(',')
                    ).map((feature, index) => (
                        <span key={index} className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {feature.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  {/*phone*/}
                  {provider.phone_number && (
                    <p className="text-sm text-gray-600 mt-2">
                      Call: {provider.phone_number}
                    </p>
                  )}

                  {/*request help*/}
                  <button
                  onClick={() => {
                    setSelectedProvider(provider)
                    setShowConfirm(true)
                  }}
                    className="mt-4 w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition text-sm"
                    >
                    Request Help

                  </button>

                </div>
                </div>
            ))}
            </div>
          </div>
        )}
        </div>

        {/*confirmation */}
        <Confirmation
        isOpen={showConfirm}
        title="Send Emergency Request?"
        message={`You are requesting help for ${selectedTypeName}. A mechanic will be dispatched to your location shortly`}
        onConfirm = {handleConfirmRequest}
        onCancel={() => setShowConfirm(false)}
        confirmText="Yes, Request Help"
        />

      </div>
    );
}

export default Emergency;