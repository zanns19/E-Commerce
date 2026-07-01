import { Gulzar } from 'next/font/google'

export const gulzar = Gulzar({
  subsets: ['arabic'], // Gulzar uses Arabic/Urdu script
  weight: '400',
  style: 'normal',
  variable: '--font-gulzar', // optional, for CSS variable usage
})