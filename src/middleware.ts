import { createI18nMiddleware } from 'next-international/middleware'
import type { NextRequest } from 'next/server'

export { auth as AuthMiddleware } from '@/auth'

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'vi'],
  defaultLocale: 'vi',
})

export function middleware(request: NextRequest) {
  return I18nMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
}
