import { PrismaClient, CatBreedEnum } from '@prisma/client'

const prisma = new PrismaClient()

export const createCatBreeds = async () => {
  await prisma.catBreed.createMany({
    data: [
      {
        id: CatBreedEnum.MINUET,
        name: 'ミヌエット',
      },
      {
        id: CatBreedEnum.PERSIAN,
        name: 'ペルシャ',
      },
      {
        id: CatBreedEnum.OTHER,
        name: 'その他',
      },
    ],
  })
}
