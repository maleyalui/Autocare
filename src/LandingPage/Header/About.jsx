function Title() {
return (
    <div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">Auto Care</h1>
        </div>
)
}

function Description() {
    return (
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Professional vehicle maintenance and repair services at your doorstep.<br className="hidden sm:block" />
          Book trusted mechanics and repair services in minutes and keep your vehicle in perfect condition.
        </p>
    )
}

function Getstarted(){
    return(<div className="flex justify-center">
        
            <button
            className="
            bg-blue-600 hover:bg-blue-700
            text-white font-semibold
            text-lg md:text-xl
            px-10 py-5 rounded-xl
            shadow-lg hover:shadow-xl
            transition-all duration-300
            transform hover:translate-y-1
            focus:outline-none focus-ring-4 focus:ring-blue-300"
        
            >Get Started</button>
    </div>
    )
}

export {Title,Description,Getstarted};