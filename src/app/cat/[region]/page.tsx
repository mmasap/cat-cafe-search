import { redirect } from 'next/navigation'
import { ContentLayout } from '@/components/layout/content-layout'
import { prefectureData, regionCodes } from '@/data/prefecture'
import { CatCard } from './components/cat-card'
import { CatFilter } from './components/cat-filter'
import { CatBreedEnum, SexEnum, type Prisma } from '@prisma/client'
import { z } from 'zod'
import { Pagination } from '@/components/navigation/pagination'
import { NoCat } from './components/no-cat'
import { getRegionCats } from '@/features/cats/server/db'

type PageProps = {
  params: Promise<{ region: string }>
  searchParams: Promise<{
    breeds: string | undefined
    sex: string | undefined
    page: number | undefined
    prefectures: string | undefined
  }>
}

const CAT_TAKE_NUM = 12

const catFilterSchema = z
  .object({
    region: z.enum(regionCodes),
    page: z.coerce.number().min(1).catch(1),
    prefectures: z
      .string()
      .transform((v) => v.split(',').map((v) => +v))
      .pipe(z.array(z.number()).optional())
      .catch([]),
    breeds: z
      .string()
      .transform((v) =>
        v
          .toUpperCase()
          .split(',')
          .filter((v) => Object.keys(CatBreedEnum).includes(v)),
      )
      .pipe(z.array(z.nativeEnum(CatBreedEnum)).optional())
      .catch(undefined),
    sex: z
      .string()
      .transform((v) => v.toUpperCase())
      .pipe(z.nativeEnum(SexEnum).optional())
      .catch(undefined),
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
    const catFilter = catFilterSchema.parse({ ...(await params), ...(await searchParams) })
    const filteredCats = await getFilteredCats(catFilter)
    return (
      <ContentLayout title="猫検索">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <CatFilter />
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-4">
            {filteredCats.length === 0 && <NoCat />}
            {filteredCats.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                {filteredCats
                  .splice((catFilter.page - 1) * CAT_TAKE_NUM, CAT_TAKE_NUM)
                  .map((cat) => (
                    <CatCard key={cat.id} cat={cat} />
                  ))}
              </div>
            )}
            <Pagination totalPages={Math.ceil(filteredCats.length / CAT_TAKE_NUM)} />
          </div>
        </div>
      </ContentLayout>
    )
  } catch (e) {
    console.log(e)
    return redirect('/cat')
  }
}

async function getFilteredCats(filter: z.infer<typeof catFilterSchema>) {
  const regionCats = await getRegionCats(filter.region)
  return regionCats.filter((cat) => {
    if (filter.breeds && !filter.breeds.includes(cat.catBreed)) return false
    if (filter.sex && filter.sex !== cat.sex) return false
    if (!filter.prefectures.includes(cat.Shop.prefecture)) return false
    return true
  })
}
