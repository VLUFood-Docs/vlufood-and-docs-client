'use client'

import React from 'react'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import EditCard from './edit-card'
import { AppContext } from '@/app/[locale]/app-provider'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface ShoppingCartSheetType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ShoppingCartSheet({ open, setOpen }: ShoppingCartSheetType) {
  const router = useRouter()
  const context = React.useContext(AppContext)
  const shoppingCart = context?.shoppingCart
  const setShoppingCart = context?.setShoppingCart
  if (!setShoppingCart) return
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Thanh toán giỏ hàng</SheetTitle>
          <SheetDescription>Bạn hãy kiểm tra lại các sản phẩm trong giỏ hàng cẩn thận trước khi thanh toán nhé.</SheetDescription>
        </SheetHeader>
        {shoppingCart?.map((item, index) => {
          return <div key={index}>{<EditCard item={item} setShoppingCart={setShoppingCart} />}</div>
        })}
        <Button variant="destructive" className="w-full mt-4" onClick={() => router.push('/order/payment')}>
          Tiến hành thanh toán
        </Button>
      </SheetContent>
    </Sheet>
  )
}
