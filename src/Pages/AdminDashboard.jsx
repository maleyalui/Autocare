import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../auth/api";

function AdminDashboard() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))

  // users tab is always active
    const [activeTab, setActiveTab] = useState('users')

  // data forms
    const [users, setUsers] = useState([])
    const [garages, setGarages] = useState([])
    const [carwashes, setCarwashes] = useState([])
    const [diagnostics, setDiagnostics] = useState([])
    const [emergencyProviders, setEmergencyProviders] = useState([])
    const [requests, setRequests] = useState([])
    const [locations, setLocations] = useState([])
    const [emergencyTypes, setEmergencyTypes] = useState([])

  // Loading and error
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // garage form
    const [garageForm, setGarageForm] = useState({
        name: '', location_id: '', phone_number: '', address: '', map_url: ''
    })

  // car wash form
    const [carwashForm, setCarwashForm] = useState({
        name: '', location_id: '', phone_number: '', price: '', is_door_to_door: false, features: '', map_url: ''
    })

  // diagnostic form
    const [diagnosticForm, setDiagnosticForm] = useState({
        name: '', location_id: '', phone_number: '', price_from: '', features: '', map_url: ''
    })

  // emergency provider form
    const [emergencyForm, setEmergencyForm] = useState({
        emergency_type_id: '', name: '', location_id: '', phone_number: '', price: '', features: '', map_url: ''
    })
    
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
    }

    //show succes msg
    const showSuccess = (msg) => {
        setSuccess(msg)
        setTimeout(() => { setSuccess('') }, 3000)
    }
    
    // Fetch locations and emergency types for dropdown
    useEffect(() => {
    API_URL.get('/locations').then(res => setLocations(res.data))
    API_URL.get('/emergency/types').then(res => setEmergencyTypes(res.data))
      }, [])

    //fetch data wehn tab changes
    useEffect(() => {
        setError('')
        setLoading(true)

        const endpoints = {
        users: '/admin/users',
        garages: '/admin/garages',
        carwashes: '/admin/carwashes',
        diagnostics: '/admin/diagnostics',
        emergency: '/admin/emergency-providers',
        requests: '/admin/requests'
    }

    API_URL.get(endpoints[activeTab])
      .then(res => {
        if (activeTab === 'users') setUsers(res.data)
        if (activeTab === 'garages') setGarages(res.data)
        if (activeTab === 'carwashes') setCarwashes(res.data)
        if (activeTab === 'diagnostics') setDiagnostics(res.data)
        if (activeTab === 'emergency') setEmergencyProviders(res.data)
        if (activeTab === 'requests') setRequests(res.data)
      }) 
        .catch(err => setError(err.response?.data?.error || 'Failed to load data'))
        .finally(() => setLoading(false))
    }, [activeTab])

    // Delete any item
    const handleDelete = async (endpoint, id, refreshTab) => {
        if (!window.confirm('Are you sure you want to delete this?')) return
            try {
            await API_URL.delete(`${endpoint}/${id}`)
            showSuccess('Deleted successfully')
            setActiveTab(prev => {
        
        // force re-fetch by briefly switching tabs
        
            return prev
        })
      // re-fetch
      
      API_URL.get(`/admin/${refreshTab}`).then(res => {
        if (refreshTab === 'users') setUsers(res.data)
        if (refreshTab === 'garages') setGarages(res.data)
        if (refreshTab === 'carwashes') setCarwashes(res.data)
        if (refreshTab === 'diagnostics') setDiagnostics(res.data)
        if (refreshTab === 'emergency-providers') setEmergencyProviders(res.data)
        if (refreshTab === 'requests') setRequests(res.data)
      })
    } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete')
    }
    }

    //add garage
    const handleAddGarage = async (e) => {
        e.preventDefault()
        try {
            await API_URL.post('/admin/garages', garageForm)
            showSuccess('Garage added !')
            setGarageForm({ name: '', location_id: '', phone_number: '', address: '', map_url: '' })
            API.get('/admin/garages').then(res => setGarages(res.data))
            } catch (err) {
      setError(err.response?.data?.error || 'Failed to add garage')
    }}
    
    //add car wash
    const handleAddCarwash = async (e) => {
        e.preventDefault()
        try {
            await API_URL.post('/admin/carwashes', carwashForm)
            showSuccess('Car Wash added !')
            setCarwashForm({ name: '', location_id: '', phone_number: '', price: '', is_door_to_door: false, features: '', map_url: '' })
            API.get('/admin/carwashes').then(res => setCarwashes(res.data))
            } catch (err) {
      setError(err.response?.data?.error || 'Failed to add car wash')
    }}
    
    //add diagnostic
    const handleAddDiagnostic = async (e) => {
        e.preventDefault()
        try {
            await API_URL.post('/admin/diagnostics', diagnosticForm)
            showSuccess('Diagnostic added !')
            setDiagnosticForm({ name: '', location_id: '', phone_number: '', price_from: '', features: '', map_url: '' })
            API.get('/admin/diagnostics').then(res => setDiagnostics(res.data))
            } catch (err) {
      setError(err.response?.data?.error || 'Failed to add diagnostic')
    }
}

    //add emergency provider  
    const handleAddEmergency = async (e) => {
        e.preventDefault()
        try {
            await API_URL.post('/admin/emergency-providers', emergencyForm)
            showSuccess('Emergency Provider added !')
            setEmergencyForm({ emergency_type_id: '', name: '', location_id: '', phone_number: '', price: '', features: '', map_url: '' })
            API.get('/admin/emergency-providers').then(res => setEmergencyProviders(res.data))
            } catch (err) {
      setError(err.response?.data?.error || 'Failed to add emergency provider')
    }
        }
        const tabs = [
    { key: 'users', label: 'Users' },
    { key: 'garages', label: 'Garages' },
    { key: 'carwashes', label: 'Car Washes' },
    { key: 'diagnostics', label: 'Diagnostics' },
    { key: 'emergency', label: 'Emergency' },
    { key: 'requests', label: 'Requests' },
  ]

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1"

