'use client'

import React from 'react'
import { RestaurantContext } from './restaurant-provider'
import { RestaurantBreadcrumb } from './components/breadcrumb'
import Label from '@/components/label'
import { MapPin, StarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FoodCard from './components/food-card'

export default function ViewRestaurant() {
  const context = React.useContext(RestaurantContext)
  const restaurant = context?.restaurant
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
          <Label>{restaurant.name}</Label>
          <Label size="body">{restaurant.description}</Label>
          <div className="flex gap-20">
            <div className="flex gap-2 items-center">
              <Label size="subheading" className="text-yellow-400">
                <StarIcon />
              </Label>
              <Label size="body">{restaurant.rating}</Label>
            </div>
            <div className="flex gap-2 items-center">
              <Label size="subheading" className="text-red-400">
                <MapPin />
              </Label>
              <Label size="body">
                {restaurant.distance} - {restaurant.time}
              </Label>
            </div>
          </div>
        </div>
        <div className="w-full px-[50px] overflow-x-auto justify-center flex">
          {restaurant.categories?.map((category, index) => {
            return (
              <Button variant="ghost" key={category.id} onClick={() => scrollToCategory(index)}>
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
      {restaurant?.categories?.map((category, index) => {
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
