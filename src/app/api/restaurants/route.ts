import { prisma } from '@/lib/prisma'

export async function GET() {
  const restaurants = await prisma.user.findMany({
    include: {
      foods: true,
      categories: { include: { foods: true } },
    },
  })
  return Response.json(restaurants, { status: 200 })
}
