import Header from '@/components/header'
import React from 'react'
import Footer from '@/components/footer'

export default async function Layout({ children }: { params: Promise<{ locale: string }>; children: React.ReactNode }) {
  return (
    <div>
      <main className="w-full flex flex-col justify-between h-screen">
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        {children}
        <Footer />
      </main>
    </div>
  )
}
