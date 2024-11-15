import db from '@/lib/db'
import { getBirthCats } from '@/features/cats/server/db'
import { CatCard } from '../cat/[region]/components/cat-card'
import { Store as StoreIcon, Cat as CatIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CardLink } from './_components/card-link'

const DISPLAY_BIRTH_CATS_COUNT = 6

export default async function Home() {
  const birthCats = await getRandomBirthCats()

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>検索</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 grid-cols-2">
          <CardLink href="/shop">
            <StoreIcon className="size-6" />
            <span>店舗検索</span>
          </CardLink>
          <CardLink href="/cat">
            <CatIcon className="size-6" />
            <span>猫検索</span>
          </CardLink>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>今月の猫</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 grid-cols-2 md:grid-cols-3">
          {birthCats.map((cat) => (
            <CatCard key={cat.id} cat={cat} />
          ))}
        </CardContent>
      </Card>
    </>
  )
}

async function getRandomBirthCats() {
  const birthCats = await getBirthCats()
  if (birthCats.length <= DISPLAY_BIRTH_CATS_COUNT) return birthCats
  const showCats = []
  for (let i = 0; i < DISPLAY_BIRTH_CATS_COUNT; i++) {
    showCats.push(...birthCats.splice(Math.floor(Math.random() * birthCats.length), 1))
  }
  return showCats
}
