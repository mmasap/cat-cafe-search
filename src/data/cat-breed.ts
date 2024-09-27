import { CatBreedEnum } from '@prisma/client'

type CatBreed = { [key: string]: { name: string } }

export const catBreedObj: CatBreed = {
  [CatBreedEnum.AMERICAN_SHORT_HAIR]: {
    name: 'アメリカンショートヘア',
  },
  [CatBreedEnum.EXOTIC_SHORT_HAIR]: {
    name: 'エキゾチックショートヘア',
  },
  [CatBreedEnum.MINUET]: {
    name: 'ミヌエット',
  },
  [CatBreedEnum.MUNCHKIN]: {
    name: 'マンチカン',
  },
  [CatBreedEnum.PERSIAN]: {
    name: 'ペルシアン',
  },
  [CatBreedEnum.BRITISH_SHORT_HAIR]: {
    name: 'ブリティッシュショートヘア',
  },
  [CatBreedEnum.SCOTTISH_FOLD]: {
    name: 'スコティッシュフォールド',
  },
  [CatBreedEnum.NORWEGIAN_FOREST_CAT]: {
    name: 'ノルウェージャンフォレストキャット',
  },
  [CatBreedEnum.RAGDOLL]: {
    name: 'ラグドール',
  },
  [CatBreedEnum.RAGAMUFFIN]: {
    name: 'ラガマフィン',
  },
  [CatBreedEnum.OTHER]: {
    name: 'その他',
  },
}
