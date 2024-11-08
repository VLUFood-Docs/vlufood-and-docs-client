import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import { MapPin, StarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

import DefaultRestaurantImg from '@/public/images/introduce-2.png'
import { useRouter } from 'next/navigation'
import { User as Restaurant } from '@prisma/client'

interface RestaurantCardType {
  className?: string
  restaurant: Restaurant
}

export default function RestaurantCard({ className, restaurant }: RestaurantCardType) {
  const router = useRouter()
  const { restaurantName, restaurantDescription, id } = restaurant
  return (
    <div className="relative">
      <div className="absolute top-2 left-2 w-[66px] h-[24px] bg-green-500 text-white flex items-center justify-center rounded">Promo</div>
      <Card className={cn('min-w-[380px] w-[380px] cursor-pointer', className)} onClick={() => router.push(`/view/restaurant/${id}`)}>
        <CardHeader className="p-0">
          <Image
            src={DefaultRestaurantImg}
            alt="Restaurant-image"
            className="w-full h-[205px] object-cover rounded-t-sm"
            width={400}
            height={205}
          />
          <CardContent className="flex flex-col gap-2 items-start">
            <p className="text-center text-2xl font-bold">{restaurantName || 'Nhà hàng ABC'}</p>
            <p className="text-center text-lg">{restaurantDescription || 'Cơm, phở, bún bò,...'}</p>
            <div className="flex justify-around gap-4">
              <div className="flex items-center gap-2">
                <StarIcon />
                <p>{5.0}</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin />
                <p>15 phút - 500m</p>
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}
