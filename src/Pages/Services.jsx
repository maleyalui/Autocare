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
        border: "border-blue-500",
        text: "hover:text-white",
        route: "/GeneralService",
    },
    {
        title: 'Car Detailing',
        description:'Comprehensive cleaning, polishing, and waxing for a like-new finish',
        border:'border-purple-500',
        text:'hover:text-white',
        route: "/CarDetailing",
    },
    {
        title: 'Diagnostics',
        description:'Full engine scan and OBD diagnostics',
        border:'border-green-500',
        text:'hover:text-white',
        route: "/Diagnostics",
    },
    {
        title: 'Emergency Service',
        description:'Accident, breakdown,battery dead or out of fuel',
        border:'border-red-500',
        text:'hover:text-white',
        route: "/EmergencyService",
    }
    ];
return (
    <div className="min-h-screen bg-blue-50">
    <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => {
        return (
        <div
            key={service.title}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between"> 
            <div>
            {/* Title */}
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {service.title}
                </h2>

            {/* Description */}
                <p className="text-gray-500 text-sm mb-6">
                    {service.description}
                </p>
        </div> 
            {/* Button */}
            <button
                onClick={() => navigate(service.route)}
                className="w-full py-3 bg-blue-900 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
                Select Service
                </button>
        </div>
        )
        })}
    </div>
    </div>
    </div>
)
}

export default Services;