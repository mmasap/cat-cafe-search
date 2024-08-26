import { useCallback } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

export const useQueryParameter = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const updateQueryParameter = useCallback(
    (val?: string) => {
      const params = new URLSearchParams(searchParams)
      if (val) {
        params.set('prefecture', val.toLowerCase())
      } else {
        params.delete('prefecture')
      }
      params.sort()
      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams],
  )

  return { updateQueryParameter }
}
