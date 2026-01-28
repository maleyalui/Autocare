
function HowItWorks() {
    return (
        <div className="py-16">
            <div className="max-w-5xl mx-auto px-4">
                

                {/* Title */}
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    How it Works
                    </h2>

                {/*All 5 steps*/}
                    <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
                        
                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold mb-4 shadow-md">
                                1
                                </div>
                            <p className="text-lg font-medium text-gray-700">
                                Select Service

                            </p>
                        </div>
                    

                {/* Step 2 */}
                    <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold mb-4 shadow-md">
                                2
                                </div>
                            <p className="text-lg font-medium text-gray-700">
                                Choose Service

                            </p>
                        </div>

                        {/* Step 3 */}
                    <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold mb-4 shadow-md">
                                3
                                </div>
                            <p className="text-lg font-medium text-gray-700">
                                Make Payment

                            </p>
                        </div>

                        {/* Step 4 */}
            <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold mb-4 shadow-md">
              4
            </div>
            <p className="text-lg font-medium text-gray-700">
              Get Confirmation
            </p>
          </div>
                        {/* Step 5 */}
                    <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold mb-4 shadow-md">
                                5
                                </div>
                            <p className="text-lg font-medium text-gray-700">
                                Service Delivered
                            </p>
                        </div>
            </div>
        </div>
        </div>
    )
}

export default HowItWorks;