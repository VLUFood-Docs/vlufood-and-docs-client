'use client'

import React from 'react'
import { RestaurantBreadcrumb } from './components/breadcrumb'
import Label from '@/components/label'
import { MapPin, StarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FoodCard from './components/food-card'
import { useRestaurantStore } from '@/hooks/use-restaurant-store'
import { useParams } from 'next/navigation'
import { Restaurant } from '@/types/restaurant'
import { Category } from '@/types/category'

export default function ViewRestaurant() {
  const { id } = useParams<{ id: string }>()
  const restaurant = useRestaurantStore(state => state.restaurants.find(restaurant => restaurant.id === id)) as Restaurant | undefined
  const [currentCategoryIndex, setCurrentCategoryIndex] = React.useState(0)

  // Tạo refs cho từng danh mục
  const categoryRefs = React.useRef<HTMLDivElement[]>([])

  const scrollToCategory = (index: number) => {
    if (categoryRefs.current[index]) {
      categoryRefs.current[index].scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Kiểm tra vị trí cuộn để cập nhật danh mục hiện tại
  const handleScroll = () => {
    categoryRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect()
        if (rect.top >= 0 && rect.top < window.innerHeight) {
          setCurrentCategoryIndex(index)
        }
      }
    })
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!restaurant) return <p>Không tìm thấy nhà hàng này!</p>

  return (
    <main className="w-full flex flex-col gap-4">
      <div className="shadow-md px-[50px] py-[25px]">
        <RestaurantBreadcrumb />
        <div className="flex justify-start w-full flex-col">
          <Label>{restaurant.restaurantName}</Label>
          <Label size="body">{restaurant.restaurantDescription}</Label>
          <div className="flex gap-20">
            <div className="flex gap-2 items-center">
              <Label size="subheading" className="text-yellow-400">
                <StarIcon />
              </Label>
              <Label size="body">5.0</Label>
            </div>
            <div className="flex gap-2 items-center">
              <Label size="subheading" className="text-red-400">
                <MapPin />
              </Label>
              <Label size="body">15 phút - 500m</Label>
            </div>
          </div>
        </div>
        <div className="w-full px-[50px] overflow-x-auto justify-center flex">
          {restaurant.categories?.map((category, index) => {
            return (
              <Button variant="ghost" key={index} onClick={() => scrollToCategory(index)}>
                <Label
                  size="body"
                  className={currentCategoryIndex === index ? 'text-green-500' : 'text-black'} // Thay đổi màu chữ
                >
                  {category.name}
                </Label>
              </Button>
            )
          })}
        </div>
      </div>
      {restaurant?.categories?.map((category: Category, index) => {
        return (
          <div
            ref={el => {
              if (el) {
                categoryRefs.current[index] = el
              }
            }}
            key={category.id}
            id={category.name}
            className="w-full flex flex-col gap-4 px-[25px] pb-[50px]"
          >
            <Label className="font-thin">{category.name}</Label>
            <div className="grid gap-4 grid-cols-3 justify-items-center w-fit">
              {category.foods && category.foods.length > 0 ? (
                category.foods.map(food => <FoodCard key={food.id} food={food} />)
              ) : (
                <p>Không có món ăn nào để hiển thị.</p>
              )}
            </div>
          </div>
        )
      })}
    </main>
  )
}
