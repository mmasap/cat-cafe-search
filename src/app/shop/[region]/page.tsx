import { redirect } from 'next/navigation'
import { ContentLayout } from '@/components/layout/content-layout'
import { prefectureData } from '@/data/prefecture'
import db from '@/lib/db'
import { ShopCard } from './_components/shop-card'
import { ShopFilter } from './_components/shop-filter'
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
}: {
  params: { region: string }
  searchParams: {
    catBreeds: string | string[] | undefined
    catSex: string | undefined
  }
}) {
  const prefectures = prefectureData.filter((pref) => pref.region === params.region.toLowerCase())

  if (!prefectures) redirect('/shop')

  const shops = await db.shop.findMany({
    where: {
      prefecture: {
        in: prefectures.map((prefecture) => prefecture.enum),
      },
    },
  })

  return (
    <ContentLayout title="猫カフェ検索 - 関東">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <ShopFilter />
        </div>
        <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-4">
          {shops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </div>
    </ContentLayout>
  )
}
