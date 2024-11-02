import { createI18nClient } from 'next-international/client'
import vi from './vi'

export const { useI18n, useScopedI18n, I18nProviderClient, useChangeLocale, defineLocale, useCurrentLocale } = createI18nClient(
  {
    vi: async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
      return import('./vi')
    },
    en: async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
      return import('./en')
    },
  },
  {
    // Uncomment to set base path
    // basePath: '/base',
    // Uncomment to use custom segment name
    // segmentName: 'locale',
    // Uncomment to set fallback locale
    fallbackLocale: vi,
  },
)
