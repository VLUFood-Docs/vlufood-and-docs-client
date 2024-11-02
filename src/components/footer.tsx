'use client'

import { cn } from '@/lib/utils'
import Label from './label'
import { useI18n } from '@/locales/client'
import { FaFacebook, FaGoogle, FaYoutube } from 'react-icons/fa'
import { Separator } from './ui/separator'
import { useRouter } from 'next/navigation'

export default function Footer({ className }: { className?: string }) {
  const t = useI18n()
  const router = useRouter()
  return (
    <footer
      className={cn(
        'w-full p-[10px] flex justify-center items-center shadow-sm shadow-black rounded-t-md bg-primary flex-col gap-4',
        className,
      )}
    >
      <div className="flex justify-between px-[50px] w-full items-center">
        <Label colorVariant="secondary" size="subheading" className="cursor-pointer" onClick={() => router.push('/')}>
          {t('appName')}
        </Label>
        <div className="flex gap-4 items-center">
          <FaFacebook className="w-[54px] h-[54px] text-secondary" />
          <FaGoogle className="w-[54px] h-[54px] text-secondary" />
          <FaYoutube className="w-[54px] h-[54px] text-secondary" />
        </div>
      </div>
      <Separator className="w-[96%]" />
      <div className="flex px-[50px] items-center justify-start w-full">
        <div className="flex flex-col gap-4">
          <Label colorVariant="secondary" size="subheading" className="font-thin">
            Về chúng tôi
          </Label>
          <Label colorVariant="secondary" size="subheading" className="font-thin">
            Trung tâm hỗ trợ
          </Label>
          <Label colorVariant="secondary" size="subheading" className="font-thin">
            Vấn đề thường gặp
          </Label>
        </div>
      </div>
      <Separator className="w-[96%]" />
      <Label colorVariant="secondary" size="caption">
        @VLUFood & Docs 2024
      </Label>
    </footer>
  )
}
