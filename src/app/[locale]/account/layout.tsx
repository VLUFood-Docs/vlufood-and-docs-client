import Header from '@/components/header'
import React from 'react'

export default async function Layout({ children }: { params: Promise<{ locale: string }>; children: React.ReactNode }) {
  return (
    <div>
      <main className="w-screen flex flex-col h-screen gap-2">
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        <div className="px-4">{children}</div>
      </main>
    </div>
  )
}
