import Header from '@/components/header'
import React from 'react'
import Footer from '@/components/footer'

export default async function Layout({ children }: { params: Promise<{ locale: string }>; children: React.ReactNode }) {
  return (
    <div>
      <main className="w-full flex flex-col justify-between h-screen">
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  )
}
