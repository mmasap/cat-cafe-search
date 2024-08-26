'use client'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useQueryParameter } from '@/hooks/useQueryParameter'
import { CatBreed, CatBreedEnum } from '@prisma/client'

const SELECT_ALL = 'ALL'

type SelectPrefectureProps = {
  selectedCatBreed?: CatBreedEnum
  catBreeds: CatBreed[]
}

export default function SelectCatBreed(props: SelectPrefectureProps) {
  const { updateQueryParameter } = useQueryParameter()
  const selectCatBreeds = [{ id: SELECT_ALL, name: '全て' }, ...props.catBreeds]
  const selectDefaultValue = props.selectedCatBreed ?? SELECT_ALL

  function handleChange(val: string) {
    updateQueryParameter(val === SELECT_ALL ? undefined : val)
  }

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="catBreed">猫の種類</Label>
      <Select onValueChange={handleChange} defaultValue={selectDefaultValue}>
        <SelectTrigger id="catBreed" className="w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {selectCatBreeds.map((catBreed) => (
            <SelectItem key={catBreed.id} value={catBreed.id}>
              {catBreed.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
