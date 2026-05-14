import HowItWorks from "./Header/Features/HowItWorksSection";
import HeroImage from "./Header/Features/Image.jsx/HeroImage";
import Header from "./Header/Header"
import { Navbar } from "./Header/About";

function LandingPage() {
    return ( <div>

            <Navbar />
            <Header />
            <HeroImage />
            <HowItWorks />
        
    </div>)
}

export default LandingPage;