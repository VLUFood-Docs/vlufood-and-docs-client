'use client'

import { Input } from '@/components/ui/input'
import { useI18n } from '@/locales/client'
import { MapPin } from 'lucide-react'

export default function SearchBar() {
  const t = useI18n()
  return (
    <div className="flex gap-1 items-center">
      <MapPin className="text-destructive" />
      <Input className="w-[300px]" type="text" placeholder={t('searchPlaceholder')} />
    </div>
  )
}
