import db from '@/lib/db'
import { getBirthCats as getBirthCatsSql } from '@prisma/client/sql'
import { CatCard } from '../cat/[region]/components/cat-card'
import { ContentLayout } from '@/components/layout/content-layout'

export default async function Home() {
  const birthCats = await getBirthCats()
  return (
    <ContentLayout title="猫検索">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {birthCats.map((cat) => (
          <CatCard key={cat.id} cat={cat} />
        ))}
      </div>
    </ContentLayout>
  )
}

async function getBirthCats() {
  const cats = await db.$queryRawTyped(getBirthCatsSql())
  return Promise.all(
    cats.map(async (cat) => {
      return {
        ...cat,
        Shop: await db.shop.findUniqueOrThrow({ where: { id: cat.shopId } }),
      }
    }),
  )
}
