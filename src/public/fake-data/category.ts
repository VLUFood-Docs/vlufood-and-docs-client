import { Category } from '@/types/category'

function generateCategory(num: number): Category[] {
  const categories: Category[] = []
  for (let i = 0; i < num; i++) {
    categories.push({
      id: 'i',
      name: 'Fast Food',
      image: '/images/hero.gif',
    })
  }
  return categories
}

export { generateCategory }
