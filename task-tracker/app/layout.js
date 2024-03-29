import { Inter } from 'next/font/google'
import './globals.css'
import ThemeRegistry from '@/components/themeregistry'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Task Tracker',
  description: 'To maintain and track your tasks',
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
