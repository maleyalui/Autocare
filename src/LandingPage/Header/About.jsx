import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Title() {
return (
    <div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">Auto Care</h1>
        </div>
)
}

function Navbar() {
    return (
        <nav className="flex items-center justify-between px-10 py-4 shadow-sm bg-white">
            <div className="text-2xl font-bold text-blue">
                Auto <span className="text-blue-600">Care</span>
            </div>
            <div className="flex gap-3">
                <Link to="/login"
                className="px-5 py-2 rounded-lg text-gray-800 font-medium hover:bg-gray-100 text white transition">
                    Login
                </Link>
                    <Link
                    to="/register"
                    className="px-5 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-800 transition">
                    Sign Up
                </Link>
                </div>

        </nav>
    )
}
function Description() {
    return (
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
        Book a mechanic, find a carwash, run diagnostics or get emergency help - all in one place across Nairobi.<br className="hidden sm:block" />
        Your Car, Our Priority. 
        </p>
    )
}

function Getstarted(){
    const navigate = useNavigate()
    return(<div className="flex justify-center">
        
        {/* Using Navigate to so that when clicked takes you to the booking page */}
            <button
            onClick={()=>navigate('/register')}
            className="
            bg-blue-600 hover:bg-blue-700
            text-white font-semibold
            text-lg md:text-xl
            px-10 py-5 rounded-xl
            shadow-lg hover:shadow-xl
            transition-all duration-300
            transform hover:translate-y-1
            focus:outline-none focus-ring-4 focus:ring-blue-300"
        
            >Get Started</button>
    </div>
    )
}

export { Title,Description,Getstarted,Navbar }  