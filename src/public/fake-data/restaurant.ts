//fake data

import { Restaurant } from '@/types/restaurant'

function generateRestaurant({ number }: { number: number }) {
  const foods: Restaurant[] = []
  for (let i = 0; i < number; i++) {
    foods.push({
      id: 'i',
      restaurantName: "Mc-Donald's - Thái Hà",
      restaurantDescription: 'Gà rán, Burger, Cơm - Món quốc tế',
      rating: 4.4,
      time: '20 phút',
      distance: '200m',
      image: '/images/hero.gif',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: '',
      emailVerified: new Date(),
      restaurantAddress: 'Số 1 Thái Hà, Đống Đa, Hà Nội',
      restaurantPhone: '0123456789',
      restaurantType: 'Fast Food',
      name: 'Mc-Donald',
    })
  }
  return foods
}

export { generateRestaurant }
