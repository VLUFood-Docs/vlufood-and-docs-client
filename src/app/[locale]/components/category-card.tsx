import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'

import DefaultImage from '@/public/images/introduce-1.png'
import { Category } from '@/types/category'
import { cn } from '@/lib/utils'

interface CategoryCardType {
  className?: string
  category: Category
}

export default function CategoryCard({ className, category }: CategoryCardType) {
  const { name, image } = category
  return (
    <Card className={cn('min-w-[300px] w-[300px] cursor-pointer', className)}>
      <CardHeader className="p-0">
        <Image
          src={image || DefaultImage}
          alt="category-image"
          className="w-full h-[150px] object-cover rounded-md"
          width={300}
          height={100}
        />
      </CardHeader>
      <CardContent className="p-1">
        <p className="text-2xl pt-5">{name}</p>
      </CardContent>
    </Card>
  )
}
