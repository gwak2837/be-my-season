export const MOBILE_MIN_WIDTH = '280px'
export const TABLET_MIN_WIDTH = '560px'
export const DESKTOP_MIN_WIDTH = '900px'
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

export const APPLICATION_NAME = '비마이시즌 (Be:MySeason)' // = site.webmanifest name
export const APPLICATION_SHORT_NAME = '비마이시즌' // = site.webmanifest short_name
export const SUBJECT = '경력단절 여성을 위한 교육'
export const KEYWORDS = `${APPLICATION_SHORT_NAME}` // 최대 10개
export const AUTHOR = 'gwak2837'
export const CANONICAL_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://be-my-season.vercel.app'
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'
