export const MOBILE_MIN_WIDTH = '280px'
export const TABLET_MIN_WIDTH = '560px'
export const DESKTOP_MIN_WIDTH = '1024px'
export const NAVIGATION_HEIGHT = '5rem'

export type Theme = typeof theme

// https://material.io/design/color/the-color-system.html#color-theme-creation
export const theme = {
  primary: '#e7c6af', // = site.webmanifest theme_color
  primaryAchromatic: '#',
  secondary: '#',
  secondaryAchromatic: '#',
  background: '#',
  accent: '#',
  danger: '#',
  error: '#',
  lightText: '#',
}

export const darkTheme: Theme = {
  primary: '#',
  primaryAchromatic: '#',
  secondary: '#',
  secondaryAchromatic: '#',
  background: '#',
  accent: '#',
  danger: '#',
  error: '#',
  lightText: '#',
}

export const APPLICATION_NAME = ' - 커뮤니티' // = site.webmanifest name
export const APPLICATION_SHORT_NAME = '' // = site.webmanifest short_name
export const SUBJECT = ''
export const KEYWORDS = `${APPLICATION_SHORT_NAME}` // 최대 10개
export const AUTHOR = 'gwak2837'
export const CANONICAL_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://jayudam.vercel.app'
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'
