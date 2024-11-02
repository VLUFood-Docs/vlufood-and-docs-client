import Label from '@/components/label'
import { Card, CardContent } from '@/components/ui/card'
import { cn, formatPrice } from '@/lib/utils'
import { Food } from '@/types/food'
import { PlusIcon } from 'lucide-react'
import Image from 'next/image'

interface FoodCardType {
  className?: string
  food: Food | null
}

export default function FoodCard({ className, food }: FoodCardType) {
  return (
    <Card className={cn('min-w-[500px] w-[500px] max-h-[200px] h-[200px] relative', className)}>
      <div className="absolute bottom-2 right-2">
        <PlusIcon className="w-[48px] h-[48px] hover:bg-green-900 hover:w-[52px] hover:h-[52px] rounded-full bg-green-500 text-white" />
      </div>
      <CardContent className="flex gap-2 items-center justify-center">
        <Image
          src={food?.images?.[0] || ''}
          alt="Hình ảnh thức ăn"
          width={150}
          height={150}
          className="w-[150px] h-[150px] object-cover rounded-sm"
        />
        <div className="flex flex-col gap-2 w-[280px] justify-between h-full">
          <div className="w-full">
            <p className="truncate text-3xl font-medium ">{food?.name}</p>
            <p className="text-sm text-gray-500 h-[70px] line-clamp-3">{food?.description}</p>
          </div>
          <p className="text-left font-bold">{formatPrice(food?.price || 0)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
