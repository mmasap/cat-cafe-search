import { PrismaClient } from '@prisma/client'
import { createPrefectures } from './seed/prefecture'
import { createCatCafes } from './seed/catCafe'
import { createCatBreeds } from './seed/catBreed'

const prisma = new PrismaClient()

async function main() {
  await prisma.catImage.deleteMany()
  await prisma.cat.deleteMany()
  await prisma.catCafeDetail.deleteMany()
  await prisma.catCafe.deleteMany()
  await prisma.prefecture.deleteMany()
  await prisma.catBreed.deleteMany()
  await createPrefectures()
  await createCatBreeds()
  await createCatCafes()
}

main()
  .then(async () => {
    console.log('Seeding done!')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
