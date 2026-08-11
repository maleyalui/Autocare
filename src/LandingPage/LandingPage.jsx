import HowItWorks from "./Header/Features/HowItWorksSection";
import Header from "./Header/Header"
import { Navbar } from "./Header/About";
import ReviewSlideshow from "./Header/Features/Image.jsx/HeroImage";

function LandingPage() {
    return ( 
    <div>

            <Navbar />
            <Header />
        <section className="px-10 py-20 bg-white">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                What Drivers Say
            </h2>
            <p className="text-center text-gray-500 mb-10">
                Real experience from Auto CAre users across Nairobi 
            </p>
            <ReviewSlideshow />
            </section>
            <HowItWorks />
        
    </div>)
}

export default LandingPage;