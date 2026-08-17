import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const reviews = [
    {
        name: "Nelson Romeo",
        Location: "Westlands",
        review: "My car broke down at 9pm and within 20 minutes a mechanic was at my location. Incredible service.",
        stars: 5,
        initial: "NR"
    },
    {
        name: "Mitchelle Wanjiku",
        Location: "Kilimani",
        review: "Found a car wash near me in seconds. Door to door service - they came to my apartment and cleaned my car. Amazing!",
        stars: 5,
        initial: "MW"
    },
    {
        name: "Darren Santos",
        Location: "Karen",
        review: "Amazing work!",
        stars: 5,
        initial: "DS"
    },
    {
        name: "Jacob Bowa",
        Location: "Kileleshwa",
        review: "Connected me to a specialised mechanic in Kileleshwa. Incredible app.",
        stars: 5,
        initial: "JB"
    },
    {
        name: "Stewart Ochieng",
        Location: "Kileleshwa",
        review: "Booked a full engine diagnostic through the app. The center was profesional and the price was excatly what was listed.",
        stars: 5,
        initial: "SO"
    },
    {
        name: "Judy Wanjiru",
        Location: "Lavington",
        review: "I was able to book a mechanic for my car breakdown in less than 10 minutes. The mechanic was very professional and the price was fair.",
        stars: 5,
        initial: "JW"
    },
    {
        name: "Brian Mwangi",
        Location: "Ngong Road",
        review: "I needed a car wash and found a nearby service through the app. The service was fast and my car looks brand new!",
        stars: 5,
        initial: "BM"
    }
]

function ReviewSlideshow() {
    const [current, setCurrent] = useState(0)
    const [animating, setAnimating] = useState(false)

    // Auto slide every 4 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            goToNext()
        }, 4000)
        return () => clearInterval(timer)
    }, [current])

    const goToNext = () => {
        setAnimating(true)
        setTimeout(() => {
            setCurrent(prev => (prev + 1) % reviews.length)
            setAnimating(false)
        }, 300)
    }

    const goToPrev = () => {
        setAnimating(true)
        setTimeout(() => {
            setCurrent(prev => (prev - 1 + reviews.length) % reviews.length)
            setAnimating(false)
        }, 300)
    }

    const review = reviews[current]

    return (
        <div className="relative bg-orange-50 rounded-2xl p-8 max-w-2xl mx-auto">

        {/*Review card*/}
        <div
          className={`transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4 justify-center">
                {[...Array(review.stars)].map((_, i) => (
                    <span key={i} className="text-orange-400 text-xl">★</span>
                ))}
            </div>

            {/* Review Text */}
            <p className="text-center text-gray-700 text-lg italic mb-6 leading-relaxed">
                "{review.review}"
            </p>

            {/* Reviewer */}
            <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
                    {review.initial}
                </div>
            </div>
            <div>
            <p className="font-semibold text-gray-800 text-sm">{review.name}</p>
            <p className="text-gray-400 text-xs">{review.location}, Nairobi</p>
            </div>
            </div>
            

            {/* Prev/ Next buttons*/}
        <button
            onClick={goToNext}
            classname="absolute left-3 top 1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-gray-500 hover:text-orange-500 transition"
            >
            ›
        </button>

        <button
            onClick={goToPrev}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-gray-500 hover:text-orange-500 transition"
            >
            ‹
        </button>

            {/*Dots*/}
            <div className="flex justify-center gap-2 mt-6">
                {reviews.map((_, i) => (
                    <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
              i === current ? 'bg-orange-500 w-4' : 'bg-gray-300'
            }`}
            />
            ))}
            </div>
        </div>
        )
    }

export default ReviewSlideshow 
