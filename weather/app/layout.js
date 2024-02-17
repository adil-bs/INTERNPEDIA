import { Inter } from 'next/font/google'
import './globals.css'
import ThemeRegistry from '@/components/themeregistry'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Weather',
  description: "Know your place's weather",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  )
}