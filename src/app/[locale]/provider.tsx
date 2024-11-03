'use client'

import type { ReactNode } from 'react'
import { I18nProviderClient } from '../../locales/client'
import { SessionProvider } from 'next-auth/react'

type ProviderProps = {
  locale: string
  children: ReactNode
}

export function Provider({ locale, children }: ProviderProps) {
  return (
    <SessionProvider>
      <I18nProviderClient locale={locale} fallback={<p>Loading...</p>}>
        {children}
      </I18nProviderClient>
    </SessionProvider>
  )
}
