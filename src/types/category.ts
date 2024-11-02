import { Food } from './food'

interface Category {
  id?: number
  name?: string
  image?: string
  foods?: Food[]
}

export type { Category }
