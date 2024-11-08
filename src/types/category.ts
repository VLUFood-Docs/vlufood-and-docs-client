import { Food, Category as PrismaCategory } from '@prisma/client'
import { StaticImageData } from 'next/image'

interface Category extends PrismaCategory {
  foods?: Food[]
  image?: StaticImageData
}

export type { Category }
