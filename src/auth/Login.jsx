import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "./api";

function Login() {
    const [formData, setFormData] = useState({
        email:'',
        password:'',
    });
    const [error, setError] = useState('');
    const[loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});   
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError();
        setLoading(true);
        try {
            const response = await API_URL.post('/auth/login', formData);
            const { token, user } = response.data;

            //save to local storage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            //redirect based on role
            if (user.role === 'user') {
                navigate('/customer/dashboard');
            } else if (user.role === 'mechanic') {
                navigate('/mechanic/dashboard');
            } else if (user.role === 'admin') {
                navigate('/admin/dashboard');
            }
            else {
                navigate('/');
            }
            
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Welcome back to Autocare
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Sign in to book your next service
                        </p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input 
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300
                            placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter your email" 
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                             type="password"
                             id="password"
                             name="password"
                             required
                             value={formData.password}
                             onChange={handleChange}
                             className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300
                             placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                             placeholder="••••••••"
                             />
                        </div>
                    </div>

                    <div>
                        <button
                        type="submit"
                        disabled={loading}
                        className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>

                    <div className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                        Register Now
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login