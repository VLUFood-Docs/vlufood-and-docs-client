'use client'

import { Restaurant } from '@/types/restaurant'
import React, { useCallback } from 'react'

interface RestaurantContextType {
  restaurant: Restaurant | null
}

export const RestaurantContext = React.createContext<RestaurantContextType | undefined>(undefined)

export default function RestaurantProvider({ children, id }: { children: React.ReactNode; id: string }) {
  const [restaurant, setRestaurant] = React.useState<Restaurant | null>(null)

  const fetchRestaurant = useCallback(async () => {
    const restaurants = await fetch(`/api/restaurants`, { method: 'GET' }).then(res => res.json())
    const data = restaurants.find((restaurant: Restaurant) => restaurant.id?.toString() === id)
    setRestaurant(data)
  }, [id])

  React.useEffect(() => {
    fetchRestaurant()
  }, [fetchRestaurant])

  return <RestaurantContext.Provider value={{ restaurant }}>{children}</RestaurantContext.Provider>
}
