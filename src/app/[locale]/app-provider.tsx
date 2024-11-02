'use client'

import React from 'react'
import { Provider } from './provider'

const AppContext = React.createContext(undefined)

export const AppProvider = ({ children, locale }: { children: React.ReactNode; locale: string }) => {
  return (
    <AppContext.Provider value={undefined}>
      <Provider locale={locale}>{children}</Provider>
    </AppContext.Provider>
  )
}
