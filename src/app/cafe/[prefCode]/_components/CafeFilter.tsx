'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CatBreedEnum } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/components/ui/form'

type CafeFilterProps = {
  defaultValues?: CatBreedEnum[]
}

const FormSchema = z.object({
  catBreeds: z.array(z.string()),
  catSex: z.enum(['none', 'male', 'female']).optional(),
})

export const CafeFilter = ({ defaultValues }: CafeFilterProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      catBreeds: defaultValues || [],
      catSex: 'none',
    },
  })

  useEffect(() => {
    const subscription = form.watch((value) => {
      const params = new URLSearchParams(searchParams)
      if (value.catBreeds && value.catBreeds.length > 0) {
        params.set('catBreeds', value.catBreeds.join(','))
      } else {
        params.delete('catBreeds')
      }
      if (value.catSex && value.catSex !== 'none') {
        params.set('catSex', value.catSex)
      } else {
        params.delete('catSex')
      }
      params.sort()
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
    return () => subscription.unsubscribe()
  }, [form, pathname, router, searchParams])

  return (
    <Form {...form}>
      <form className="space-y-6"></form>
    </Form>
  )
}
