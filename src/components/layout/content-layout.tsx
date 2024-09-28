import type { ReactNode } from 'react'

type ContentLayoutProps = {
  children: ReactNode
  title: string
}

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">{title}</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6">{children}</div>
    </>
  )
}
