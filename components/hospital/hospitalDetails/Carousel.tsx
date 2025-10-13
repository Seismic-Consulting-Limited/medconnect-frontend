'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

type CarouselProps = {
  images: string[]
  autoPlay?: boolean
  interval?: number
}

const Carousel: React.FC<CarouselProps> = ({ images, autoPlay = true, interval = 4000 }) => {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length)

  // Autoplay effect
  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(nextSlide, interval)
    return () => clearInterval(timer)
  }, [current, autoPlay, interval])

  // Helper to wrap index properly
  const getImageIndex = (offset: number) =>
    (current + offset + images.length) % images.length

  return (
    <div className="relative w-full overflow-hidden py-10 flex items-center justify-center">
      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 z-20 bg-white/80 hover:bg-white p-2 sm:p-3 rounded-full shadow"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
      </button>

      {/* Images Wrapper */}
      <div className="flex w-full max-w-[1400px] items-center justify-center relative px-2 sm:px-6">
        {/* Left (partially visible) */}
        <motion.div
          key={getImageIndex(-1)}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.8, x: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-[70%] sm:w-[50%] md:w-[40%] lg:w-[35%] aspect-[16/9] -mr-[8%] sm:-mr-[10%]"
        >
          <Image
            src={images[getImageIndex(-1)]}
            alt="left-image"
            fill
            className="object-cover rounded-[16px] sm:rounded-[20px] opacity-90"
          />
        </motion.div>

        {/* Center (active) */}
        <motion.div
          key={getImageIndex(0)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-20 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[55%] aspect-[16/9] shadow-lg"
        >
          <Image
            src={images[getImageIndex(0)]}
            alt="center-image"
            fill
            className="object-cover rounded-[18px] sm:rounded-[24px]"
          />
        </motion.div>

        {/* Right (partially visible) */}
        <motion.div
          key={getImageIndex(1)}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.8, x: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-[70%] sm:w-[50%] md:w-[40%] lg:w-[35%] aspect-[16/9] -ml-[8%] sm:-ml-[10%]"
        >
          <Image
            src={images[getImageIndex(1)]}
            alt="right-image"
            fill
            className="object-cover rounded-[16px] sm:rounded-[20px] opacity-90"
          />
        </motion.div>
      </div>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 z-20 bg-white/80 hover:bg-white p-2 sm:p-3 rounded-full shadow"
      >
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
      </button>
    </div>
  )
}

export default Carousel
