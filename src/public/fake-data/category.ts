import { Category } from '@/types/category'
import HeroGif from '@/public/images/introduce-1.png'

const categoriesName = [
  'Cơm',
  'Gà rán - Burger',
  'Thịt',
  'Ăn vặt',
  'Mì ý',
  'Gà',
  'Hủ tiếu',
  'Trà sữa',
  'Rau trộn',
  'Bánh mì',
  'Cháo',
  'Gà rán',
  'Đồ uống lạnh',
  'Cơm tấm',
  'Pizza',
]

function generateCategory(): Category[] {
  const categories: Category[] = []
  for (let i = 0; i < categoriesName.length; i++) {
    const category: Category = {
      userId: '1',
      description: 'Description',
      createdAt: new Date(),
      updatedAt: new Date(),
      id: `${i + 1}`,
      name: categoriesName[i],
      image: HeroGif,
    }
    categories.push(category)
  }

  return categories
}

export { generateCategory }
