import BookingSummary from "./BookingSummary/BookingSummary";
import PackageSelection from "./PackageSelection/PackageSelection";
import VehicleLocation from "./VehicleLocation.jsx/VehicleLocation";
import ServiceSelection from "./ServiceSelection/ServiceSelection";
import BookingHeader from "./BookingHeader";
import { useState } from "react";
import BookingPopup from "./BookingPopup";

function BookingPage({onVehicleChange, onLocationChange}){
    const [service, setService]= useState("General Service");
    const [showPopup, setShowPopup] = useState(false);
    const [vehicle, setVehicle] = useState("");
    const [location, setLocation] = useState("");
    const [packageType, setPackageType] = useState("");
    const [price, setPrice] = useState("");
    const [selectedSpecific, setSelectedSpecific] = useState("Basic Service")

    const[selectedPackage, setSelectedPackage] = useState("")
    return (
  <>
    {/* MAIN PAGE */}

    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <BookingHeader />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <ServiceSelection 
            setService={setService}
            setSelectedSpecific={setSelectedSpecific}
            selectedSpecific={selectedSpecific} />

            <VehicleLocation 
            onVehicleChange= {(value) => setVehicle(value)}
            onLocationChange= {(value) => setLocation(value)}/>

            <PackageSelection 
            setPackageType={setPackageType}
            setPrice={setPrice}
            setSelectedPackage={setSelectedPackage}
            selectedPackage={selectedPackage}
            selectedSpecific={selectedSpecific}
            />
          </div>

          <BookingSummary
            service={service}
            packageType={packageType}
            vehicle={vehicle}
            location={location}
            price= {price}
            setShowPopup={setShowPopup}
          />
        </div>
      </div>
    </section>

    {/* POPUP FLOATS ABOVE EVERYTHING */}
    {showPopup && (
      <BookingPopup
        service={service}
        packageType={packageType}
        price={price}
        setShowPopup={setShowPopup}
      />
    )}
  </>
);
}
       
export default BookingPage;