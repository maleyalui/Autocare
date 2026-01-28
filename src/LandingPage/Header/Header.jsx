import { Title,Description,Getstarted } from "./About"

function Header() {
    return (
        <div className="px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
                <Title />
                <Description />
                <Getstarted />
            
            </div>
        </div>
    )
}

export default Header;