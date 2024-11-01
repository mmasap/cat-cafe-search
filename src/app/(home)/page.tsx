import db from '@/lib/db'
import { getBirthCats as getBirthCatsSql } from '@prisma/client/sql'
import { CatCard } from '../cat/[region]/components/cat-card'
import * as Icon from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function Home() {
  const birthCats = await getBirthCats()
  const displayCats = getRandomCats(birthCats)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>検索</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 grid-cols-2">
          <Link
            href="/cat"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Icon.Store className="mb-3 h-6 w-6" />
            店舗検索
          </Link>
          <Link
            href="/cat"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Icon.Cat className="mb-3 h-6 w-6" />
            猫検索
          </Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>今月の猫</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 grid-cols-2 md:grid-cols-3">
          {displayCats.map((cat) => (
            <CatCard key={cat.id} cat={cat} />
          ))}
        </CardContent>
      </Card>
    </>
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

function getRandomCats(cats: Awaited<ReturnType<typeof getBirthCats>>, num = 6) {
  if (cats.length <= num) return cats
  const showCats = []
  for (let i = 0; i < num; i++) {
    showCats.push(...cats.splice(Math.floor(Math.random() * cats.length), 1))
  }
  return showCats
}
