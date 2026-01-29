import BookingSummary from "./BookingSummary/BookingSummary";
import PackageSelection from "./PackageSelection/PackageSelection";
import VehicleLocation from "./VehicleLocation.jsx/VehicleLocation";
import ServiceSelection from "./ServiceSelection/ServiceSelection";
import BookingHeader from "./BookingHeader";
function BookingPage(){
    return(
        <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
            <div className="max-w-7xxl mx-auto px-4 sm:px-6 lh:px-8">
                <BookingHeader />

                <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
        
        <div className="lg:col-span-2 space-y-8 lg:space-y-12">
        <ServiceSelection />    
        <VehicleLocation />
        <PackageSelection />
        </div>

        <div className="lg-col-span-1 mt-8 lg:mt-0">
            <BookingSummary
  service="General Service"
  packageType="Standard Package"
  vehicle="Hatchback"
  location="Nairobi"
  price="2500"
/>
        </div>
        </div>
        </div>
        </section>
        
    )
}


export default BookingPage;