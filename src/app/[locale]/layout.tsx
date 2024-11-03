import type { Metadata } from 'next'
import './globals.css'
import { AppProvider } from './app-provider'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

export const metadata: Metadata = {
  title: 'VLUFood & Docs | Đặt món ngay tại lớp học',
  description: 'Website đặt món ăn dành cho sinh viên VLU. Đặt món ngay tại lớp học, không cần chờ đợi.',
}

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AppProvider locale={locale}>{children}</AppProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
