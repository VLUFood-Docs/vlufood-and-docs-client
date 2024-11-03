import { Card, CardContent } from '@/components/ui/card'
import { cn, formatPrice } from '@/lib/utils'
import { Food } from '@/types/food'
import { PlusIcon } from 'lucide-react'
import Image from 'next/image'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Label from '@/components/label'
import { Button } from '@/components/ui/button'
import React from 'react'
import ShoppingCartSheet from './shopping-cart-sheet'
import { AppContext } from '@/app/[locale]/app-provider'
import { ShoppingCardFood } from '@/types/shopping-cart-food'
import { toast } from 'react-toastify'

interface FoodCardType {
  className?: string
  food: Food | null
}

export default function FoodCard({ className, food }: FoodCardType) {
  const [open, setOpen] = React.useState(false)
  const [shoppingCardOpen, setShoppingCardOpen] = React.useState(false)
  const context = React.useContext(AppContext)
  const { setShoppingCart } = context || {}
  return (
    <>
      <ShoppingCartSheet open={shoppingCardOpen} setOpen={setShoppingCardOpen} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Card className={cn('min-w-[500px] w-[500px] max-h-[200px] h-[200px] relative cursor-pointer', className)}>
            <div className="absolute bottom-2 right-2">
              <PlusIcon className="w-[48px] h-[48px] hover:bg-green-900 hover:w-[52px] hover:h-[52px] rounded-full bg-green-500 text-white" />
            </div>
            <CardContent className="flex gap-2 items-center justify-center">
              <Image
                src={food?.images?.[0] || ''}
                alt="Hình ảnh thức ăn"
                width={150}
                height={150}
                className="w-[150px] h-[150px] object-cover rounded-sm"
              />
              <div className="flex flex-col gap-2 w-[280px] justify-between h-full">
                <div className="w-full">
                  <p className="truncate text-3xl font-medium ">{food?.name}</p>
                  <p className="text-sm text-gray-500 h-[70px] line-clamp-3">{food?.description}</p>
                </div>
                <p className="text-left font-bold">{formatPrice(food?.price || 0)}</p>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="flex items-center flex-col justify-center gap-2">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl font-thin">{food?.name}</DialogTitle>
            <DialogDescription>{food?.description}</DialogDescription>
          </DialogHeader>
          <Carousel className="w-[300px] flex items-center">
            <CarouselContent>
              {food?.images?.map((image, index) => {
                return (
                  <CarouselItem key={index}>
                    <Image
                      src={image}
                      alt="Hình ảnh thức ăn"
                      width={300}
                      height={300}
                      className="w-[300px] h-[300px] object-cover rounded-sm"
                    />
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <Label size="subheading">{formatPrice(food?.price || 0)}</Label>
          <div className="w-full flex justify-between">
            <Button
              className="bg-green-600"
              onClick={() => {
                setOpen(false)
                if (!setShoppingCart) {
                  toast.error('Có lỗi xảy ra, vui lòng thử lại sau!')
                  return
                }
                setShoppingCart(prev => {
                  const newItem: ShoppingCardFood = {
                    id: food?.id || '',
                    name: food?.name || '',
                    description: food?.description || '',
                    quantity: 1,
                    price: food?.price || 0,
                  }
                  return [...prev, newItem]
                })
                toast.success('Đã thêm vào giỏ hàng!')
              }}
            >
              Thêm vào giỏ hàng!
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setOpen(false)
                if (!setShoppingCart) {
                  toast.error('Có lỗi xảy ra, vui lòng thử lại sau!')
                  return
                }
                setShoppingCart(() => {
                  const newItem: ShoppingCardFood = {
                    id: food?.id || '',
                    name: food?.name || '',
                    description: food?.description || '',
                    quantity: 1,
                    price: food?.price || 0,
                  }
                  return [newItem]
                })
                setShoppingCardOpen(true)
              }}
            >
              Mua ngay!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