return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-10 py-4 shadow-sm bg-white sticky top-0 z-50">
        <div className="text-2xl font-bold text-orange-500">
          Auto<span className="text-gray-800">Care</span>
          <span className="ml-3 text-sm font-normal text-gray-400">Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 text-sm">Hi, {user?.full_name}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition text-sm"
          >
            Logout
          </button>
        </div>
      </nav>    
    
     <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-500 mb-8">Manage all providers, users and requests</p>

        {/* ── MESSAGES ── */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 text-green-600 text-sm px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

    {/* ── TABS ── */}
     <div className="flex gap-2 flex-wrap mb-8">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading && <p className="text-gray-400 text-sm">Loading...</p>}

        {/*  USERS TABLE  */}
                {activeTab === 'users' && !loading && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Phone</th>
                  <th className="px-6 py-3 text-left">Role</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">{u.full_name}</td>
                    <td className="px-6 py-4 text-gray-500">{u.email}</td>
                    <td className="px-6 py-4 text-gray-500">{u.phone_number}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        u.role === 'admin' ? 'bg-orange-100 text-orange-600' :
                        u.role === 'mechanic' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">  
                        <button
                        onClick={() => handleDelete('/admin/users', u.id, 'users')}
                        className="text-red-500 hover:text-red-700 text-xs font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <p className="text-center text-gray-400 py-10">No users found</p>
            )}
          </div>
        )}

        {/* GARAGES TABLE */}
        {activeTab === 'garages' && !loading && (
          <div className="flex flex-col gap-8">

            {/* Add Garage Form */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Add New Garage</h2>
              <form onSubmit={handleAddGarage} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Name</label>
                  <input className={inputClass} placeholder="Garage name" value={garageForm.name}
                    onChange={e => setGarageForm({...garageForm, name: e.target.value})} required />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <select className={inputClass} value={garageForm.location_id}
                    onChange={e => setGarageForm({...garageForm, location_id: e.target.value})} required>
                    <option value="">Select location</option>
                    {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                  </select>
                </div>

                 <div>
                  <label className={labelClass}>Phone Number</label>
                  <input className={inputClass} placeholder="0712345678" value={garageForm.phone_number}
                    onChange={e => setGarageForm({...garageForm, phone_number: e.target.value})} required />
                </div>

                <div>
                  <label className={labelClass}>Address</label>
                  <input className={inputClass} placeholder="Street address" value={garageForm.address}
                    onChange={e => setGarageForm({...garageForm, address: e.target.value})} />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Google Maps URL</label>
                  <input className={inputClass} placeholder="https://maps.google.com/..." value={garageForm.map_url}
                    onChange={e => setGarageForm({...garageForm, map_url: e.target.value})} />
                </div>

                <div className="md:col-span-2">
                  <button type="submit"
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition text-sm">
                    Add Garage
                  </button>
                </div>
                </form>
            </div>

            {/* Garages List & Delete btn*/}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Location</th>
                    <th className="px-6 py-3 text-left">Phone</th>
                    <th className="px-6 py-3 text-left">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {garages.map(g => (
                    <tr key={g.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-800">{g.name}</td>
                      <td className="px-6 py-4 text-gray-500">{g.location}</td>
                      <td className="px-6 py-4 text-gray-500">{g.phone_number}</td>
                      <td className="px-6 py-4">

                        <button
                          onClick={() => handleDelete('/admin/garages', g.id, 'garages')}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* If no garages, show no garages found. */}
              {garages.length === 0 && (
                <p className="text-center text-gray-400 py-10">No garages found</p>
              )}

            </div>
          </div>
        )}

        {/* CAR WASHES TABLE */}
        {activeTab === 'carwashes' && !loading && (
          <div className="flex flex-col gap-8">
            
            {/* Add Car Wash Form */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Add New Car Wash</h2>
              <form onSubmit={handleAddCarwash} className="grid grid-cols-1 md:grid-cols-2 gap-4">
               
                <div>
                  <label className={labelClass}>Name</label>
                  <input className={inputClass} placeholder="Car wash name" value={carwashForm.name}
                    onChange={e => setCarwashForm({...carwashForm, name: e.target.value})} required />
                </div>

                <div>
                  <label className={labelClass}>Location</label>
                  <select className={inputClass} value={carwashForm.location_id}
                    onChange={e => setCarwashForm({...carwashForm, location_id: e.target.value})} required>
                    <option value="">Select location</option>
                    {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                  </select>
                </div>
                
                 <div>
                  <label className={labelClass}>Phone Number</label>
                  <input className={inputClass} placeholder="0712345678" value={carwashForm.phone_number}
                    onChange={e => setCarwashForm({...carwashForm, phone_number: e.target.value})} required />
                </div>
                
                <div>
                  <label className={labelClass}>Price</label>
                  <input className={inputClass} placeholder="Price in KES" value={carwashForm.price}
                    onChange={e => setCarwashForm({...carwashForm, price: e.target.value})} required />
                </div>
                
                <div>
                  <label className={labelClass}>Door-to-door?</label>
                  <select className={inputClass} value={carwashForm.is_door_to_door} onChange={e => setCarwashForm({...carwashForm, is_door_to_door: e.target.value === 'true'})} required>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className={labelClass}>Features</label>
                  <input className={inputClass} placeholder="e.g. Interior, Exterior, Waxing" value={carwashForm.features}
                    onChange={e => setCarwashForm({...carwashForm, features: e.target.value})} />
                </div>
                
                <div className="md:col-span-2">
                  <label className={labelClass}>Google Maps URL</label>
                  <input className={inputClass} placeholder="https://maps.google.com/..." value={carwashForm.map_url}
                    onChange={e => setCarwashForm({...carwashForm, map_url: e.target.value})} />
                </div>
                
                <div className="md:col-span-2">
                  <button type="submit"
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition text-sm">
                    Add Car Wash
                  </button>
                </div>
              </form>
            </div>

            {/* Car Washes List & Delete btn*/}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                  <tr>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Location</th>
                    <th className="py-3 px-4 text-left">Phone Number</th>
                    <th className="py-3 px-4 text-left">Price</th>
                    <th className="py-3 px-4 text-left">Door-to-door</th>
                    <th className="py-3 px-4 text-left">Features</th>
                    <th className="py-3 px-4 text-left">Google Maps URL</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {carwashes.map(cw => (
                    <tr key={cw.id}>
                      <td className="py-3 px-4">{cw.name}</td>
                      <td className="py-3 px-4">{cw.location?.name || 'N/A'}</td>
                      <td className="py-3 px-4">{cw.phone_number}</td>
                      <td className="py-3 px-4">{cw.price}</td>
                      <td className="py-3 px-4">{cw.is_door_to_door ? 'Yes' : 'No'}</td>
                      <td className="py-3 px-4">{cw.features}</td>
                      <td className="py-3 px-4">
                        {cw.map_url && (
                          <a href={cw.map_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            Show on Map
                          </a>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDeleteCarwash(cw.id)}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {carwashes.length === 0 && (
                <p className="text-center text-gray-400 py-10">No car washes found</p>
              )}
            </div>
          </div>
        )}
            </div>

            {/* DIAGNOSTICS TABLE */}
            {activeTab === 'diagnostics' && !loading && (
              <div className="flex flex-col gap-8">

                {/* Add Diagnostic Form */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Add New Diagnostic Service</h2>
                  <form onSubmit={handleAddDiagnostic} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Name</label>
                      <input className={inputClass} placeholder="Diagnostic name" value={diagnosticForm.name}
                        onChange={e => setDiagnosticForm({...diagnosticForm, name: e.target.value})} required />
                    </div>

                    <div>
                      <label className={labelClass}>Location</label>
                      <select className={inputClass} value={diagnosticForm.location_id}
                        onChange={e => setDiagnosticForm({...diagnosticForm, location_id: e.target.value})} required>
                        <option value="">Select location</option>
                        {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                      </select>
                    </div>
                    
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input className={inputClass} placeholder="0712345678" value={diagnosticForm.phone_number}
                        onChange={e => setDiagnosticForm({...diagnosticForm, phone_number: e.target.value})} required />
                    </div>
                    
                    <div>
                      <label className={labelClass}>Price From</label>
                      <input className={inputClass} placeholder="Starting price in KES" value={diagnosticForm.price_from}
                        onChange={e => setDiagnosticForm({...diagnosticForm, price_from: e.target.value})} required />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className={labelClass}>Features</label>
                      <input className={inputClass} placeholder="e.g. Engine check, Electrical system" value={diagnosticForm.features}
                        onChange={e => setDiagnosticForm({...diagnosticForm, features: e.target.value})} />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className={labelClass}>Google Maps URL</label>
                      <input className={inputClass} placeholder="https://maps.google.com/..." value={diagnosticForm.map_url}
                        onChange={e => setDiagnosticForm({...diagnosticForm, map_url: e.target.value})} />
                    </div>
                    
                    <div className="md:col-span-2">
                      <button type="submit"
                        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition text-sm">
                        Add Diagnostic Service
                      </button>
                    </div>
                  </form>
                </div>

                {/* Diagnostics List & Delete btn*/}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <table className="w-full text-sm">
                    
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                      <tr>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Location</th>
                        <th className="py-3 px-4 text-left">Phone Number</th>
                        <th className="py-3 px-4 text-left">Price From</th>
                        <th className="py-3 px-4 text-left">Features</th>
                        <th className="py-3 px-4 text-left">Google Maps URL</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {diagnostics.map(d => (
                        <tr key={d.id}>
                          <td className="py-3 px-4">{d.name}</td>
                          <td className="py-3 px-4">{d.location?.name || 'N/A'}</td>
                          <td className="py-3 px-4">{d.phone_number}</td>
                          <td className="py-3 px-4">{d.price_from}</td>
                          <td className="py-3 px-4">{d.features}</td>
                          <td className="py-3 px-4">
                            {d.map_url && (
                              <a href={d.map_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                Show on Map
                              </a>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleDeleteDiagnostic(d.id)}
                              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition text-sm"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {diagnostics.length === 0 && (
                    <p className="text-center text-gray-400 py-10">No diagnostics found</p>
                  )}
                </div>
              </div>
            )}

             {/* EMERGENCY PROVIDERS TABLE */}
             {activeTab === 'emergency' && !loading && (
          <div className="flex flex-col gap-8">
            
            {/* Add Emergency Provider Form */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Add New Emergency Provider</h2>
              <form onSubmit={handleAddEmergency} className="grid grid-cols-1 md:grid-cols-2 gap-4">
               
                <div>
                  <label className={labelClass}>Name</label>
                  <input className={inputClass} placeholder="Provider name" value={emergencyForm.name}
                    onChange={e => setEmergencyForm({...emergencyForm, name: e.target.value})} required />
                </div>

                <div>
                  <label className={labelClass}>Emergency Type</label>
                  <select className={inputClass} value={emergencyForm.emergency_type_id}
                    onChange={e => setEmergencyForm({...emergencyForm, emergency_type_id: e.target.value})} required>
                    <option value="">Select type</option>
                    {emergencyTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>
                
                 <div>
                  <label className={labelClass}>Location</label>
                  <select className={inputClass} value={emergencyForm.location_id}
                    onChange={e => setEmergencyForm({...emergencyForm, location_id: e.target.value})} required>
                    <option value="">Select location</option>
                    {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                  </select>
                </div>
                
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input className={inputClass} placeholder="0712345678" value={emergencyForm.phone_number}
                    onChange={e => setEmergencyForm({...emergencyForm, phone_number: e.target.value})} required />
                </div>
                
                <div>
                  <label className={labelClass}>Price</label>
                  <input className={inputClass} placeholder="Price in KES" value={emergencyForm.price}
                    onChange={e => setEmergencyForm({...emergencyForm, price: e.target.value})} required />
                </div>
                
                <div className="md:col-span-2">
                  <label className={labelClass}>Features</label>
                  <input className={inputClass} placeholder="e.g. Towing, On-site repair" value={emergencyForm.features}
                    onChange={e => setEmergencyForm({...emergencyForm, features: e.target.value})} />
                </div>
                
                <div className="md:col-span-2">
                  <label className={labelClass}>Google Maps URL</label>
                  <input className={inputClass} placeholder="https://maps.google.com/..." value={emergencyForm.map_url}
                    onChange={e => setEmergencyForm({...emergencyForm, map_url: e.target.value})} />
                </div>
                
                <div className="md:col-span-2">
                  <button type="submit"
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition text-sm">
                    Add Emergency Provider
                  </button>
                </div>
              </form>
            </div>

            {/* Emergency Providers List & Delete btn*/}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                  <tr>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Emergency Type</th>
                    <th className="py-3 px-4 text-left">Location</th>
                    <th className="py-3 px-4 text-left">Phone Number</th>
                    <th className="py-3 px-4 text-left">Price</th>
                    <th className="py-3 px-4 text-left">Features</th>
                    <th className="py-3 px-4 text-left">Google Maps URL</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {emergencyProviders.map(ep => (
                    <tr key={ep.id}>
                      <td className="py-3 px-4">{ep.name}</td>
                      <td className="py-3 px-4">{ep.emergency_type?.name || 'N/A'}</td>
                      <td className="py-3 px-4">{ep.location?.name || 'N/A'}</td>
                      <td className="py-3 px-4">{ep.phone_number}</td>
                      <td className="py-3 px-4">{ep.price}</td>
                      <td className="py-3 px-4">{ep.features}</td>
                      <td className="py-3 px-4">
                        {ep.map_url && (
                          <a href={ep.map_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            Show on Map
                          </a>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-red-500 hover:text-red-700" onClick={() => deleteEmergencyProvider(ep.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {emergencyProviders.length === 0 && (
                <p className="text-center text-gray-400 py-10">No emergency providers found</p>
               )}
            </div>
          </div>
  )}

        {/* REQUESTS TABLE */}
        {activeTab === 'requests' && !loading && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left">User</th>
                  <th className="px-6 py-3 text-left">Service Type</th>
                  <th className="px-6 py-3 text-left">Service Name</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requests.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">{r.user?.full_name || 'N/A'}</td>
                    <td className="px-6 py-4 text-gray-500">{r.service_type}</td>
                    <td className="px-6 py-4 text-gray-500">{r.service_name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        r.status === 'completed' ? 'bg-yellow-100 text-yellow-600' :
                        r.status === 'accepted' ? 'bg-green-100 text-green-600' :
                        r.status === 'declined' ? 'bg-red-100 text-red-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-red-500 hover:text-red-700" onClick={() => deleteRequest(r.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {requests.length === 0 && (
              <p className="text-center text-gray-400 py-10">No requests found</p>
            )}

          </div>
        )}
        </div>
)
}

export default AdminDashboard
