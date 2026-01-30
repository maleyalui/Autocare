function ChoosePackageStep({ selectedSpecific }) {
  // This is our list of all possible services and their packages
  const packages = {
    "Basic Service": {
      basic: {
        price: 49,
        features: [
          "At location",
          "Basic inspection",
          "Standard parts",
          "1-month warranty",
        ],
      },
      standard: {
        price: 79,
        features: [
          "At location",
          "Full inspection",
          "Quality parts",
          "3-month warranty",
          "Free pickup",
        ],
      },
      premium: {
        price: 119,
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

    "Standard Service": {
      basic: {
        price: 69,
        features: [
          "At location",
          "Basic inspection",
          "Standard parts",
          "2-month warranty",
        ],
      },
      standard: {
        price: 99,
        features: [
          "At location",
          "Full inspection",
          "Quality parts",
          "4-month warranty",
          "Free pickup",
        ],
      },
      premium: {
        price: 149,
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

    "Comprehensive Service": {
      basic: {
        price: 89,
        features: [
          "At location",
          "Full inspection",
          "Standard parts",
          "3-month warranty",
        ],
      },
      standard: {
        price: 129,
        features: [
          "At location",
          "Comprehensive check",
          "Quality parts",
          "6-month warranty",
          "Free pickup",
        ],
      },
      premium: {
        price: 199,
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

    "Engine Oil Change": {
      basic: {
        price: 35,
        features: ["Standard oil", "Oil filter", "1-month warranty"],
      },
      standard: {
        price: 55,
        features: [
          "Premium synthetic oil",
          "Oil filter",
          "3-month warranty",
          "Free check",
        ],
      },
      premium: {
        price: 85,
        features: [
          "Full synthetic high-performance",
          "Oil filter + flush",
          "6-month warranty",
          "Free pickup",
        ],
      },
    },

    "Diesel Delivery (20L)": {
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

    // you can add more services here later
  };

  // Get the right package info — if not found, use Basic Service
  let chosen = packages[selectedSpecific];
  if (!chosen) {
    chosen = packages["Basic Service"];
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-200">
      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
        <span className="text-blue-600 font-extrabold text-3xl md:text-4xl">
          3.
        </span>
        Choose Package
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic card */}
        <div className="border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition">
          <h4 className="text-xl font-bold mb-3">Basic</h4>
          <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            KSh {chosen.basic.price}
          </p>
          <ul className="text-left space-y-2 text-gray-700 text-sm">
            {chosen.basic.features.map((item, index) => (
              <li key={index}>✔ {item}</li>
            ))}
          </ul>
        </div>

        {/* Standard card - we make this one look special */}
        <div className="border-2 border-blue-600 rounded-2xl p-6 text-center bg-blue-50 shadow-lg relative">
          <div className="absolute -top-3 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Recommended
          </div>
          <h4 className="text-xl font-bold mb-3">Standard</h4>
          <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            KSh {chosen.standard.price}
          </p>
          <ul className="text-left space-y-2 text-gray-700 text-sm">
            {chosen.standard.features.map((item, index) => (
              <li key={index}>✔ {item}</li>
            ))}
          </ul>
        </div>

        {/* Premium card */}
        <div className="border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition">
          <h4 className="text-xl font-bold mb-3">Premium</h4>
          <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
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
