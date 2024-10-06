import { regionCodes } from '@/data/prefecture'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export type CatFilterFormSchema = UseFormReturn<z.infer<typeof formSchema>>

const formSchema = z.object({
  breeds: z
    .string()
    .transform((val) => val.toUpperCase().split(','))
    .catch([]),
  sex: z.enum(['none', 'male', 'female']).catch('none'),
  region: z.enum(regionCodes),
  prefectures: z
    .string()
    .transform((val) => val.split(',').map((n) => +n))
    .catch([]),
})

export const useCatFilterForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const params = useParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formSchema.parse({
      breeds: searchParams.get('breeds'),
      sex: searchParams.get('sex'),
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
      if (value.breeds && value.breeds.length > 0) {
        params.set('breeds', value.breeds.join(',').toLowerCase())
      } else {
        params.delete('breeds')
      }
      if (value.sex && value.sex !== 'none') {
        params.set('sex', value.sex.toLowerCase())
      } else {
        params.delete('sex')
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
