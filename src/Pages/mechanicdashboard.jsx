import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import API_URL from '../auth/api';

const MechanicDashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const [isActive, setIsActive] = useState(false);
    const [requests, setRequests] = useState([]);
    const [acceptedRequest, setAcceptedRequest] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const showSuccess = (msg) => {
        setSuccess(msg);
        setTimeout(() => {
            setSuccess('');
        }, 3000);
    };

    //fetch requests
    const fetchRequests = async () => {
        try{
        const res = await API_URL.get('/requests');
        setRequests(res.data.requests || []);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to load requests');
        }
        }

        useEffect(() => {
            if (isActive) {
                fetchRequests();
            } else {
                setRequests([]);
                setAcceptedRequest(null);
            }
        }, [isActive]);

    // auto refesh requests every 30 seconds
    useEffect(() => {
        if (!isActive) return;
        const interval = setInterval(fetchRequests, 3000)
        return () => clearInterval(interval);
    }, [isActive]);

    // toggle active status
    const handleToggle = async () => {
        const newStatus = !isActive;
        try {
            await API_URL.patch('/requests/mechanic/toggle', { is_active: newStatus });
            setIsActive(newStatus);
            showSuccess(newStatus ? 'You are now online' : 'You are now offline');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to update status');
        }
    };

    // accept a request
    const handleAccept = async (requestId) => {
        try {
            await API_URL.post(`/requests/${requestId}`, { status: 'accepted' });
            showSuccess('Request accepted!');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to accept request');
        }
    };

    const handleDecline = async (requestId) => {
        try {
            await API_URL.patch(`/requests/${requestId}`, { status: 'declined' })
            showSuccess('Request declined');
            setRequests(prev => prev.filter(r => r._id !== requestId));
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to decline request');
        }
    };

    // call client - opens phone dailer
    //const handleCallclient = (phoneNumber) => {
       // window.open(`tel:${phoneNumber}`)
    //}

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="max-w-4xl mx-auto py-10 px-4">

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
                </div>

                {/* Header with toggle*/} 
                <div className = "flex flex-col md:flex-row gap-6 mb-10">

                    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center gap-4 w-full md:w-64">
                        <div className={`w-4 h-4 rounded-full ${isActive ? 'bg-blue-500' : 'bg-red-500'}`}></div>
                        <p className="text-gray-800 font-semibold text-lg">
                            {isActive ? 'Online' : 'Offline'}
                        </p>
                        <p className="text-gray-400 text-sm text-center">
                            Toggle your status to receive new requests
                        </p>
                        <button
                        onClick={handleToggle}
                        className={`w-full py-3 rounded-xl font-semibold text-white transition ${
                            isActive 
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                        >
                            {isActive ? 'Go Offline' : 'Go Online'}
                        </button>
                    </div>

                    {/* Requests List */}
                    {acceptedRequest && (
                        <div className="bg-white rounded-2xl shadow-sm p-6 flex-1 border-l-4 border-green-500">
                            <h2 className="text-lg font-bold text-gray-800 mb-1">Current Job</h2>
                            <p className="text-sm text-gray-400 mb-4">You are currently working on a request.</p>

                            <div className="grid grid-cols-2 gap-4 mb-6">

                                <div>
                                    <p className="text-xs text-gray-400 uppercase mb-1">Client Name</p>
                                    <p className="font-semibold text-gray-800">{acceptedRequest.client_name}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400 uppercase mb-1">Phone Number</p>
                                    <p className="font-semibold text-gray-800">{acceptedRequest.client_phone}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400 uppercase mb-1">Service</p>
                                    <p className="font-semibold text-gray-800">{acceptedRequest.service}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400 uppercase mb-1">Location</p>
                                    <p className="font-semibold text-gray-800">{acceptedRequest.location}</p>
                                </div>
                            </div>

                           {/* <button
                            onClick={() => handleCallClient(acceptedRequest.client_phone)}
                            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
                            >
                                Call Client
                            </button> */}
            
                        </div>
                    )}

                    {/* placeholder when no accepted request */}
                    {isActive && !acceptedRequest && (
                        <div className="bg-white rounded-2xl shadow-sm p-6 flex-1 flex flex-col items-center justify-center text-center">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">No Active job yet</h2>
                        <p className="text-gray-400">Accept a request to start working</p>
                        </div>
                    )}

                </div>

                {/*incoming requests */}
                {isActive && (
                    <div>
                         <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-800">
                                Incoming Requests
                                {requests.length > 0 && (
                                    <span
                                        className="ml-2 bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full"
                                    >
                                    {requests.length}
                                    </span>
                                )}
                </h2>
                <button 
                onClick={fetchRequests}
                className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                >
                Refresh
                </button>
                </div>

                {requests.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                    <p className="text-gray-500 font-medium">No pending requests right now</p>
                    <p className="text-gray-400 text-sm mt-1">New requests will appear here automatically</p>
                </div>
                   ):(<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requests.map(req => (
                  <div
                    key={req.id}
                    className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
                  >
                    {/* Request details */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{req.client_name}</h3>
                        <p className="text-sm text-gray-400">{req.requested_at?.slice(0, 10)}</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full font-medium">
                        Pending
                      </span>
                    </div>
                    
                     <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Service</p>
                        <p className="text-sm font-semibold text-gray-700">{req.service}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Location</p>
                        <p className="text-sm font-semibold text-gray-700">{req.location}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                        <p className="text-xs text-gray-400 mb-1">Phone</p>
                        <p className="text-sm font-semibold text-gray-700">{req.client_phone}</p>
                      </div>
                    </div>

                    {/* Accept / Decline buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAccept(req.id)}
                        className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition text-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(req.id)}
                        className="flex-1 py-2 bg-red-100 hover:bg-red-500 hover:text-white text-red-500 font-semibold rounded-lg transition text-sm"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
                )}
            </div>
        )}
    </div>
    );
};

export default MechanicDashboard;