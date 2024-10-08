import { redirect } from 'next/navigation'
import { ContentLayout } from '@/components/layout/content-layout'
import { prefectureData, regionCodes } from '@/data/prefecture'
import db from '@/lib/db'
import { CatCard } from './components/cat-card'
import { CatFilter } from './components/cat-filter'
import { CatBreedEnum, SexEnum, type Prisma } from '@prisma/client'
import { z } from 'zod'
import { Pagination } from '@/components/navigation/pagination'
import { NoCat } from './components/no-cat'

type PageProps = {
  params: { region: string }
  searchParams: {
    page: number | undefined
    catBreeds: string | string[] | undefined
    catSex: string | undefined
  }
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
    const catFilter = catFilterSchema.parse({ ...params, ...searchParams })
    const catWhere = createCatWhere(catFilter)
    const catCount = await getCatCount(catWhere)
    const cats = await getCats(catWhere, catFilter.page)

    return (
      <ContentLayout title="猫検索">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <CatFilter />
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-4">
            {cats.length === 0 && <NoCat />}
            {cats.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {cats.map((cat) => (
                  <CatCard key={cat.id} cat={cat} />
                ))}
              </div>
            )}
            <Pagination totalPages={Math.ceil(catCount / CAT_TAKE_NUM)} />
          </div>
        </div>
      </ContentLayout>
    )
  } catch (e) {
    console.log(e)
    return redirect('/cat')
  }
}

function createCatWhere(catFilter: z.infer<typeof catFilterSchema>): Prisma.CatWhereInput {
  return {
    ShopDetail: {
      prefecture: {
        in: catFilter.prefectures,
      },
    },
    catBreed: {
      in: catFilter.breeds,
    },
    sex: catFilter.sex,
  }
}

function getCatCount(where: Prisma.CatWhereInput) {
  return db.cat.count({ where })
}

function getCats(where: Prisma.CatWhereInput, page: number) {
  return db.cat.findMany({
    where,
    include: {
      ShopDetail: {
        include: { Shop: true },
      },
    },
    take: CAT_TAKE_NUM,
    skip: (page - 1) * CAT_TAKE_NUM,
  })
}