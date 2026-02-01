function ChoosePackageStep({
  selectedSpecific,
  setPackageType,
  setPrice,
  selectedPackage,
  setSelectedPackage,
}) {


  // This is our list of all possible services and their packages
  const packages = {
    // Basic Service selected
    "Basic Service": {
      basic: {
        price: 350,
        features: [
          "At location",
          "Basic inspection",
          "Standard parts",
          "1-month warranty",
        ],
      },
      standard: {
        price: 700,
        features: [
          "At location",
          "Full inspection",
          "Quality parts",
          "3-month warranty",
          "Free pickup",
        ],
      },
      premium: {
        price: 1560,
        features: [
          "At location",
          "Diagnostic scan",
          "Premium parts",
          "6-month warranty",
          "Free pickup",
          "24/7 support",
        ],
      },
    },
    //Standard Service selected
    "Standard Service": {
      basic: {
        price: 450,
        features: [
          "At location",
          "Basic inspection",
          "Standard parts",
          "2-month warranty",
        ],
      },
      standard: {
        price: 900,
        features: [
          "At location",
          "Full inspection",
          "Quality parts",
          "4-month warranty",
          "Free pickup",
        ],
      },
      premium: {
        price: 1700,
        features: [
          "At location",
          "Diagnostic scan",
          "Premium parts",
          "8-month warranty",
          "Free pickup",
          "24/7 support",
        ],
      },
    },

    //Comprehensive service selected
    "Comprehensive Service": {
      basic: {
        price: 600,
        features: [
          "At location",
          "Full inspection",
          "Standard parts",
          "3-month warranty",
        ],
      },
      standard: {
        price: 800,
        features: [
          "At location",
          "Comprehensive check",
          "Quality parts",
          "6-month warranty",
          "Free pickup",
        ],
      },
      premium: {
        price: 1900,
        features: [
          "At location",
          "Full diagnostic",
          "Premium parts",
          "12-month warranty",
          "Free pickup",
          "24/7 support",
          "Priority booking",
        ],
      },
    },
    //Engine Oil Change Selected
    "Engine Oil Change": {
      basic: {
        price: 550,
        features: ["Standard oil", "Oil filter", "1-month warranty"],
      },
      standard: {
        price: 750,
        features: [
          "Premium synthetic oil",
          "Oil filter",
          "3-month warranty",
          "Free check",
        ],
      },
      premium: {
        price: 950,
        features: [
          "Full synthetic high-performance",
          "Oil filter + flush",
          "6-month warranty",
          "Free pickup",
        ],
      },
    },

    //Brake Fluid Change
    "Brake Fluid Change": {
      basic: {
        price: 600,
        features: ["Standard oil", "Oil filter", "1-month warranty"],
      },
      standard: {
        price: 750,
        features: ["Premium synthetic oil", "3-month warranty", "Free check"],
      },
      premium: {
        price: 1050,
        features: [
          "Full synthetic high-performance",
          "Brake Fluid + flush",
          "6-month warranty",
          "Free pickup",
        ],
      },
    },

    //Diesel Delivery 20litres Selected

    "Diesel Delivery (20L)": {
      basic: {
        price: 5500,
        features: ["20L diesel", "Delivery to location", "No warranty"],
      },
      standard: {
        price: 6300,
        features: [
          "20L premium diesel",
          "Delivery + quality check",
          "1-week quality guarantee",
        ],
      },
      premium: {
        price: 6900,
        features: [
          "20L premium diesel",
          "Delivery + fuel test",
          "2-week guarantee",
          "Priority delivery",
        ],
      },
    },

    //Coolant Service Selected
    "Coolant Service": {
      basic: {
        price: 1200,
        features: ["20L diesel", "Delivery to location", "No warranty"],
      },
      standard: {
        price: 1400,
        features: [
          "20L premium diesel",
          "Delivery + quality check",
          "1-week quality guarantee",
        ],
      },
      premium: {
        price: 1700,
        features: [
          "20L premium diesel",
          "Delivery + fuel test",
          "2-week guarantee",
          "Priority delivery",
        ],
      },
    },

    //Car Wash Selected
    "Car Wash": {
      basic: {
        price: 400,
        features: ["Basic Wash", "At the Serve Station", "Free Sticker"],
      },
      standard: {
        price: 1000,
        features: ["Standard Wash", "Waxing", "1-month quality guarantee"],
      },
      premium: {
        price: 1700,
        features: [
          "Premium Wash",
          "At home Services",
          "12-months quality guarantee",
          "Priority delivery",
          "Waxing & Polish",
        ],
      },
    },

    //Interior Detailing Selected
    "Interior Detailing": {
      basic: {
        price: 600,
        features: ["Basic Wash", "At the Serve Station", "Free Sticker"],
      },
      standard: {
        price: 1000,
        features: ["Standard Wash", "Polish", "1-month quality guarantee"],
      },
      premium: {
        price: 1800,
        features: [
          "Premium Wash",
          "At home Services",
          "12-months quality guarantee",
          "Interior renovation",
          "Waxing & Polish",
        ],
      },
      // you can add more services here later
    },

    //Full Detailing Selected
    "Full Detailing": {
      basic: {
        price: 800,
        features: ["Basic Wash", "At the Serve Station", "Free Sticker"],
      },
      standard: {
        price: 1200,
        features: [
          "Standard Wash",
          "Polish",
          "1-month quality guarantee",
          "Vent Cleaning",
        ],
      },
      premium: {
        price: 3500,
        features: [
          "Premium Wash",
          "At home Services",
          "12-months quality guarantee",
          "Interior renovation",
          "Waxing & Polish",
          "Vent Cleaning",
        ],
      },
      // you can add more services here later
    },

    //Petrol Top-up selected
    "Petrol Top-up": {
      basic: {
        price: 6000,
        features: ["20L Petrol", "Delivery to location", "No warranty"],
      },
      standard: {
        price: 6500,
        features: [
          "20L premium petrol",
          "Delivery + quality check",
          "1-week quality guarantee",
        ],
      },
      premium: {
        price: 7200,
        features: [
          "20L premium petrol",
          "Delivery + fuel test",
          "2-week guarantee",
          "Priority delivery",
        ],
      },
    },

    //Emergency Fuel Service selected
    "Emergency Fuel Service": {
      basic: {
        price: 1500,
        features: ["20L Petrol/Diesel", "Delivery to location", "No warranty"],
      },
      standard: {
        price: 2500,
        features: [
          "20L premium pertol/diesel",
          "Delivery + quality check",
          "1-week quality guarantee",
        ],
      },
      premium: {
        price: 5000,
        features: [
          "20L premium petrol/diesel",
          "Delivery + fuel test",
          "2-week guarantee",
          "Priority delivery",
        ],
      },
    },
  };

  // Get the right package info — if not found, use Basic Service
  let chosen = packages[selectedSpecific];
  if (!chosen) {
    chosen = packages["Basic Service"];
  }

  const handleSelect = (level) => {
    setSelectedPackage(level); // for visual highlight
    setPackageType(level); // "basic", "standard" or "premium"
    setPrice(chosen[level].price); // update price in parent
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-200">
      <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900 flex items-center gap-3">
        <span className="text-blue-600 text-3xl md:text-4xl">3.</span>
        Choose Package
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 
         Here by using the condition? true:false we select the service
        */}

        {/* Basic Card */}

        <div
          onClick={() => handleSelect("basic")}
          className={`border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition

          ${
            selectedPackage === "basic"
              ? "border-blue-600 bg-blue-50 shadow-xl"
              : "border-gray-200 hover:shadow-lg hover:border-blue-300"
          }`}
        >
          <h4 className="text-xl font-bold mb-3">Basic</h4>
          <p className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
            KSh {chosen.basic.price}
          </p>
          <ul className="text-left space-y-2 text-gray-700 text-sm">
            {chosen.basic.features.map((item, index) => (
              <li key={index}>✔ {item}</li>
            ))}
          </ul>
        </div>

        {/* Standard card - we make this one look special with recommended display */}
        <div
          onClick={() => handleSelect("standard")}
          className={`border-2 border-blue-600 rounded-2xl p-6 text-center bg-blue-50 shadow-lg relative
        ${selectedPackage === "standard" ? "ring-4 ring-blue-300" : ""}`}
        >
          <div className="absolute -top-3 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Recommended
          </div>
          <h4 className="text-xl font-bold mb-3">Standard</h4>
          <p className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
            KSh {chosen.standard.price}
          </p>
          <ul className="text-left space-y-2 text-gray-700 text-sm">
            {chosen.standard.features.map((item, index) => (
              <li key={index}>✔ {item}</li>
            ))}
          </ul>
        </div>

        {/* Premium card */}
        <div
          onClick={() => handleSelect("premium")}
          className={`border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition

          ${
            selectedPackage === "premium"
              ? "border-blue-600 bg-blue-50 shadow-xl"
              : "border-gray-200 hover:shadow-lg hover:border-blue-300"
          }`}
        >
          <h4 className="text-xl font-bold mb-3">Premium</h4>
          <p className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
            KSh {chosen.premium.price}
          </p>
          <ul className="text-left space-y-2 text-gray-700 text-sm">
            {chosen.premium.features.map((item, index) => (
              <li key={index}>✔ {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ChoosePackageStep;
