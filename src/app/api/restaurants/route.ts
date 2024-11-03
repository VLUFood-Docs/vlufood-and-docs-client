import { Restaurant } from '@/types/restaurant'

export async function GET() {
  const restaurant: Restaurant[] = [
    {
      id: '0',
      name: "Mc-Donald's - Thái Hà",
      description: 'Gà rán, Burger, Cơm - Món quốc tế',
      rating: 4.4,
      time: '20 phút',
      distance: '200m',
      image: '/images/hero.gif',
      promo: true,
      categories: [
        {
          id: '1',
          name: 'Gà rán',
          image: '/images/introduce-1.png',
          foods: [
            {
              id: '1',
              name: 'Gà rán cay',
              images: ['/images/introduce-1.png', '/images/introduce-2.png'],
              description:
                'Gà rán cay ngon tuyệt Gà rán cay ngon tuyệtGà rán cay ngon tuyệtGà rán cay ngon tuyệtGà rán cay ngon tuyệtGà rán cay ngon tuyệt Gà rán cay ngon tuyệt Gà rán cay ngon tuyệtGà rán cay ngon tuyệtGà rán cay ngon tuyệtGà rán cay ngon tuyệtGà rán cay ngon tuyệt',
              price: 45000,
            },
            {
              id: '2',
              name: 'Gà rán ngọt',
              images: ['/images/introduce-2.png', '/images/introduce-1.png'],
            },

            {
              id: '3',
              name: 'Gà rán béo',
              images: ['/images/introduce-1.png', '/images/introduce-2.png'],
              description:
                'Gà rán cay ngon tuyệt Gà rán cay ngon tuyệtGà rán cay ngon tuyệtGà rán cay ngon tuyệtGà rán cay ngon tuyệtGà rán cay ngon tuyệt',
              price: 45000,
            },

            {
              id: '4',
              name: 'Gà rán mặn',
              images: ['/images/introduce-2.png', '/images/introduce-1.png'],
            },
          ],
        },
        {
          id: '2',
          name: 'Burger',
          image: '/images/introduce-2.png',
          foods: [
            {
              id: '1',
              name: 'Burger cay',
              images: ['/images/introduce-1.png', '/images/introduce-2.png'],
            },
            {
              id: '2',
              name: 'Burger ngọt',
              images: ['/images/introduce-2.png', '/images/introduce-1.png'],
            },

            {
              id: '3',
              name: 'Burger béo',
              images: ['/images/introduce-1.png', '/images/introduce-2.png'],
            },

            {
              id: '4',
              name: 'Burger mặn',
              images: ['/images/introduce-2.png', '/images/introduce-1.png'],
            },
          ],
        },
        {
          id: '3',
          name: 'Cơm',
          image: '/images/introduce-3.png',
          foods: [
            {
              id: '1',
              name: 'Cơm cay',
              images: ['/images/introduce-1.png', '/images/introduce-2.png'],
            },
            {
              id: '2',
              name: 'Cơm ngọt',
              images: ['/images/introduce-2.png', '/images/introduce-1.png'],
            },

            {
              id: '3',
              name: 'Cơm béo',
              images: ['/images/introduce-1.png', '/images/introduce-2.png'],
            },

            {
              id: '4',
              name: 'Cơm gà',
              images: ['/images/introduce-2.png', '/images/introduce-1.png'],
            },
          ],
        },
      ],
    },
  ]
  return Response.json(restaurant)
}
