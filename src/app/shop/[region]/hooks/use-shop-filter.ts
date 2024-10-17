import { regionCodes } from '@/data/prefecture'
import { z } from 'zod'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'

const formSchema = z.object({
  region: z.enum(regionCodes),
  prefectures: z
    .string()
    .transform((val) => val.split(',').map((n) => +n))
    .catch([]),
})

export const useShopFilterForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const params = useParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formSchema.parse({
      prefectures: searchParams.get('prefectures'),
      region: params.region,
    }),
  })

  useEffect(() => {
    const subscription = form.watch((value, info) => {
      const params = new URLSearchParams(searchParams)
      params.delete('page')
      if (info.name === 'region' && info.type === 'change') {
        params.delete('prefectures')
        router.push(`${value.region}/?${params.toString()}`, { scroll: false })
        return
      }
      if (value.prefectures && value.prefectures.length > 0) {
        params.set('prefectures', value.prefectures.join(',').toLowerCase())
      } else {
        params.delete('prefectures')
      }
      params.sort()
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
    return () => subscription.unsubscribe()
  }, [form, pathname, router, searchParams])

  return form
}
