function BookingPopup({ service, packageType, price, setShowPopup }) {
  return (
    <>
      {/* light background overlay */}
      <div
        onClick={() => setShowPopup(false)}
        className="fixed inset-0 bg-gray-900 bg-opacity-30"
      ></div>

      {/* popup card */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-80 p-6 rounded-lg shadow-lg">
        
        <h2 className="text-center text-lg font-semibold mb-4 text-gray-800">
          Booking Confirmed
        </h2>

        <div className="text-sm text-gray-700 space-y-2 mb-4 text-semibold">
          <p>
            <span className="font-medium">Service:</span> {service}
          </p>
          <p>
            <span className="font-medium">Package:</span> {packageType}
          </p>
          <p>
            <span className="font-medium">Total:</span> Ksh {price}
          </p>
        </div>

        <button
          onClick={() => setShowPopup(false)}
          className="
          w-full bg-blue-500
           text-white py-2 rounded-md
           hover:bg-blue-700"
        >
          Book Another Service
        </button>

        <div className="text-center items-center p-4">
            <h3>Thank You for choosing us.</h3>
        </div>
      </div>
    </>
  );
}

export default BookingPopup;
