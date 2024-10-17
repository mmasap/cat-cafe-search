import { redirect } from 'next/navigation'
import { ContentLayout } from '@/components/layout/content-layout'
import { prefectureData, regionCodes } from '@/data/prefecture'
import db from '@/lib/db'
import { ShopCard } from './components/shop-card'
import { ShopFilter } from './components/shop-filter'
import { z } from 'zod'
import { Pagination } from '@/components/navigation/pagination'

const SHOP_TAKE_NUM = 12

type PageProps = {
  params: { region: string }
  searchParams: {
    page: number | undefined
    prefectures: string | undefined
  }
}

const shopFilterSchema = z
  .object({
    region: z.enum(regionCodes),
    page: z.coerce.number().min(1).catch(1),
    prefectures: z
      .string()
      .transform((v) => v.split(',').map((v) => +v))
      .pipe(z.array(z.number()).optional())
      .catch([]),
  })
  .transform((v) => {
    const regionPrefectures = prefectureData.filter((pref) => pref.region === v.region)
    const filteredPrefectures = regionPrefectures.filter((pref) =>
      v.prefectures?.includes(pref.code),
    )
    const prefectures = filteredPrefectures.length > 0 ? filteredPrefectures : regionPrefectures
    return {
      ...v,
      prefectures: prefectures.map((prefecture) => prefecture.enum),
    }
  })

export default async function Page({ params, searchParams }: PageProps) {
  try {
    const shopFilter = shopFilterSchema.parse({ ...params, ...searchParams })
    const shopCount = await getShopCount(shopFilter)
    const shops = await getShops(shopFilter)

    return (
      <ContentLayout title="店舗検索">
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
        <Pagination totalPages={Math.ceil(shopCount / SHOP_TAKE_NUM)} />
      </ContentLayout>
    )
  } catch (error) {
    return redirect('/shop')
  }
}

async function getShops(filter: z.infer<typeof shopFilterSchema>) {
  return db.shop.findMany({
    where: {
      prefecture: {
        in: filter.prefectures,
      },
    },
    take: SHOP_TAKE_NUM,
    skip: (filter.page - 1) * SHOP_TAKE_NUM,
  })
}

async function getShopCount(filter: z.infer<typeof shopFilterSchema>) {
  return db.shop.count({
    where: {
      prefecture: {
        in: filter.prefectures,
      },
    },
  })
}
