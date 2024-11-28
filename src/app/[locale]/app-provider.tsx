'use client'

import React, { useEffect } from 'react'
import { Provider } from './provider'
import { ShoppingCardFood } from '@/types/shopping-cart-food'
import { useRestaurantStore } from '@/hooks/use-restaurant-store'

interface AppContextType {
  address: string | null
  setAddress: React.Dispatch<React.SetStateAction<string | null>>
  shoppingCart: ShoppingCardFood[]
  setShoppingCart: React.Dispatch<React.SetStateAction<ShoppingCardFood[]>>
  phone: string | null
  setPhone: React.Dispatch<React.SetStateAction<string | null>>
}

export const AppContext = React.createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children, locale }: { children: React.ReactNode; locale: string }) => {
  const [address, setAddress] = React.useState<string | null>(null)
  const [phone, setPhone] = React.useState<string | null>(null)
  const [shoppingCart, setShoppingCart] = React.useState<ShoppingCardFood[]>([])
  const setRestaurants = useRestaurantStore(state => state.setRestaurants)

  useEffect(() => {
    const localAddress = localStorage.getItem('address')
    const localPhone = localStorage.getItem('phone')
    const localShoppingCart = localStorage.getItem('shoppingCart')
    if (localAddress) {
      setAddress(localAddress)
    }
    if (localShoppingCart) {
      setShoppingCart(JSON.parse(localShoppingCart))
    }
    if (localPhone) {
      setPhone(localPhone)
    }
    const fetchData = async () => {
      const restaurants = await fetch(`/api/restaurants`)
      setRestaurants(await restaurants.json())
    }
    fetchData()
  }, [setRestaurants])
  return (
    <AppContext.Provider value={{ address, setAddress, shoppingCart, setShoppingCart, phone, setPhone }}>
      <Provider locale={locale}>{children}</Provider>
    </AppContext.Provider>
  )
}
