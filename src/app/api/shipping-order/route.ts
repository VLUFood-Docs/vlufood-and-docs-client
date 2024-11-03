export async function POST(req: Request) {
  const body = await req.json()
  const { name, address, items } = body
  const response = {
    name,
    address,
    items,
    id: '123456',
    status: 'PENDING',
  }
  return Response.json(response)
}
