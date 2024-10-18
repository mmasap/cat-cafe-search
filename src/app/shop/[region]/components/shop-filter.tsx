'use client'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { prefectureData, regions } from '@/data/prefecture'
import { useShopFilterForm } from '../hooks/use-shop-filter'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useParams } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'

export const ShopFilter = () => {
  const form = useShopFilterForm()
  const params = useParams()

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">地域</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {regions.map((region) => (
                      <SelectItem key={region.code} value={region.code}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prefectures"
          render={() => (
            <FormItem>
              <FormLabel className="text-base">都道府県</FormLabel>
              {prefectureData
                .filter((prefecture) => prefecture.region === params.region)
                .map((prefecture) => (
                  <FormField
                    key={prefecture.code}
                    control={form.control}
                    name="prefectures"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={prefecture.code}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(prefecture.code)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange(
                                      [...field.value, prefecture.code].sort((a, b) => a - b),
                                    )
                                  : field.onChange(
                                      field.value?.filter((value) => value !== prefecture.code),
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{prefecture.name}</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
