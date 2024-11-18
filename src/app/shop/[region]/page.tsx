import { redirect } from 'next/navigation'
import { ContentLayout } from '@/components/layout/content-layout'
import { prefectureData, regionCodes } from '@/data/prefecture'
import { ShopCard } from './components/shop-card'
import { ShopFilter } from './components/shop-filter'
import { z } from 'zod'
import { Pagination } from '@/components/navigation/pagination'
import { getRegionShops } from '@/features/shops/server/db/shops'

const SHOP_TAKE_NUM = 6

type PageProps = {
  params: Promise<{ region: string }>
  searchParams: Promise<{
    page: number | undefined
    prefectures: string | undefined
  }>
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
    const { region } = await params
    const { prefectures, page } = await searchParams
    const shopFilter = shopFilterSchema.parse({ region, prefectures, page })
    const filteredShops = await getFilteredShops(shopFilter)

    return (
      <ContentLayout title="店舗検索">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <ShopFilter />
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-4">
            {filteredShops
              .splice((shopFilter.page - 1) * SHOP_TAKE_NUM, SHOP_TAKE_NUM)
              .map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            <Pagination totalPages={Math.ceil(filteredShops.length / SHOP_TAKE_NUM)} />
          </div>
        </div>
      </ContentLayout>
    )
  } catch (error) {
    return redirect('/shop')
  }
}

async function getFilteredShops(filter: z.infer<typeof shopFilterSchema>) {
  const regionShops = await getRegionShops(filter.region)
  return regionShops.filter((shop) => {
    if (!filter.prefectures.includes(shop.prefecture)) return false
    return true
  })
}
