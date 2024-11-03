import { Category } from './category'

interface Restaurant {
  id?: string
  name?: string
  description?: string
  rating?: number
  time?: string
  distance?: string
  image?: string
  promo?: boolean
  categories?: Category[]
}

export type { Restaurant }
