import './globals.css'
import Navbar from '@/components/Navbar'

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html>
      
      <head />
      <body className="bg-[url('../public/images/background.jpg')] bg-no-repeat bg-cover">
        <Navbar />
        <main className='px-20'>
          {children}
        </main>
        </body>
    </html>
  )
}
