"use client"

import { useState, useEffect } from "react"

type CarouselItem = {
  image: string
  title: string
  description: string
}

export function HeroCarousel() {
  const items: CarouselItem[] = [
    {
      image: "/modern-hospital-consultation.png",
      title: "Medical Tourism",
      description: "Find world-class hospitals abroad at a fraction of the cost",
    },
    {
      image: "/telehealth-consultation.png",
      title: "Telemedicine",
      description: "Connect with specialists worldwide through secure video consultations",
    },
    {
      image: "/bangkok-hospital-exterior.png",
      title: "Global Network",
      description: "Access top hospitals in Thailand, India, Singapore, and more",
    },
    {
      image: "/modern-hospital-exterior.png",
      title: "Travel Support",
      description: "Let our agents handle your travel logistics and local assistance",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
        setIsTransitioning(false)
      }, 500) // Reverted back to 500ms
    }, 5000) // Reverted back to 5000ms

    return () => clearInterval(interval)
  }, [items.length])

  const currentItem = items[currentIndex]

  return (
    <div className="relative overflow-hidden">
      <div className={`transition-opacity duration-500 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        <div className="relative aspect-[4/3] w-full">
          <img
            src={currentItem.image || "/placeholder.svg"}
            alt={currentItem.title}
            className="object-cover w-full h-full rounded-lg"
          />

          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
          <h3 className="font-medium text-lg">{currentItem.title}</h3>
          <p className="text-white/90 text-sm">{currentItem.description}</p>
        </div>
      </div>

      <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-white w-6" : "bg-white/40"}`}
            onClick={() => {
              setIsTransitioning(true)
              setTimeout(() => {
                setCurrentIndex(index)
                setIsTransitioning(false)
              }, 500)
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
