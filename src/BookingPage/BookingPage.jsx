import BookingSummary from "./BookingSummary/BookingSummary";
import PackageSelection from "./PackageSelection/PackageSelection";
import VehicleLocation from "./VehicleLocation.jsx/VehicleLocation";
import ServiceSelection from "./ServiceSelection/ServiceSelection";

function BookingPage(){
    return(
        <>
        <ServiceSelection />    
        <VehicleLocation />
        <PackageSelection />
        <BookingSummary />    

        </>
    )
}