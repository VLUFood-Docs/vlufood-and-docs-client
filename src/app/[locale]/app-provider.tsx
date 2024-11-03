'use client'

import React from 'react'
import { Provider } from './provider'
import { ShoppingCardFood } from '@/types/shopping-cart-food'

interface AppContextType {
  address: string | null
  setAddress: React.Dispatch<React.SetStateAction<string | null>>
  shoppingCart: ShoppingCardFood[]
  setShoppingCart: React.Dispatch<React.SetStateAction<ShoppingCardFood[]>>
}

export const AppContext = React.createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children, locale }: { children: React.ReactNode; locale: string }) => {
  const [address, setAddress] = React.useState<string | null>(null)
  const [shoppingCart, setShoppingCart] = React.useState<ShoppingCardFood[]>([])
  return (
    <AppContext.Provider value={{ address, setAddress, shoppingCart, setShoppingCart }}>
      <Provider locale={locale}>{children}</Provider>
    </AppContext.Provider>
  )
}
