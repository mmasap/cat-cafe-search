import { redirect } from 'next/navigation'
import { ContentLayout } from '@/components/layout/content-layout'
import { prefectureData } from '@/data/prefecture'
import db from '@/lib/db'
import { CatCard } from './_components/CatCard'
import { CatFilter } from './_components/CatFilter'
import { CatBreedEnum } from '@prisma/client'
import { z } from 'zod'

const catFilterSchema = z.object({
  catBreeds: z.preprocess(
    (val) => {
      if (typeof val === 'string') return val.toUpperCase().split(',')
      if (Array.isArray(val)) return val.map((val) => String(val).toUpperCase())
    },
    z.array(z.nativeEnum(CatBreedEnum)),
  ),
})

export default async function Page({
  params,
  searchParams,
}: {
  params: { prefCode: string }
  searchParams: { catBreeds: string | string[] | undefined }
}) {
  const prefecture = prefectureData.find((pref) => pref.code === +params.prefCode)

  if (!prefecture) redirect('/cats')

  const catFilter = catFilterSchema.safeParse({ catBreeds: searchParams.catBreeds })

  const cats = await db.cat.findMany({
    where: {
      CatCafeDetail: {
        prefectureId: prefecture.id,
      },
      catBreedId: {
        in: catFilter.data?.catBreeds,
      },
    },
    include: { CatBreed: true },
  })

  const catBreeds = await db.catBreed.findMany()

  return (
    <ContentLayout title={`猫検索 - ${prefecture.name}`}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <CatFilter catBreeds={catBreeds} defaultValues={catFilter.data?.catBreeds} />
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
