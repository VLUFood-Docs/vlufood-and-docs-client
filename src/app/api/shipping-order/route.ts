import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const body = await req.json()
  const { name, address, items } = body

  if (!name || !address || !items) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 })
  }

  const ordered = await prisma.order.create({
    data: {
      customerName: name,
      customerAddress: address,
      user: { connect: { id: items[0].userId } },
      items: {
        create: items,
      },
      status: 'PENDING',
    },
  })

  return new Response(JSON.stringify(ordered), { status: 201 })
}
