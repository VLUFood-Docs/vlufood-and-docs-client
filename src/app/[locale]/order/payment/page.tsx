'use client'
import React from 'react'
import { AppContext } from '../../app-provider'
import { redirect, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Label from '@/components/label'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

export default function PaymentPage() {
  const router = useRouter()
  const session = useSession()
  const context = React.useContext(AppContext)
  const shoppingCart = context?.shoppingCart
  const setShoppingCart = context?.setShoppingCart
  const address = context?.address
  const totalCost = shoppingCart?.reduce((acc, item) => acc + item.price * item.quantity, 0)
  if (totalCost === undefined) return
  const deliveryFee = (totalCost * 10) / 100
  const serviceFee = (totalCost * 3) / 100
  if (!shoppingCart || shoppingCart.length == 0 || !setShoppingCart) redirect('/')
  if (!session) redirect('/login')

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <Card className="w-[500px]">
        <CardHeader>
          <Label size="subheading" className="text-center">
            Thanh toán
          </Label>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Label size="body" className="font-bold">
            Thông tin đơn hàng:
          </Label>
          {shoppingCart.map((item, index) => {
            return (
              <div key={index} className="w-full flex justify-between items-center">
                <p>x{item.quantity}</p>
                <p className="truncate overflow-hidden text-ellipsis whitespace-nowrap w-[200px]">{item.name}</p>
                <p>{formatPrice(item.price * item.quantity)}</p>
              </div>
            )
          })}
          <div>
            <div className="flex w-full justify-between">
              <p>Phí dịch vụ:</p>
              <p className="font-bold">{formatPrice(serviceFee)}</p>
            </div>
            <div className="flex w-full justify-between">
              <p>Phí giao hàng:</p>
              <p className="font-bold">{formatPrice(deliveryFee)}</p>
            </div>
            <div className="flex w-full justify-between">
              <p>Tổng cộng:</p>
              <p className="font-bold">{formatPrice(totalCost + serviceFee + deliveryFee)}</p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <Button
              variant="destructive"
              onClick={async () => {
                if (!address) {
                  toast.error('Vui lòng chọn địa chỉ giao hàng!')
                  return
                }
                await fetch('/api/shipping-order', {
                  method: 'POST',
                  body: JSON.stringify({
                    name: session.data?.user?.name,
                    address: address,
                    items: shoppingCart,
                  }),
                }).then(async res => {
                  if (res.status !== 201) {
                    toast.error('Đã có lỗi xảy ra!')
                    return
                  }
                  const data = await res.json()
                  toast.success('Đặt hàng thành công! Đang chuyển hướng đến trang theo dõi đơn hàng...')
                  setShoppingCart([])
                  setTimeout(() => {
                    router.push(`/order/tracking/${data.id}`)
                  }, 2000)
                })
              }}
            >
              Thanh toán
            </Button>
            <Button variant="default" onClick={() => router.push('/')}>
              Quay lại!
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
