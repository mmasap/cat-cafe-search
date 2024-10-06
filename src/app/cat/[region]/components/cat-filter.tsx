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
import { prefectureData, regions } from '@/data/prefecture'
import { type CatFilterFormSchema, useCatFilterForm } from '../hooks/use-cat-filter'

export const CatFilter = () => {
  const form = useCatFilterForm()
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

const CatFilterForm = ({ className, form }: { className?: string; form: CatFilterFormSchema }) => {
  const params = useParams()
  return (
    <Form {...form}>
      <form className={cn('space-y-4', className)}>
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
        <FormField
          control={form.control}
          name="breeds"
          render={() => (
            <FormItem>
              <FormLabel className="text-base">猫種</FormLabel>
              {Object.keys(catBreedObj).map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name="breeds"
                  render={({ field }) => {
                    return (
                      <FormItem key={key} className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(key)}
                            onCheckedChange={(checked) => {
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
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">性別</FormLabel>
              <Select value={field.value ?? 'none'} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
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
      </form>
    </Form>
  )
}

function select() {
  return (
    // <>
    // <Select value={field.value} onValueChange={field.onChange}>
    //                   <SelectTrigger className="w-full">
    //                     <SelectValue />
    //                   </SelectTrigger>
    //                   <SelectContent>
    //                     <SelectGroup>
    //                       <SelectItem value="hokkaido">北海道</SelectItem>
    //                       <SelectItem value="tohoku">東北</SelectItem>
    //                       <SelectItem value="kanto">関東</SelectItem>
    //                       <SelectItem value="chubu">中部</SelectItem>
    //                       <SelectItem value="kinki">近畿</SelectItem>
    //                       <SelectItem value="chugoku">中国</SelectItem>
    //                       <SelectItem value="shikoku">四国</SelectItem>
    //                       <SelectItem value="kyushu">九州</SelectItem>
    //                       <SelectItem value="okinawa">沖縄</SelectItem>
    //                     </SelectGroup>
    //                   </SelectContent>
    //                 </Select>
    // </>
    <></>
  )
}
