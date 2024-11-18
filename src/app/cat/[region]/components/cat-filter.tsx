'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { useParams } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CAT_BREED_LIST } from '@/data/cat-breed'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { prefectureData, regions } from '@/data/prefecture'
import { type CatFilterFormSchema, useCatFilterForm } from '../hooks/use-cat-filter'

export const CatFilter = () => {
  const form = useCatFilterForm()
  return (
    <>
      <CatFilterFormMobile form={form} />
      <CatFilterForm form={form} />
    </>
  )
}

const CatFilterFormMobile = ({ form }: { form: CatFilterFormSchema }) => {
  return (
    <Dialog>
      <div className="md:hidden grid grid-cols-2 gap-2">
        <Form {...form}>
          <form>
            <FormFieldRegion isMobile form={form} />
          </form>
        </Form>
        <DialogTrigger asChild>
          <Button className="w-fit">フィルタ</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="w-11/12 h-5/6">
        <DialogHeader>
          <DialogTitle>検索条件</DialogTitle>
          <DialogDescription className="hidden">Filter</DialogDescription>
        </DialogHeader>
        <ScrollArea>
          <Form {...form}>
            <form className="space-y-4">
              <FormFieldPrefecture form={form} />
              <FormFieldBreed form={form} />
              <FormFieldSex form={form} />
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

const CatFilterForm = ({ form }: { form: CatFilterFormSchema }) => {
  return (
    <Form {...form}>
      <form className="space-y-4 hidden md:block">
        <FormFieldRegion form={form} />
        <FormFieldPrefecture form={form} />
        <FormFieldBreed form={form} />
        <FormFieldSex form={form} />
      </form>
    </Form>
  )
}

const FormFieldRegion = ({ form, isMobile }: { form: CatFilterFormSchema; isMobile?: boolean }) => {
  return (
    <FormField
      control={form.control}
      name="region"
      render={({ field }) => (
        <FormItem className={isMobile ? 'flex items-center space-y-0 gap-2' : undefined}>
          <FormLabel className="text-base whitespace-nowrap">地域</FormLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
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
  )
}

const FormFieldPrefecture = ({ form }: { form: CatFilterFormSchema }) => {
  const params = useParams()
  return (
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
                              ? field.onChange([...field.value, prefecture.code])
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
  )
}

const FormFieldBreed = ({ form }: { form: CatFilterFormSchema }) => {
  return (
    <FormField
      control={form.control}
      name="breeds"
      render={() => (
        <FormItem>
          <FormLabel className="text-base">猫種</FormLabel>
          {[...CAT_BREED_LIST]
            .sort((a, b) => {
              if (a.name === 'その他' || b.name === 'その他') return 1
              return (a.name.codePointAt(0) ?? 0) - (b.name.codePointAt(0) ?? 0)
            })
            .map((catBreed) => (
              <FormField
                key={catBreed.enum}
                control={form.control}
                name="breeds"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={catBreed.enum}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(catBreed.enum)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, catBreed.enum])
                              : field.onChange(
                                  field.value?.filter((value) => value !== catBreed.enum),
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{catBreed.name}</FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
        </FormItem>
      )}
    />
  )
}

const FormFieldSex = ({ form }: { form: CatFilterFormSchema }) => {
  return (
    <FormField
      control={form.control}
      name="sex"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base">性別</FormLabel>
          <Select value={field.value ?? 'none'} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="none">未指定</SelectItem>
                <SelectItem value="male">オス</SelectItem>
                <SelectItem value="female">メス</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}
