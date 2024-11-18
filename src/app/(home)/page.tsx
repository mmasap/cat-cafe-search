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
      <h2 className="text-2xl font-semibold tracking-tight">検索</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
        <CardLink href="/shop">
          <StoreIcon className="size-6" />
          <span>店舗検索</span>
        </CardLink>
        <CardLink href="/cat">
          <CatIcon className="size-6" />
          <span>猫検索</span>
        </CardLink>
      </div>
      <h2 className="text-2xl font-semibold tracking-tight">今月の猫</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
        {birthCats.map((cat) => (
          <CatCard key={cat.id} cat={cat} />
        ))}
      </div>
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
