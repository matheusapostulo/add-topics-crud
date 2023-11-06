import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { AuthProvider } from './Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Topics Website',
  description: 'Topics Website created with next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthProvider>
        <div className='max-w-3xl mx-auto p-4'> {/* mx-auto útil para "centralizar o content quando tem espaço pro max-w setado" */}
            <Navbar/> 
            {children}
        </div> 
      </AuthProvider>
      </body>
    </html>
  )
}
