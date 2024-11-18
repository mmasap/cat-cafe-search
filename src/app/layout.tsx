import type { Metadata } from 'next'
import Link from 'next/link'

import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '猫カフェ検索',
  description: '猫カフェ検索',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="flex min-h-screen w-full flex-col">
          <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background z-10">
            <nav className="gap-6 font-medium flex flex-row items-center text-sm lg:gap-6 max-w-6xl w-full px-2">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-xl">
                <span className="p-2">猫カフェ検索</span>
              </Link>
              <Link
                href="/shop"
                className="text-muted-foreground transition-colors hover:text-foreground md:text-base"
              >
                店舗検索
              </Link>
              <Link
                href="/cat"
                className="text-muted-foreground transition-colors hover:text-foreground md:text-base"
              >
                猫検索
              </Link>
            </nav>
          </header>
          <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-2 bg-muted/40 p-2 md:gap-4 md:p-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
