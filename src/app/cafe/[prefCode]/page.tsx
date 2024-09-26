import { redirect } from 'next/navigation'
import { ContentLayout } from '@/components/layout/content-layout'
import { prefectureData } from '@/data/prefecture'
import db from '@/lib/db'
import { CafeCard } from './_components/CafeCard'
import { CafeFilter } from './_components/CafeFilter'
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
  catSex: z.nativeEnum(SexEnum).optional(),
})

export default async function Page({
  params,
  searchParams,
}: {
  params: { prefCode: string }
  searchParams: { catBreeds: string | string[] | undefined; catSex: string | undefined }
}) {
  const prefecture = prefectureData.find((pref) => pref.code === +params.prefCode)

  if (!prefecture) redirect('/cats')

  const catFilter = catFilterSchema.safeParse({
    catBreeds: searchParams.catBreeds,
    catSex: searchParams.catSex,
  })

  const cats = await db.cat.findMany({
    where: {
      CatCafeDetail: {
        prefectureId: prefecture.id,
      },
      catBreedId: {
        in: catFilter.data?.catBreeds,
      },
      sex: catFilter.data?.catSex,
    },
    include: { CatBreed: true },
  })

  const catBreeds = await db.catBreed.findMany()

  return (
    <ContentLayout title={`猫カフェ検索 - ${prefecture.name}`}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <CafeFilter catBreeds={catBreeds} defaultValues={catFilter.data?.catBreeds} />
        </div>
        <div className="col-span-9">
          <div className="grid grid-cols-3 gap-4">
            {cats.map((cat) => (
              <CafeCard key={cat.id} cat={cat} />
            ))}
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}
