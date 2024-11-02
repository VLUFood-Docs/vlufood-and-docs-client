import { createI18nServer } from 'next-international/server'
import vi from './vi'

export const { getI18n, getScopedI18n, getCurrentLocale, getStaticParams } = createI18nServer(
  {
    vi: () => import('./vi'),
    en: () => import('./en'),
  },
  {
    // Uncomment to use custom segment name
    // segmentName: 'locale',
    // Uncomment to set fallback locale
    fallbackLocale: vi,
  },
)
