import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'

import HeroGif from '!/images/hero.gif'
import { Category } from '@/types/category'
import { cn } from '@/lib/utils'

interface CategoryCardType {
  className?: string
  category: Category
}

export default function CategoryCard({ className, category }: CategoryCardType) {
  const { name, image } = category
  return (
    <Card className={cn('min-w-[300px] cursor-pointer', className)}>
      <CardHeader className="p-0">
        <Image src={image || HeroGif} alt="category-image" className="w-full object-cover rounded-md" width={300} height={215} />
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold pt-5">{name}</p>
      </CardContent>
    </Card>
  )
}
