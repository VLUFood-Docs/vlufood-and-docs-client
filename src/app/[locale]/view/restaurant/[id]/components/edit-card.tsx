'use client'

import Label from '@/components/label'
import { formatPrice } from '@/lib/utils'
import { ShoppingCardFood } from '@/types/shopping-cart-food'
import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

interface Props {
  item: ShoppingCardFood
  setShoppingCart: React.Dispatch<React.SetStateAction<ShoppingCardFood[]>>
}

export default function EditCard({ item, setShoppingCart }: Props) {
  const [amount, setAmount] = React.useState(item.quantity)
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-1">
        <FaPlus
          onClick={() => {
            setAmount(prev => {
              return prev + 1
            })
            setShoppingCart(prev => {
              return prev.map(food => {
                if (food.id === item.id) {
                  return { ...food, quantity: food.quantity + 1 }
                }
                return food
              })
            })
          }}
        />
        <p>{amount}</p>
        <FaMinus
          onClick={() => {
            setAmount(prev => {
              if (prev === 1) return 1
              return prev - 1
            })
            setShoppingCart(prev => {
              return prev.map(food => {
                if (food.id === item.id) {
                  return { ...food, quantity: food.quantity - 1 }
                }
                return food
              })
            })
          }}
        />
      </div>
      <div className="flex flex-col items-start">
        <Label size="body" className="truncate w-[200px]">
          {item.name}
        </Label>
        <Label size="caption" className="truncate w-[200px]">
          {item.description}
        </Label>
      </div>
      <div className="flex flex-col items-start">
        <Label size="body" className="font-bold">
          {formatPrice(amount * item.price)}
        </Label>
      </div>
    </div>
  )
}
