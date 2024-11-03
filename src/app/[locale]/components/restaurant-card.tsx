import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import { MapPin, StarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

import HeroGif from '@/public/images/hero.gif'
import { Restaurant } from '@/types/restaurant'
import { useRouter } from 'next/navigation'

interface RestaurantCardType {
  className?: string
  restaurant: Restaurant
}

export default function RestaurantCard({ className, restaurant }: RestaurantCardType) {
  const router = useRouter()
  const { id, name, description, rating, time, distance, image, promo } = restaurant
  return (
    <div className="relative">
      {promo && (
        <div className="absolute top-2 left-2 w-[66px] h-[24px] bg-green-500 text-white flex items-center justify-center rounded">
          Promo
        </div>
      )}
      <Card className={cn('min-w-[425px] w-[425px] cursor-pointer', className)} onClick={() => router.push(`/view/restaurant/${id}`)}>
        <CardHeader className="p-0">
          <Image
            src={image || HeroGif}
            alt="Restaurant-image"
            className="w-full h-[205px] object-cover rounded-t-sm"
            width={400}
            height={205}
          />
          <CardContent className="flex flex-col gap-2">
            <p className="text-center text-2xl font-bold">{name}</p>
            <p className="text-center text-lg">{description}</p>
            <div className="flex justify-around">
              <div className="flex items-center gap-2">
                <StarIcon />
                <p>{rating}</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin />
                <p>
                  {time} - {distance}
                </p>
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}
