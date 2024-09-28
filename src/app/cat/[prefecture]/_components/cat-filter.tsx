'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { type CatBreedEnum, SexEnum } from '@prisma/client'
import { Checkbox } from '@/components/ui/checkbox'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
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
import { catBreedObj } from '@/data/cat-breed'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type CatFilterProps = {
  defaultValues?: CatBreedEnum[]
}

const FormSchema = z.object({
  catBreeds: z.array(z.string()),
  catSex: z.enum(['none', 'male', 'female']).optional(),
})

export const CatFilter = ({ defaultValues }: CatFilterProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      catBreeds: searchParams.get('catBreeds')?.toUpperCase().split(',') ?? [],
      catSex: 'none',
    },
  })

  useEffect(() => {
    const subscription = form.watch((value) => {
      const params = new URLSearchParams(searchParams)
      params.delete('page')
      if (value.catBreeds && value.catBreeds.length > 0) {
        params.set('catBreeds', value.catBreeds.join(',').toLowerCase())
      } else {
        params.delete('catBreeds')
      }
      if (value.catSex && value.catSex !== 'none') {
        params.set('catSex', value.catSex.toLowerCase())
      } else {
        params.delete('catSex')
      }
      params.sort()
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
    return () => subscription.unsubscribe()
  }, [form, pathname, router, searchParams])

  return (
    <>
      <Dialog>
        <DialogTrigger asChild className="md:hidden">
          <Button>フィルタ</Button>
        </DialogTrigger>
        <DialogContent className="w-80">
          <DialogHeader>
            <DialogTitle>検索条件</DialogTitle>
            <DialogDescription className="hidden">Filter</DialogDescription>
          </DialogHeader>
          <CatFilterForm form={form} />
        </DialogContent>
      </Dialog>
      <CatFilterForm className="hidden md:block" form={form} />
    </>
  )
}

const CatFilterForm = ({
  className,
  form,
}: {
  className?: string
  form: UseFormReturn<z.infer<typeof FormSchema>>
}) => {
  return (
    <Form {...form}>
      <form className={cn('space-y-4', className)}>
        <FormField
          control={form.control}
          name="catBreeds"
          render={() => (
            <FormItem>
              <FormLabel className="text-base">猫種</FormLabel>
              {Object.keys(catBreedObj).map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name="catBreeds"
                  render={({ field }) => {
                    return (
                      <FormItem key={key} className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(key)}
                            onCheckedChange={(checked) => {
                              console.log(field.value)
                              return checked
                                ? field.onChange([...field.value, key])
                                : field.onChange(field.value?.filter((value) => value !== key))
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{catBreedObj[key].name}</FormLabel>
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
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="none">未指定</SelectItem>
                    <SelectItem value={SexEnum.MALE}>オス</SelectItem>
                    <SelectItem value={SexEnum.FEMALE}>メス</SelectItem>
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
