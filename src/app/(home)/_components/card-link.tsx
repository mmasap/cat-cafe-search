import Link, { type LinkProps } from 'next/link'
import type { PropsWithChildren } from 'react'

export const CardLink = ({ children, ...props }: PropsWithChildren & LinkProps) => {
  return (
    <Link
      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
      {...props}
    >
      {children}
    </Link>
  )
}
