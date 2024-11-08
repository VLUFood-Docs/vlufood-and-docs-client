'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import HeroGif from '@/public/images/hero.gif'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/locales/client'
import { cn } from '@/lib/utils'
import SearchBar from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import RestaurantCard from './components/restaurant-card'
import CategoryCard from './components/category-card'
import { generateCategory } from '@/public/fake-data/category'

import IntroduceImage1 from '@/public/images/introduce-1.png'
import IntroduceImage2 from '@/public/images/introduce-2.png'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Label from '@/components/label'
import { useRestaurantStore } from '@/hooks/use-restaurant-store'
import { generateRestaurant } from '@/public/fake-data/restaurant'

function GreetingCard({ className }: { className?: string }) {
  const t = useI18n()
  return (
    <Card className={cn('w-[415px] shadow-lg', className)}>
      <CardHeader className="text-xl font-serif">{t('greetingCard.greeting')}</CardHeader>
      <CardContent className="flex flex-col gap-5">
        <CardTitle className="text-3xl font-serif w-full text-justify font-extralight">{t('greetingCard.title')}</CardTitle>
        <SearchBar />
      </CardContent>
    </Card>
  )
}

export default function Home() {
  const t = useI18n()
  const [isHeaderVisible, setHeaderVisible] = useState(false)
  const [isExpandedRestaurant, setIsExpandedRestaurant] = useState(false)

  // fakeFoods
  const realRestaurants = useRestaurantStore(state => state.restaurants)
  const fakeRestaurants = generateRestaurant({ number: 15 })

  const restaurants = [...realRestaurants, ...fakeRestaurants]
  // fakeCategories
  const categories = generateCategory()

  const handleScroll = () => {
    setHeaderVisible(window.scrollY > 50)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div className="flex flex-col">
        {isHeaderVisible && <Header className="fixed top-0 left-0 right-0 z-50" />}
        <Image src={HeroGif} alt="hero gif" className="w-full h-[300px] object-cover" />
        <GreetingCard className="absolute top-[150px] left-[100px]" />
        <div className="pt-[250px] px-[50px] flex flex-col pb-[100px]">
          <div className="flex items-center gap-1 text-3xl justify-end">
            <p>{t('recommentRestaurant.title1')}</p>
            <p className="text-green-600">{t('recommentRestaurant.title2')}</p>
          </div>
          <div
            className={`w-full ${
              isExpandedRestaurant
                ? 'grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-4 justify-center'
                : 'overflow-x-auto flex gap-2 pt-4 justify-start scroll-smooth'
            }`}
          >
            {restaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
          <Button variant="outline" className="w-full mt-10 text-lg" onClick={() => setIsExpandedRestaurant(prev => !prev)}>
            {isExpandedRestaurant ? t('recommentRestaurant.showLess') : t('recommentRestaurant.showMore')}
          </Button>
        </div>
        <div className="px-[50px] flex flex-col pb-[100px]">
          <Label className="text-right font-thin" size="subheading">
            {t('categories.title')}
          </Label>
          <div className="w-full grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-4 justify-center">
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 px-[50px]">
          <p className="text-4xl font-bold text-left">{t('introduce.title')}</p>
          <ul className="text-lg text-justify">
            {t('introduce.content')
              .split(',')
              .map((content, index) => (
                <li key={index}>{content.trim()}</li>
              ))}
          </ul>
          <div className="flex gap-20 items-center justify-center w-full py-[50px]">
            <Image src={IntroduceImage2} alt="hình ảnh minh họa" />
            <Image src={IntroduceImage1} alt="hình ảnh minh họa" />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
