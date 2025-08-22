import './globals.css'
import Navbar from '@/components/Navbar'

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-[url('../public/images/background.jpg')] bg-no-repeat bg-cover">
        <Navbar />
        <main className='px-2'>
          {/* Accessible hidden H1 for screen readers and SEO */}
          <h1 className="sr-only">Adios — Travel offers</h1>
          {children}
        </main>
        </body>
    </html>
  )
}
