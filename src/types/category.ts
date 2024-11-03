import { Food } from './food'

interface Category {
  id?: string
  name?: string
  image?: string
  foods?: Food[]
}

export type { Category }
