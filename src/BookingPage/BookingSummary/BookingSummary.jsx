function BookingSummary(props) {

     console.log("BookingSummary received:", {
    service: props.service,
    packageType: props.packageType,
    price: props.price,
    vehicle: props.vehicle,
    location: props.location,
  });

    return (
        <section className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-100 lg:sticky lg:top-8">
            <h3 className="text-2xl font-semibold mb-8 text-center text-gray-800"
            >Booking Summary</h3>

      <div className="space-y-4 text-gray-700 text-sm">
        <div className="flex justify-between">
          <span className="font-medium">Service:</span>
          <span>{props.service}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Package:</span>
          <span>{props.packageType}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Vehicle:</span>
          <span>{props.vehicle}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Location:</span>
          <span>{props.location}</span>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between text-base font-semibold text-gray-900">
          <span>Total:</span>
          <span>Ksh {props.price}</span>
        </div>
      </div>

      <button 
       onClick={() => props.setShowPopup(true)}
      className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
        Pay Now
      </button>
</section>
    )
}

export default BookingSummary;