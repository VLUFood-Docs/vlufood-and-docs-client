import { Category, Food, User as PrismaRestaurant } from '@prisma/client'

interface Restaurant extends PrismaRestaurant {
  foods?: Food[]
  categories?: Category[]
  rating?: number
  time?: string
  distance?: string
}

export type { Restaurant }
