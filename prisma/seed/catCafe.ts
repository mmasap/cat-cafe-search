import { PrismaClient, PrefectureEnum, CatBreedEnum, SexEnum } from '@prisma/client'

const prisma = new PrismaClient()

export const createCatCafes = async () => {
  const catCafeMocha = await prisma.catCafe.create({
    data: {
      name: '猫カフェMOCHA',
      url: 'https://catmocha.jp/',
    },
  })
  const catCafeMochaIkebukuro = await prisma.catCafeDetail.create({
    data: {
      catCafeId: catCafeMocha.id,
      name: '池袋西口店',
      address: '東京都豊島区西池袋1-15-6 豊島会館3F',
      open: '10:00',
      close: '20:00',
      lastEntry: '19:30',
      url: 'https://catmocha.jp/shop/ikebukuro/',
      prefectureId: PrefectureEnum.TOKYO,
    },
  })

  await prisma.cat.create({
    data: {
      catCafeDetailId: catCafeMochaIkebukuro.id,
      name: '政宗',
      sex: SexEnum.MALE,
      catBreedId: CatBreedEnum.MINUET,
      birthDate: new Date('2018-01-30'),
      CatImage: {
        create: {
          image: 'https://catmocha.jp/images/cat/ikebukuro/47/DSC_8474_00001.jpg',
        },
      },
    },
  })

  await prisma.cat.create({
    data: {
      catCafeDetailId: catCafeMochaIkebukuro.id,
      name: '虎太郎',
      sex: SexEnum.MALE,
      catBreedId: CatBreedEnum.MINUET,
      birthDate: new Date('2018-02-14'),
      CatImage: {
        createMany: {
          data: [
            {
              image: 'https://catmocha.jp/images/cat/ikebukuro/47/DSC_8474_00001.jpg',
            },
          ],
        },
      },
    },
  })
}
