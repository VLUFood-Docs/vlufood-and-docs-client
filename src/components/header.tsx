'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useI18n } from '@/locales/client'
import { ShoppingBagIcon } from 'lucide-react'
import SearchBar from './search-bar'
import { useRouter } from 'next/navigation'

export default function Header({ className }: { className?: string }) {
  const router = useRouter()
  const t = useI18n()
  return (
    <header className={cn('w-full p-[10px] flex justify-between items-center shadow-sm shadow-black rounded-b-md bg-white', className)}>
      <p className="text-xl font-serif cursor-pointer" onClick={() => router.push('/')}>
        {t('appName')}
      </p>
      <SearchBar />
      <div className="flex gap-2 items-center">
        <ShoppingBagIcon className="w-[64px] h-[64px] border-slate-400 border-solid border-[1px] text-black p-2 rounded-sm" />
        <Button variant="outline">{t('logInOutBtn')}</Button>
      </div>
    </header>
  )
}
