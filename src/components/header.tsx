'use client'

import { Button } from '@/components/ui/button'
import { cn, formatPrice } from '@/lib/utils'
import { useI18n } from '@/locales/client'
import { ShoppingBagIcon } from 'lucide-react'
import SearchBar from './search-bar'
import { redirect, useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import EditCard from '@/app/[locale]/view/restaurant/[id]/components/edit-card'
import { AppContext } from '@/app/[locale]/app-provider'
import React from 'react'
import { toast } from 'react-toastify'
import ChangeLangBtn from './lang-btn'

export default function Header({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)
  const session = useSession()
  const context = React.useContext(AppContext)
  const shoppingCart = context?.shoppingCart
  const setShoppingCart = context?.setShoppingCart
  const router = useRouter()
  const t = useI18n()
  return (
    <header className={cn('w-full p-[10px] flex justify-between items-center shadow-sm shadow-black rounded-b-md bg-white', className)}>
      <p className="text-xl font-serif cursor-pointer" onClick={() => router.push('/')}>
        {t('appName')}
      </p>
      <SearchBar />
      <div className="flex gap-2 items-center">
        <ChangeLangBtn />
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger>
            <ShoppingBagIcon className="w-[64px] h-[64px] border-slate-400 border-solid border-[1px] text-black p-2 rounded-sm cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Giỏ hàng của bạn</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {shoppingCart?.map((item, index) => {
              return <div key={index}>{setShoppingCart && <EditCard item={item} setShoppingCart={setShoppingCart} />}</div>
            })}
            <div className="flex w-full justify-between">
              <p>Tổng tiền:</p>
              <p>{shoppingCart && formatPrice(shoppingCart?.reduce((acc, item) => acc + item.price * item.quantity, 0))}</p>
            </div>
            <Button
              className="w-full"
              variant="destructive"
              onClick={() => {
                setOpen(false)
                if (!session) {
                  toast.error('Vui lòng đăng nhập để thanh toán!')
                  return
                }
                if (!shoppingCart || shoppingCart.length == 0) {
                  toast.error('Giỏ hàng của bạn đang trống!')
                  return
                }
                if (!context?.address) {
                  toast.error('Vui lòng nhập địa chỉ giao hàng!')
                  return
                }
                if (!context?.phone) {
                  toast.error('Vui lòng nhập số điện thoại!')
                  redirect('/account')
                }
                router.push('/order/payment')
              }}
            >
              Thanh toán ngay!
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
        {session.data?.user?.email ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={session.data.user.image as string} />
                  <AvatarFallback>{session.data.user.name}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/account')}>Thông tin cá nhân</DropdownMenuItem>
                <DropdownMenuItem>Danh sách đơn hàng</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    localStorage.removeItem('address')
                    localStorage.removeItem('phone')
                    localStorage.removeItem('shoppingCart')
                    signOut({ redirectTo: '/auth/sign-in' })
                  }}
                >
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => router.push('/auth/sign-in')}>
              {t('logInOutBtn')}
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
