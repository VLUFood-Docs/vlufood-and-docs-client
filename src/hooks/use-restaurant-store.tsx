import { create } from 'zustand'
import { User as Restaurant } from '@prisma/client'

interface RestaurantStore {
  restaurants: Restaurant[]
  setRestaurants: (restaurants: Restaurant[]) => void
}

export const useRestaurantStore = create<RestaurantStore>(set => ({
  restaurants: [],
  setRestaurants: restaurants => set({ restaurants }),
}))
