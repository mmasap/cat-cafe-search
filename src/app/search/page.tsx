import db from '@/lib/db'
import SelectPrefecture from './_components/SelectPrefecture'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SelectCatBreed from './_components/SelectCatBreed'
import { CatBreedEnum, PrefectureEnum } from '@prisma/client'
import { z } from 'zod'

type SearchProps = {
  searchParams: {
    prefecture: string
    catBreed: string
  }
}

const searchParamsSchema = z.object({
  prefecture: z
    .string()
    .optional()
    .transform((val) => {
      const prefectureVal = val && val.toUpperCase()
      if (prefectureVal && prefectureVal in PrefectureEnum) return prefectureVal
    })
    .pipe(z.union([z.undefined(), z.nativeEnum(PrefectureEnum)])),
  catBreed: z
    .string()
    .optional()
    .transform((val) => {
      const catBreedVal = val && val.toUpperCase()
      if (catBreedVal && catBreedVal in CatBreedEnum) return catBreedVal
    })
    .pipe(z.union([z.undefined(), z.nativeEnum(CatBreedEnum)])),
})

export default async function Search(props: SearchProps) {
  const { prefecture, catBreed } = searchParamsSchema.parse(props.searchParams)
  const cats = await db.cat.findMany({
    where: {
      CatCafeDetail: {
        prefectureId: prefecture,
      },
      catBreedId: catBreed,
    },
    include: { CatImage: true, CatBreed: true },
  })

  console.log(cats)

  return (
    <>
      <SearchCard selectedCatBreed={catBreed} selectedPrefecture={prefecture} />
      {cats.map((cat) => (
        <p key={cat.id}>{cat.name}</p>
      ))}
    </>
  )
}

type SearchCardProps = {
  selectedPrefecture?: PrefectureEnum
  selectedCatBreed?: CatBreedEnum
}

async function SearchCard(props: SearchCardProps) {
  const prefectures = await db.prefecture.findMany()
  const catBreeds = await db.catBreed.findMany()
  return (
    <>
      <Card>
        <CardHeader className="pb-1">
          <CardTitle className="text-base">検索条件</CardTitle>
        </CardHeader>
        <CardContent className="flex">
          <SelectPrefecture
            selectedPrefecture={props.selectedPrefecture}
            prefectures={prefectures}
          />
          <SelectCatBreed selectedCatBreed={props.selectedCatBreed} catBreeds={catBreeds} />
        </CardContent>
      </Card>
    </>
  )
}
