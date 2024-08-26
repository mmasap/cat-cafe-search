'use client'
import { PrefectureEnum } from '@prisma/client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Prefecture } from '@prisma/client'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { useQueryParameter } from '@/hooks/useQueryParameter'

const SELECT_ALL = 'ALL'

type SelectPrefectureProps = {
  selectedPrefecture?: PrefectureEnum
  prefectures: Prefecture[]
}

export default function SelectPrefecture(props: SelectPrefectureProps) {
  const { updateQueryParameter } = useQueryParameter()
  const selectPrefectures = [{ id: SELECT_ALL, name: '全国' }, ...props.prefectures]
  const selectDefaultValue = props.selectedPrefecture ?? SELECT_ALL

  function handleChange(val: string) {
    updateQueryParameter(val === SELECT_ALL ? undefined : val)
  }

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="prefecture">都道府県</Label>
      <Select onValueChange={handleChange} defaultValue={selectDefaultValue}>
        <SelectTrigger id="prefecture" className="w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {selectPrefectures.map((prefecture) => (
            <SelectItem key={prefecture.id} value={prefecture.id}>
              {prefecture.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
