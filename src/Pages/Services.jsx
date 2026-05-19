import { useNavigate } from "react-router-dom";

function Services() {
    const navigate = useNavigate();


    //get user from local storage
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        navigate("/login");
    }

    const services = [
    {
        title: "General Service",
        description: "Routine maintainance like oil change, tyre rotation, and brake service",
        color: "blue",
        route: "/general-service",
    },
    {
        title: 'Car Detailing',
        description:'Comprehensive cleaning, polishing, and waxing for a like-new finish',
        color: 'purple',
        route: "/car-detailing",
    },
    {
        title: 'Diagnostics',
        description:'Full engine scan and OBD diagnostics',
        color: 'green',
        route: "/diagnostics",
    },
    {
        title: 'Emergency Service',
        description:'Accident, breakdown,battery dead or out of fuel',
        color: 'red',
        route: "/emergency",
    }
    ];

    const getColorClasses = (color) => {
        switch (color) {
            case "blue":
                return { 
                    border: "border-blue-500",
                    hover: "hover:border-blue-600 hover:bg-blue-50",
                    bg: "bg-blue-600",
                    light: "bg-blue-100"
                };

            case "purple":
                return {
                    border: "border-purple-500",
                    hover: "hover:border-purple-600 hover:bg-purple-50",
                    bg: "bg-purple-600",
                    light: "bg-purple-100"
                };

            case "green":
                return {
                    border: "border-green-500",
                    hover: "hover:border-green-600 hover:bg-green-50",
                    bg:"bg-green-600",
                    light:"bg-green-100"
                };

            case "red":
                return {
                    border: "border-red-500",
                    hover: "hover:border-red-600 hover:bg-red-50",
                    bg:"bg-red-600",
                    light:"bg-red-100"
                };

            default:
                return {
                    border: "border-gray-300",
                    hover: "hover:border-gray-400",
                    bg:"bg-gray-600",
                    light:"bg-gray-100"
                };
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
    }
return (
    <div className="min-h-screen">
            
            <div className="max-w-6xl mx-auto px-6 py-10">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {services.map((service) => {
                    const colors = getColorClasses(service.color);
        
                return (
                    <div
                        key={service.title}
                        className={`bg-white rounded-3xl p-7 shadow-sm flex flex-col justify-between transition hover:shadow-lg ${colors.border} ${colors.hover}`}
                    > 
                
                        <div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        {service.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-500 text-sm mb-8">
                        {service.description}
                    </p>
                </div> 

                {/* Button */}
                <button
                    onClick={() => navigate(service.route)}
                    className="w-full py-3 bg-blue-900 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                    >
                
                     Select Service

                </button>
            </div>
        );
        })}
            </div>
        </div>
        </div>
    );
};
export default Services;