import { useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import API_URL from "./api";

function Register() {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone_number: '',
        password: '',
        role: 'user',
        specialization: '' //for mechanics
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            await API_URL.post('/auth/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 shadow-lg">
            <div className="max-w-md w-full space-y-8 bg-hite p-10 rounded-2xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Create your Auto Care account
                        </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join thousands of vehicle owners getting services effortlessly</p>
                </div>
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                                Full Name:
                            </label>
                            <input
                             type="text"
                             id="full_name"
                             name="full_name"
                             required
                             value={formData.full_name}
                             onChange={handleChange}
                             className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 
                             placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                             placeholder="Enter your full name"
                             />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email:
                            </label>
                            <input
                             type="email"
                             name="email"
                             id="email"
                             value={formData.email}
                             onChange={handleChange}
                             className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300
                             placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                             placeholder="you@example.com"
                             />
                            </div>

                        <div>
                            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                                Phone Number:
                            </label>
                            <input
                             type="text"
                             name="phone_number"
                             id="phone_number"
                             value={formData.phone_number}
                             onChange={handleChange}
                             className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300
                             placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                             placeholder="Enter your phone number"
                             required
                             />
                            </div>

                             <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password:
                                </label>

                                <input
                                 type="password"
                                 name="password"
                                 id="password"
                                 required
                                 value={formData.password}
                                 onChange={handleChange}
                                 className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300
                                 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                 placeholder="At least 8 characters"
                                 />
                             </div>

                             <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Register as:
                            </label>
                            <select
                                name="role"
                                id="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="user">Driver</option>
                                <option value="mechanic">Mechanic</option>
                            </select>

                            {/*Only for mechanics */}
                            {formData.role === 'mechanic' && (
                                <div className="mt-4">
                                    <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                                        Specialization:
                                    </label>
                                    <input
                                        type="text"
                                        name="specialization"
                                        id="specialization"
                                        value={formData.specialization}
                                        onChange={handleChange}
                                        className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300
                                            placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Enter your specialization"
                                    />
                                </div>
                            )}

                            </div>

                        </div>

                        <div>
                            <button 
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium 
                                rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                                ${loading ? 'opacity-70 cursor-not-allowed' : '' }`}
                                >
                                {loading ? 'Creating account...' : 'Register'}
                            </button>
                        </div>

                        <div className="text-center text-sm text-gray-600">
                            Already have an account {' '}
                            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in
                            </a>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default Register