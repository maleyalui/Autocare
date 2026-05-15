function ProviderCard({ name, phone, address, features, price, mapUrl, priceLabel }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
      <div>
        {/* Name */}
        <h3 className="text-lg font-bold text-gray-800 mb-1">{name}</h3>

        {/* Address */}
        {address && (
          <p className="text-sm text-gray-400 mb-3">{address}</p>
        )}

        {/* Price */}
        {price && (
          <p className="text-sm font-semibold text-orange-500 mb-3">
            {priceLabel || 'From'} KES {price}
          </p>
        )}

        {/* Features */}
        {features && (
          <div className="mb-4">
            <p className="text-xs text-gray-400 uppercase mb-2">Features</p>
            <div className="flex flex-wrap gap-2">
              {features.split(',').map((f, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full"
                >
                  {f.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Phone */}
        <p className="text-sm text-gray-500 mb-4"> {phone}</p>
      </div>

      {/* Get Directions Button */}
      {mapUrl ? (
        <a
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
          className="block w-full py-3 bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded-lg transition text-center text-sm"
        >
          Get Directions
        </a>
      ) : (
        <button className="w-full py-3 bg-gray-200 text-gray-400 rounded-lg text-sm cursor-not-allowed">
          No directions available
        </button>
      )}
    </div>
  )
}

export default ProviderCard