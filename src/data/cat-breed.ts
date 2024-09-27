import { CatBreedEnum } from '@prisma/client'

type CatBreed = { [key: string]: { name: string } }

export const catBreedObj: CatBreed = {
  [CatBreedEnum.MINUET]: {
    name: 'ミヌエット',
  },
  [CatBreedEnum.MUNCHKIN]: {
    name: 'マンチカン',
  },
  [CatBreedEnum.PERSIAN]: {
    name: 'ペルシアン',
  },
  [CatBreedEnum.OTHER]: {
    name: 'その他',
  },
}
