import { PrismaClient, PrefectureEnum, CatBreedEnum, SexEnum } from '@prisma/client'

const prisma = new PrismaClient()

export const createShops = async () => {
  const shopMocha = await prisma.shop.create({
    data: {
      name: '猫カフェMOCHA',
      url: 'https://catmocha.jp/',
    },
  })
  const catCafeMochaIkebukuro = await prisma.shopDetail.create({
    data: {
      shopId: shopMocha.id,
      name: '池袋西口店',
      address: '東京都豊島区西池袋1-15-6 豊島会館3F',
      open: '10:00',
      close: '20:00',
      lastEntry: '19:30',
      url: 'https://catmocha.jp/shop/ikebukuro/',
      image: 'https://catmocha.jp/assets/img/shoplist/img-kanto01.jpg',
      prefecture: PrefectureEnum.TOKYO,
    },
  })

  await prisma.cat.createMany({
    data: [
      {
        shopDetailId: catCafeMochaIkebukuro.id,
        name: '政宗',
        sex: SexEnum.MALE,
        catBreed: CatBreedEnum.MINUET,
        birthDate: new Date('2018-01-30'),
        image: 'https://catmocha.jp/images/cat/ikebukuro/47/DSC_8474_00001.jpg',
        instagram: 'https://www.instagram.com/explore/tags/mocha%E6%94%BF%E5%AE%97/',
        youtube: 'https://www.youtube.com/watch?v=Ntgro328FC0',
      },
      {
        shopDetailId: catCafeMochaIkebukuro.id,
        name: '虎太郎',
        sex: SexEnum.MALE,
        catBreed: CatBreedEnum.MINUET,
        birthDate: new Date('2018-02-14'),
        image: 'https://catmocha.jp/images/cat/ikebukuro/48/DSC_3660_00001.jpg',
        instagram: 'https://www.instagram.com/explore/tags/mocha%E8%99%8E%E5%A4%AA%E9%83%8E/',
        youtube: 'https://www.youtube.com/watch?v=JBKECTL7hQU',
      },
      {
        shopDetailId: catCafeMochaIkebukuro.id,
        name: 'ほくろ',
        sex: SexEnum.MALE,
        catBreed: CatBreedEnum.PERSIAN,
        birthDate: new Date('2018-02-26'),
        image: 'https://catmocha.jp/images/cat/ikebukuro/54/%E3%81%BB%E3%81%8F%E3%82%8D.jpg',
        instagram: 'https://www.instagram.com/explore/tags/mocha%E3%81%BB%E3%81%8F%E3%82%8D/',
        youtube: 'https://www.youtube.com/watch?v=V1_-qYwkDCA',
      },
      {
        shopDetailId: catCafeMochaIkebukuro.id,
        name: 'みにー',
        sex: SexEnum.FEMALE,
        catBreed: CatBreedEnum.MUNCHKIN,
        birthDate: new Date('2018-03-09'),
        image: 'https://catmocha.jp/images/cat/ikebukuro/55/DSC_6607_00001.jpg',
      },
      {
        shopDetailId: catCafeMochaIkebukuro.id,
        name: 'しゃけ',
        sex: SexEnum.FEMALE,
        catBreed: CatBreedEnum.MINUET,
        birthDate: new Date('2018-12-05'),
        image: 'https://catmocha.jp/images/cat/ikebukuro/58/DSC_3909_00001.jpg',
      },
      {
        shopDetailId: catCafeMochaIkebukuro.id,
        name: 'エルサ',
        sex: SexEnum.FEMALE,
        catBreed: CatBreedEnum.SCOTTISH_FOLD,
        birthDate: new Date('2019-01-30'),
        image: 'https://catmocha.jp/images/cat/ikebukuro/59/DSC_8680_00001.jpg',
      },
      {
        shopDetailId: catCafeMochaIkebukuro.id,
        name: 'いのり',
        sex: SexEnum.FEMALE,
        catBreed: CatBreedEnum.NORWEGIAN_FOREST_CAT,
        birthDate: new Date('2019-05-26'),
        image:
          'https://catmocha.jp/images/cat/ikebukuro/60/%E8%A5%BF%E5%8F%A3%E5%BA%97%20%E3%81%84%E3%81%AE%E3%82%8A.JPEG',
      },
      {
        shopDetailId: catCafeMochaIkebukuro.id,
        name: 'ロア',
        sex: SexEnum.FEMALE,
        catBreed: CatBreedEnum.RAGDOLL,
        birthDate: new Date('2020-10-10'),
        image:
          'https://catmocha.jp/images/cat/ikebukuro/62/%E8%A5%BF%E5%8F%A3%E5%BA%97%E3%83%AD%E3%82%A2.JPEG',
      },
      {
        shopDetailId: catCafeMochaIkebukuro.id,
        name: 'このみ',
        sex: SexEnum.FEMALE,
        catBreed: CatBreedEnum.MUNCHKIN,
        birthDate: new Date('2021-01-07'),
        image:
          'https://catmocha.jp/images/cat/ikebukuro/62/%E8%A5%BF%E5%8F%A3%E5%BA%97%E3%83%AD%E3%82%A2.JPEG',
      },
      {
        shopDetailId: catCafeMochaIkebukuro.id,
        name: 'ソル',
        sex: SexEnum.MALE,
        catBreed: CatBreedEnum.SCOTTISH_FOLD,
        birthDate: new Date('2021-12-17'),
        image: 'https://catmocha.jp/images/cat/ikebukuro/64/DSC_7521_00001.jpg',
      },
      {
        shopDetailId: catCafeMochaIkebukuro.id,
        name: 'おむすび',
        sex: SexEnum.MALE,
        catBreed: CatBreedEnum.SCOTTISH_FOLD,
        birthDate: new Date('2022-02-03'),
        image: 'https://catmocha.jp/images/cat/ikebukuro/65/DSC_1530_01.JPG',
      },
      {
        shopDetailId: catCafeMochaIkebukuro.id,
        name: 'タロ美',
        sex: SexEnum.FEMALE,
        catBreed: CatBreedEnum.EXOTIC_SHORT_HAIR,
        birthDate: new Date('2022-05-10'),
        image: 'https://catmocha.jp/images/cat/ikebukuro/67/P4133415.jpg',
      },
      {
        shopDetailId: catCafeMochaIkebukuro.id,
        name: 'セレーナ',
        sex: SexEnum.FEMALE,
        catBreed: CatBreedEnum.RAGAMUFFIN,
        birthDate: new Date('2022-05-10'),
        image:
          'https://catmocha.jp/images/cat/ikebukuro/68/%E3%82%BB%E3%83%AC%E3%83%BC%E3%83%8A.jpeg',
      },
      {
        shopDetailId: catCafeMochaIkebukuro.id,
        name: '水綺（みずき）',
        sex: SexEnum.FEMALE,
        catBreed: CatBreedEnum.RAGDOLL,
        birthDate: new Date('2022-09-03'),
        image: 'https://catmocha.jp/images/cat/ikebukuro/69/%E6%B0%B4%E7%B6%BA.jpeg',
      },
      {
        shopDetailId: catCafeMochaIkebukuro.id,
        name: 'ゆうゆ',
        sex: SexEnum.FEMALE,
        catBreed: CatBreedEnum.BRITISH_SHORT_HAIR,
        birthDate: new Date('2022-09-29'),
        image: 'https://catmocha.jp/images/cat/ikebukuro/70/IMG_9794_1_11zon.jpeg',
      },
      {
        shopDetailId: catCafeMochaIkebukuro.id,
        name: '瞬',
        sex: SexEnum.MALE,
        catBreed: CatBreedEnum.AMERICAN_SHORT_HAIR,
        birthDate: new Date('2022-09-29'),
        image: 'https://catmocha.jp/images/cat/ikebukuro/71/P4133462_1_11zon.jpeg',
      },
      {
        shopDetailId: catCafeMochaIkebukuro.id,
        name: 'わたぱち',
        sex: SexEnum.MALE,
        catBreed: CatBreedEnum.AMERICAN_SHORT_HAIR,
        birthDate: new Date('2022-10-29'),
        image: 'https://catmocha.jp/images/cat/ikebukuro/72/IMG_9781_11zon.jpg',
      },
    ],
  })
}
