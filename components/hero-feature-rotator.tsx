"use client"

import { useEffect, useState } from "react"
import { Video, Building2, Plane, Stethoscope } from "lucide-react"

export function HeroFeatureRotator() {
  const features = [
    {
      title: "Connect with world-class hospitals for affordable treatments",
      icon: <Building2 className="h-6 w-6 text-primary" />,
    },
    {
      title: "Get virtual consultations with specialists worldwide",
      icon: <Video className="h-6 w-6 text-primary" />,
    },
    {
      title: "Find travel agents who handle all your logistics",
      icon: <Plane className="h-6 w-6 text-primary" />,
    },
    {
      title: "Access pre and post-treatment care from anywhere",
      icon: <Stethoscope className="h-6 w-6 text-primary" />,
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [features.length])

  return (
    <div className="relative h-full">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 flex items-center gap-2">
            {feature.icon}
            <span>{feature.title}</span>
          </p>
        </div>
      ))}
    </div>
  )
}
