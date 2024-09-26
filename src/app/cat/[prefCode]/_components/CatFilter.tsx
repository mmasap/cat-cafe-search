'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CatBreed, CatBreedEnum } from '@prisma/client'
import { Checkbox } from '@/components/ui/checkbox'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type CatFilterProps = {
  catBreeds: CatBreed[]
  defaultValues?: CatBreedEnum[]
}

const FormSchema = z.object({
  catBreeds: z.array(z.string()),
  catSex: z.enum(['none', 'male', 'female']).optional(),
})

export const CatFilter = ({ catBreeds, defaultValues }: CatFilterProps) => {
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
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="catBreeds"
          render={() => (
            <FormItem>
              <FormLabel className="text-base">猫種</FormLabel>

              {catBreeds.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="catBreeds"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(field.value?.filter((value) => value !== item.id))
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{item.name}</FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="catSex"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">性別</FormLabel>

              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="none">未指定</SelectItem>
                    <SelectItem value="MALE">オス</SelectItem>
                    <SelectItem value="FEMALE">メス</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
