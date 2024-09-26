import { redirect } from 'next/navigation'
import { ContentLayout } from '@/components/layout/content-layout'
import { prefectureData } from '@/data/prefecture'
import db from '@/lib/db'
import { CatCard } from './_components/CatCard'
import { CatFilter } from './_components/CatFilter'
import { CatBreedEnum, SexEnum } from '@prisma/client'
import { z } from 'zod'

const catFilterSchema = z.object({
  catBreeds: z.preprocess(
    (val) => {
      if (typeof val === 'string') return val.toUpperCase().split(',')
      if (Array.isArray(val)) return val.map((val) => String(val).toUpperCase())
    },
    z.array(z.nativeEnum(CatBreedEnum)).optional(),
  ),
  catSex: z.preprocess((val) => val && String(val).toUpperCase(), z.nativeEnum(SexEnum).optional()),
})

export default async function Page({
  params,
  searchParams,
}: {
  params: { prefecture: string }
  searchParams: { catBreeds: string | string[] | undefined; catSex: string | undefined }
}) {
  const prefecture = prefectureData.find((pref) => pref.enum === params.prefecture.toUpperCase())
  if (!prefecture) redirect('/cat')

  const catFilter = catFilterSchema.safeParse(searchParams)

  const cats = await db.cat.findMany({
    where: {
      CatCafeDetail: {
        prefecture: prefecture.enum,
      },
      catBreed: {
        in: catFilter.data?.catBreeds,
      },
      sex: catFilter.data?.catSex,
    },
  })

  return (
    <ContentLayout title={`猫検索 - ${prefecture.name}`}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <CatFilter defaultValues={catFilter.data?.catBreeds} />
        </div>
        <div className="col-span-9">
          <div className="grid grid-cols-3 gap-4">
            {cats.map((cat) => (
              <CatCard key={cat.id} cat={cat} />
            ))}
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}
