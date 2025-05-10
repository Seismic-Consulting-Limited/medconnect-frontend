"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Heart } from "lucide-react"

interface Hospital {
  id: string
  name: string
  location: string
  country: string
  rating: number
  specialties: string[]
  image: string
  match: number
}

interface RecommendedHospitalsProps {
  hospitals: Hospital[]
  isLoading?: boolean
}

export function RecommendedHospitals({ hospitals, isLoading = false }: RecommendedHospitalsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
          <CardDescription>Based on your preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (hospitals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
          <CardDescription>Based on your preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">Complete your profile to get personalized hospital recommendations</p>
            <Button>Update Preferences</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended for You</CardTitle>
        <CardDescription>Based on your preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {hospitals.map((hospital) => (
            <div key={hospital.id} className="flex gap-4 border-b pb-4 last:border-0 last:pb-0">
              <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                <Image src={hospital.image || "/placeholder.svg"} alt={hospital.name} fill className="object-cover" />
                <Badge className="absolute top-1 right-1 bg-blue-500">{hospital.match}% Match</Badge>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{hospital.name}</h3>
                  <button className="text-gray-400 hover:text-red-500">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                  <MapPin className="h-3 w-3" />
                  <span>
                    {hospital.location}, {hospital.country}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(hospital.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{hospital.rating.toFixed(1)}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {hospital.specialties.slice(0, 2).map((specialty) => (
                    <Badge key={specialty} variant="outline" className="text-xs font-normal">
                      {specialty}
                    </Badge>
                  ))}
                  {hospital.specialties.length > 2 && (
                    <Badge variant="outline" className="text-xs font-normal">
                      +{hospital.specialties.length - 2} more
                    </Badge>
                  )}
                </div>
                <div className="mt-2">
                  <Link href={`/hospital/${hospital.id}`}>
                    <Button size="sm" variant="link" className="p-0 h-auto text-blue-600">
                      View Hospital
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          View All Recommendations
        </Button>
      </CardContent>
    </Card>
  )
}
