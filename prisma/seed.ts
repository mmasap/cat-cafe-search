import { PrismaClient } from '@prisma/client'
import { createMocha } from './seed/shop/mocha'

const prisma = new PrismaClient()

async function main() {
  await prisma.catImage.deleteMany()
  await prisma.cat.deleteMany()
  await prisma.shopDetail.deleteMany()
  await prisma.shop.deleteMany()
  await createMocha()
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
