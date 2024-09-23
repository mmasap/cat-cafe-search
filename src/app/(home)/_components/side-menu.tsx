import Link from 'next/link'

export const SideMenu = () => {
  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground"
      x-chunk="A sidebar navigation with links to general, security, integrations, support, organizations, and advanced settings."
      x-chunk-container="chunk-container after:right-0"
    >
      <Link href="#" className="font-semibold text-primary">
        General
      </Link>
      <Link href="#">Security</Link>
      <Link href="#">Integrations</Link>
      <Link href="#">Support</Link>
      <Link href="#">Organizations</Link>
      <Link href="#">Advanced</Link>
    </nav>
  )
}
