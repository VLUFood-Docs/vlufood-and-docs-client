import Header from '@/components/header'
import React from 'react'
import RestaurantProvider from './restaurant-provider'
import Footer from '@/components/footer'

export default async function Layout({ params, children }: { params: Promise<{ locale: string; id: string }>; children: React.ReactNode }) {
  const { id } = await params
  return (
    <div>
      <main className="w-full flex flex-col justify-between h-screen">
        <Header />
        <RestaurantProvider id={id}>{children}</RestaurantProvider>
        <Footer />
      </main>
    </div>
  )
}
