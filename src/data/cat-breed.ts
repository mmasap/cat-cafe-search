import { CatBreedEnum } from '@prisma/client'

export const catBreeds = [
  {
    name: 'ミヌエット',
    enum: CatBreedEnum.MINUET,
  },
  {
    name: 'マンチカン',
    enum: CatBreedEnum.MUNCHKIN,
  },
  {
    name: 'ペルシアン',
    enum: CatBreedEnum.PERSIAN,
  },
]
