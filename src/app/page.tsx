import db from '@/lib/db'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default async function Home() {
  const catBreeds = await db.catBreed.findMany()
  const cats = await db.cat
    .findMany({ include: { CatImage: true, CatBreed: true } })
    .then((cats) => {
      return cats.map((cat) => ({
        ...cat,
        sex: cat.sex === 'MALE' ? 'オス' : 'メス',
      }))
    })
  if (!cats) return

  return (
    <>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {catBreeds.map((catBreed) => (
            <SelectItem key={catBreed.id} value={catBreed.id}>
              {catBreed.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="grid">
        {cats.map((cat) => (
          <Image
            key={cat.id}
            src={cat.CatImage[0].image}
            alt={cat.name}
            width={200}
            height={150}
            className="h-auto w-auto object-cover"
          />
        ))}
      </div>
    </>
  )
}
