import { PrismaClient } from '@prisma/client'
import { createCatCafes } from './seed/catCafe'

const prisma = new PrismaClient()

async function main() {
  await prisma.catImage.deleteMany()
  await prisma.cat.deleteMany()
  await prisma.catCafeDetail.deleteMany()
  await prisma.catCafe.deleteMany()
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
