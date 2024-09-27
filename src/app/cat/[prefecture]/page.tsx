import { redirect } from 'next/navigation'
import { ContentLayout } from '@/components/layout/content-layout'
import { Prefecture, prefectureData } from '@/data/prefecture'
import db from '@/lib/db'
import { CatCard } from './_components/CatCard'
import { CatFilter } from './_components/CatFilter'
import { CatBreedEnum, SexEnum, Prisma, PrefectureEnum } from '@prisma/client'
import { z } from 'zod'
import { Pagination } from './_components/Pagination'
import { NoCat } from './_components/NoCat'

type PageProps = {
  params: { prefecture: string }
  searchParams: { catBreeds: string | string[] | undefined; catSex: string | undefined }
}

const CAT_TAKE_NUM = 12

const catFilterSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  catBreeds: z.preprocess(
    (val) => {
      if (typeof val === 'string') return val.toUpperCase().split(',')
      if (Array.isArray(val)) return val.map((val) => String(val).toUpperCase())
    },
    z.array(z.nativeEnum(CatBreedEnum)).optional(),
  ),
  catSex: z.preprocess((val) => val && String(val).toUpperCase(), z.nativeEnum(SexEnum).optional()),
})

type CatFilter = z.infer<typeof catFilterSchema>

export default async function Page({ params, searchParams }: PageProps) {
  try {
    const catFilter = catFilterSchema.parse(searchParams)
    const prefecture = getPrefecture(params)
    const catWhere = createCatWhere(prefecture, catFilter)
    const catCount = await getCatCount(catWhere)
    const cats = await getCats(catWhere, catFilter.page)

    return (
      <ContentLayout title={`猫検索 - ${prefecture.name}`}>
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
    return redirect('/cat')
  }
}

function createCatWhere(prefecture: Prefecture, catFilter: CatFilter): Prisma.CatWhereInput {
  return {
    CatCafeDetail: {
      prefecture: prefecture.enum,
    },
    catBreed: {
      in: catFilter.catBreeds,
    },
    sex: catFilter.catSex,
  }
}

function getCatCount(where: Prisma.CatWhereInput) {
  return db.cat.count({ where })
}

function getCats(where: Prisma.CatWhereInput, page: number) {
  return db.cat.findMany({
    where,
    include: {
      CatCafeDetail: {
        include: { CatCafe: true },
      },
    },
    take: CAT_TAKE_NUM,
    skip: (page - 1) * CAT_TAKE_NUM,
  })
}

function getPrefecture(params: PageProps['params']) {
  const prefecture = prefectureData.find((pref) => pref.enum === params.prefecture.toUpperCase())
  if (!prefecture) throw new Error('Invalid prefecture')
  return prefecture
}
