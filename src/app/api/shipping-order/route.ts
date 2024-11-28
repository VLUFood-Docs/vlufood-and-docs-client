import { generateId } from '@/lib/generate-id'
import { prisma } from '@/lib/prisma'
import { Food } from '@/types/food'

interface FoodOrderType extends Food {
  quantity: number
}

export async function GET() {
  const orders = await prisma.order.findMany({
    include: { items: { include: { food: true } } },
  })

  return Response.json(orders)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { name, address, items, phone } = body

  if (!name || !address || !items || !phone) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 })
  }

  const ordered = await prisma.order.create({
    data: {
      generatedId: await generateId({ type: 'food', restaurantId: items[0].restaurantId }),
      customerName: name,
      customerPhone: phone,
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
