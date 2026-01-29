function ServiceSelection() {
    return (
        <section className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-200">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-3"
            ><span className="text-blue-600 font-bold text-3xl">1.</span>
            Service Selection</h3>

                {/* The buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
                <button
                className="
                bg-gray-100 text-gray-800
                px-5 py-3 md:px-6 md:py-4
                rounded-xl font-medium
                hover:bg-gray-200
                hover:outline-2
                hover:outline-blue-500">
                    General Service
                </button>

                <button
                className="
                bg-gray-100 text-gray-800
                px-5 py-3 md:px-6 md:py-4
                rounded-xl font-medium
                hover:bg-gray-200
                hover:outline-2
                hover:outline-blue-500">
                    Oils & Fluids
                </button>

                <button
                className="
                
                bg-gray-100 text-gray-800
                px-5 py-3 md:px-6 md:py-4
                rounded-xl font-medium
                hover:bg-gray-200
                hover:outline-2
                hover:outline-blue-500">
                    Car Detailing
                </button>

                <button
                className="
                
                bg-gray-100 text-gray-800
                px-5 py-3 md:px-6 md:py-4
                rounded-xl font-medium
                hover:bg-gray-200
                hover:outline-2
                hover:outline-blue-500">
                    On-site Refuelling
                </button>
            </div>

            {/* Choose Specific service */}
            <div>
                <label className="block text-gray-700 font-semibold text-lg mb-3">
                    Choose specific service
                </label>

                <select 
                className="
                w-full p-4 pr-12
                 border-gray-300
                rounded-xl text-gray-700
                outline:hidden
                hover:outline-blue-500
                text-base md:text-lg">
                    {/* 
                    In the website,the options will display when a button is
                     clicked,now oly general is default
                    */ }
                      {/* General Service */}
                    <option>Basic Service</option>
                    <option>Standard Service</option>
                    <option>Comprehensive Service</option>
                
                        {/* Oils & Fluids */}
                    <option>Engine Oil Change</option>
                    <option>Coolant Service</option>
                    <option>Brake Fluid Change</option>

                    {/* Car Detailing */}
                    <option>Car Wash</option>
                    <option>Interior Detailing</option>
                    <option>Full Detailing</option>

                    {/* On-site Refuellling */}
                    <option>Diesel Delivery(20L)</option>
                    <option>Petrol Top-up</option>
                    <option>Emergency Fuel Service</option>

                </select>
            </div>

        </section>
    )
}

export default ServiceSelection;