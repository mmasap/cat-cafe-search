import { getBirthCats as getBirthCatsSql } from '@prisma/client/sql'
import db from '@/lib/db'
import { unstable_cache } from '@/lib/unstable-cache'

export function getBirthCats() {
  const month = new Date().getMonth() + 1
  const cacheFn = unstable_cache(getBirthCatsInner, ['birthCats', month.toString()], {
    revalidate: 60 * 60 * 24,
  })
  return cacheFn()
}

async function getBirthCatsInner() {
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
