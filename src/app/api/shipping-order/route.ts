import { prisma } from '@/lib/prisma'
import { Food } from '@/types/food'

interface FoodOrderType extends Food {
  quantity: number
}

export async function POST(req: Request) {
  const body = await req.json()
  const { name, address, items } = body

  if (!name || !address || !items) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 })
  }

  console.log(items[0])

  const ordered = await prisma.order.create({
    data: {
      customerName: name,
      customerAddress: address,
      user: { connect: { id: items[0].restaurantId } },
      items: {
        create: items.map((item: FoodOrderType) => ({
          quantity: item.quantity,
          food: { connect: { id: item.id } },
        })),
      },
      status: 'PENDING',
    },
  })

  return new Response(JSON.stringify(ordered), { status: 201 })
}
