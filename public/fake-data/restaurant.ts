//fake data

import { Restaurant } from '@/types/restaurant'

function generateRestaurant({ number }: { number: number }) {
  const foods: Restaurant[] = []
  for (let i = 0; i < number; i++) {
    foods.push({
      id: i,
      name: "Mc-Donald's - Thái Hà",
      description: 'Gà rán, Burger, Cơm - Món quốc tế',
      rating: 4.4,
      time: '20 phút',
      distance: '200m',
      image: '/images/hero.gif',
      promo: i % 2 === 0,
    })
  }
  return foods
}

export { generateRestaurant }
