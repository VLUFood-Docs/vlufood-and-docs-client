import { prisma } from './prisma'

interface GenerateIdOptions {
  type: 'food' | 'docs'
  restaurantId: string
}

export async function generateId({ type, restaurantId }: GenerateIdOptions) {
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0')
  const prefix = type === 'food' ? 'F' : 'D'
  const newId = `${prefix}-${random}`
  const result = await prisma.user.findUnique({
    where: { id: restaurantId },
    select: { storeId: true },
  })
  const restaurantStoreId: string[] | null = result ? result.storeId : null

  if (!restaurantStoreId) throw new Error('Restaurant not found')

  if (restaurantStoreId.find(id => id === newId)) return generateId({ type, restaurantId })

  return newId
}
