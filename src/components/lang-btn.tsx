import React from 'react'
import { Button } from './ui/button'
import { useChangeLocale, useCurrentLocale } from '@/locales/client'

export default function ChangeLangBtn() {
  const currentLocale = useCurrentLocale()
  const changeLocale = useChangeLocale()
  return (
    <Button
      variant="outline"
      onClick={() => {
        changeLocale(currentLocale == 'vi' ? 'en' : 'vi')
      }}
    >
      {currentLocale == 'vi' ? 'Tiếng Anh' : 'Vietnamese'}
    </Button>
  )
}
