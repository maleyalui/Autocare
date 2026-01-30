import { useState } from "react";

function ServiceSelection() {
        //Separate state for each category  
        //General service is always active
    const [generalSelected,setGeneralSelected] = useState(true)
    const [oilsSelected,setOilsSelected] = useState(false)
    const [detailingSelected,setDetailingSelected] = useState(false)
    const [refuellingSelected,setRefuellingSelected] = useState(false)

// Determine which is active
let activeCategory = 'General Service';
if(oilsSelected) activeCategory= 'Oils & Fluids'
if(detailingSelected) activeCategory= 'Car Detailing'
if(refuellingSelected) activeCategory= 'On-site Refuelling'


    //Sub-options for each cat
    const Categoryoptions = {
        'General Service':[
        'Basic Service',
        'Standard Service',
        'Comprehensive Service',
        ],
        'Oils & Fluids': [
      'Engine Oil Change',
      'Brake Fluid Change',
      'Coolant Service',
    ],
        'Car Detailing': [
      'Car Wash',
      'Interior Detailing',
      'Full Detailing',
    ],
    'On-site Refuelling': [
      'Diesel Delivery (20L)',
      'Petrol Top-up',
      'Emergency Fuel Service',
    ],
  };

    //Options based on selected category
    const  currentOptions = Categoryoptions[activeCategory] || []

    //handlingclick
    const handleButtonClick = (buttonName) => {
        //Resets all false first
setGeneralSelected(false);
setOilsSelected(false);
setDetailingSelected(false);
setRefuellingSelected(false);

//Then, set the clicked button to true

if (buttonName === 'General Service') setGeneralSelected(true);
if (buttonName === 'Oils & Fluids') setOilsSelected(true);
if (buttonName === 'Car Detailing') setDetailingSelected(true);
if (buttonName === 'On-site Refuelling') setRefuellingSelected(true);

    };
    return (
        <section className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-200">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-3"
            ><span className="text-blue-600 font-bold text-3xl">1.</span>
            Service Selection</h3>

            {/* The buttons */}
            <div className="flex flex-wrap gap-4 mb-8">

                {/* General Service Button */}
                <button
                onClick={()=> handleButtonClick('General Service')}
            className="
             px-5 py-3 md:px-6 md:py-4
             rounded-xl font-medium
             bg-gray-100 text-gray-800 hover:outline 
             hover:outline-blue-700" >
                   General Service
                </button>

            {/* Oils & Fluids button */}
                <button
                onClick={()=> handleButtonClick('Oils & Fluids')}
                className="
             px-5 py-3 md:px-6 md:py-4
             rounded-xl font-medium
             bg-gray-100 text-gray-800 hover:outline 
             hover:outline-blue-700">
                    Oils & Fluids
                </button>

                {/* Car Detailing btn */}
                <button
                    onClick={()=> handleButtonClick('Car Detailing')}
             className="
             px-5 py-3 md:px-6 md:py-4
             rounded-xl font-medium
             bg-gray-100 text-gray-800 hover:outline 
             hover:outline-blue-700">
                    Car Detailing
                </button>

            {/* On-site refuelling  */}
                <button
                    onClick={()=> handleButtonClick('On-site Refuelling')}
             className="
             px-5 py-3 md:px-6 md:py-4
             rounded-xl font-medium
             bg-gray-100 text-gray-800 hover:outline 
             hover:outline-blue-700">
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
                hover:outline-blue-500
                text-base md:text-lg">
                    {/* 
                    In the website,the options will display when a button is
                     clicked,now oly general is default
                    */ }

                  {/*    <p>General Service</p>
                    <option>Basic Service</option>
                    <option>Standard Service</option>
                    <option>Comprehensive Service</option>

                        <p>Oils & Fluids</p> 
                    <option>Engine Oil Change</option>
                    <option>Coolant Service</option>
                    <option>Brake Fluid Change</option>

                     <p>Car Detailing</p>
                    <option>Car Wash</option>
                    <option>Interior Detailing</option>
                    <option>Full Detailing</option>

                    <p>On-site Refuellling</p> 
                    <option>Diesel Delivery(20L)</option>
                    <option>Petrol Top-up</option>
                    <option>Emergency Fuel Service</option>
                                                            */}


                        {currentOptions.map((option) => (
                            <option 
                            key={option}
                            value={option}>
                                {option}
                            </option>
                        ))}
                </select>
            </div>

        </section>
    )
}

export default ServiceSelection;