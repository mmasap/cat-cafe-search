import { PrismaClient, PrefectureEnum, CatBreedEnum, SexEnum } from '@prisma/client'

const prisma = new PrismaClient()

export const createMocha = async () => {
  const { id } = await prisma.shop.create({
    data: {
      name: '猫カフェMOCHA',
      url: 'https://catmocha.jp/',
    },
  })

  await createKanto(id)
  await createChubu(id)
  await createKinki(id)
  await createChugoku(id)
  await createShikoku(id)
  await createKyushu(id)
}

const createKanto = async (shopId: number) => {
  await prisma.shopDetail.create({
    data: {
      shopId,
      name: '池袋西口店',
      address: '東京都豊島区西池袋1-15-6 豊島会館3F',
      tel: '03-5927-8828',
      open: '10:00',
      close: '20:00',
      lastEntry: '19:30',
      url: 'https://catmocha.jp/shop/ikebukuro/',
      image: 'https://catmocha.jp/assets/img/shoplist/img-kanto01.jpg',
      prefecture: PrefectureEnum.TOKYO,
      Cat: {
        createMany: {
          data: [
            {
              name: '政宗',
              sex: SexEnum.MALE,
              catBreed: CatBreedEnum.MINUET,
              birthDate: new Date('2018-01-30'),
              image: 'https://catmocha.jp/images/cat/ikebukuro/47/DSC_8474_00001.jpg',
              instagram: 'https://www.instagram.com/explore/tags/mocha%E6%94%BF%E5%AE%97/',
              youtube: 'https://www.youtube.com/watch?v=Ntgro328FC0',
            },
            {
              name: '虎太郎',
              sex: SexEnum.MALE,
              catBreed: CatBreedEnum.MINUET,
              birthDate: new Date('2018-02-14'),
              image: 'https://catmocha.jp/images/cat/ikebukuro/48/DSC_3660_00001.jpg',
              instagram: 'https://www.instagram.com/explore/tags/mocha%E8%99%8E%E5%A4%AA%E9%83%8E/',
              youtube: 'https://www.youtube.com/watch?v=JBKECTL7hQU',
            },
            {
              name: 'ほくろ',
              sex: SexEnum.MALE,
              catBreed: CatBreedEnum.PERSIAN,
              birthDate: new Date('2018-02-26'),
              image: 'https://catmocha.jp/images/cat/ikebukuro/54/%E3%81%BB%E3%81%8F%E3%82%8D.jpg',
              instagram: 'https://www.instagram.com/explore/tags/mocha%E3%81%BB%E3%81%8F%E3%82%8D/',
              youtube: 'https://www.youtube.com/watch?v=V1_-qYwkDCA',
            },
            {
              name: 'みにー',
              sex: SexEnum.FEMALE,
              catBreed: CatBreedEnum.MUNCHKIN,
              birthDate: new Date('2018-03-09'),
              image: 'https://catmocha.jp/images/cat/ikebukuro/55/DSC_6607_00001.jpg',
            },
            {
              name: 'しゃけ',
              sex: SexEnum.FEMALE,
              catBreed: CatBreedEnum.MINUET,
              birthDate: new Date('2018-12-05'),
              image: 'https://catmocha.jp/images/cat/ikebukuro/58/DSC_3909_00001.jpg',
            },
            {
              name: 'エルサ',
              sex: SexEnum.FEMALE,
              catBreed: CatBreedEnum.SCOTTISH_FOLD,
              birthDate: new Date('2019-01-30'),
              image: 'https://catmocha.jp/images/cat/ikebukuro/59/DSC_8680_00001.jpg',
            },
            {
              name: 'いのり',
              sex: SexEnum.FEMALE,
              catBreed: CatBreedEnum.NORWEGIAN_FOREST_CAT,
              birthDate: new Date('2019-05-26'),
              image:
                'https://catmocha.jp/images/cat/ikebukuro/60/%E8%A5%BF%E5%8F%A3%E5%BA%97%20%E3%81%84%E3%81%AE%E3%82%8A.JPEG',
            },
            {
              name: 'ロア',
              sex: SexEnum.FEMALE,
              catBreed: CatBreedEnum.RAGDOLL,
              birthDate: new Date('2020-10-10'),
              image:
                'https://catmocha.jp/images/cat/ikebukuro/62/%E8%A5%BF%E5%8F%A3%E5%BA%97%E3%83%AD%E3%82%A2.JPEG',
            },
            {
              name: 'このみ',
              sex: SexEnum.FEMALE,
              catBreed: CatBreedEnum.MUNCHKIN,
              birthDate: new Date('2021-01-07'),
              image: 'https://catmocha.jp/images/cat/ikebukuro/63/P4133408.jpg',
            },
            {
              name: 'ソル',
              sex: SexEnum.MALE,
              catBreed: CatBreedEnum.SCOTTISH_FOLD,
              birthDate: new Date('2021-12-17'),
              image: 'https://catmocha.jp/images/cat/ikebukuro/64/DSC_7521_00001.jpg',
            },
            {
              name: 'おむすび',
              sex: SexEnum.MALE,
              catBreed: CatBreedEnum.SCOTTISH_FOLD,
              birthDate: new Date('2022-02-03'),
              image: 'https://catmocha.jp/images/cat/ikebukuro/65/DSC_1530_01.JPG',
            },
            {
              name: 'タロ美',
              sex: SexEnum.FEMALE,
              catBreed: CatBreedEnum.EXOTIC_SHORT_HAIR,
              birthDate: new Date('2022-05-10'),
              image: 'https://catmocha.jp/images/cat/ikebukuro/67/P4133415.jpg',
            },
            {
              name: 'セレーナ',
              sex: SexEnum.FEMALE,
              catBreed: CatBreedEnum.RAGAMUFFIN,
              birthDate: new Date('2022-05-10'),
              image:
                'https://catmocha.jp/images/cat/ikebukuro/68/%E3%82%BB%E3%83%AC%E3%83%BC%E3%83%8A.jpeg',
            },
            {
              name: '水綺（みずき）',
              sex: SexEnum.FEMALE,
              catBreed: CatBreedEnum.RAGDOLL,
              birthDate: new Date('2022-09-03'),
              image: 'https://catmocha.jp/images/cat/ikebukuro/69/%E6%B0%B4%E7%B6%BA.jpeg',
            },
            {
              name: 'ゆうゆ',
              sex: SexEnum.FEMALE,
              catBreed: CatBreedEnum.BRITISH_SHORT_HAIR,
              birthDate: new Date('2022-09-29'),
              image: 'https://catmocha.jp/images/cat/ikebukuro/70/IMG_9794_1_11zon.jpeg',
            },
            {
              name: '瞬',
              sex: SexEnum.MALE,
              catBreed: CatBreedEnum.AMERICAN_SHORT_HAIR,
              birthDate: new Date('2022-09-29'),
              image: 'https://catmocha.jp/images/cat/ikebukuro/71/P4133462_1_11zon.jpeg',
            },
            {
              name: 'わたぱち',
              sex: SexEnum.MALE,
              catBreed: CatBreedEnum.MUNCHKIN,
              birthDate: new Date('2022-10-29'),
              image: 'https://catmocha.jp/images/cat/ikebukuro/72/IMG_9781_11zon.jpg',
            },
          ],
        },
      },
    },
  })

  await prisma.shopDetail.create({
    data: {
      shopId,
      name: '猫カフェ モカラウンジ 池袋東口店',
      address: '東京都豊島区東池袋1-22-5 サンケエビル4F',
      tel: '03-6914-2699',
      open: '10:00',
      close: '20:00',
      lastEntry: '19:30',
      url: 'https://catmocha.jp/shop/ikebukuro2/',
      image: 'https://catmocha.jp/assets/img/shoplist/img-kanto01.jpg',
      prefecture: PrefectureEnum.TOKYO,
      Cat: {
        createMany: {
          data: [
            {
              name: 'マシュマロ',
              sex: SexEnum.FEMALE,
              birthDate: new Date('2018-01-13'),
              image: 'https://catmocha.jp/images/cat/ikebukuro2/50/DSC_9094_00001.jpg',
              catBreed: CatBreedEnum.RAGDOLL,
              youtube: 'https://www.youtube.com/watch?v=H5UdpzFMOfE',
              instagram:
                'https://www.instagram.com/explore/tags/mocha%E3%83%9E%E3%82%B7%E3%83%A5%E3%83%9E%E3%83%AD/',
            },
            {
              name: 'だんご',
              sex: SexEnum.FEMALE,
              birthDate: new Date('2018-01-13'),
              image:
                'https://catmocha.jp/images/cat/ikebukuro2/51/%E3%81%9F%E3%82%99%E3%82%93%E3%81%93%E3%82%99.jpg',
              catBreed: CatBreedEnum.SCOTTISH_FOLD,
              youtube: 'https://www.youtube.com/watch?v=zIdS4iSSFqo',
              instagram: 'https://www.instagram.com/explore/tags/mocha%E3%81%A0%E3%82%93%E3%81%94/',
            },
            {
              name: 'かりん',
              sex: SexEnum.FEMALE,
              birthDate: new Date('2018-02-12'),
              image: 'https://catmocha.jp/images/cat/ikebukuro2/52/%E3%81%8B%E3%82%8A%E3%82%93.jpg',
              catBreed: CatBreedEnum.SIBERIAN,
              youtube: 'https://www.youtube.com/watch?v=kNB31X2JR0g',
              instagram:
                'https://www.instagram.com/explore/tags/mocha%E3%81%8B%E3%82%8A%E3%82%93/?hl=ja',
            },
            {
              name: 'チップ',
              sex: SexEnum.MALE,
              birthDate: new Date('2018-02-18'),
              image:
                'https://catmocha.jp/images/cat/ikebukuro2/74/DSC_6767_00001%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC.jpg',
              catBreed: CatBreedEnum.SCOTTISH_FOLD,
              youtube: 'https://www.youtube.com/watch?v=HS79REyPDR4',
              instagram:
                'https://www.instagram.com/explore/tags/mocha%E3%83%81%E3%83%83%E3%83%97/?hl=ja',
            },
            {
              name: 'くらら',
              sex: SexEnum.FEMALE,
              birthDate: new Date('2018-03-10'),
              image: 'https://catmocha.jp/images/cat/ikebukuro2/57/%E3%81%8F%E3%82%89%E3%82%89.jpg',
              catBreed: CatBreedEnum.SCOTTISH_FOLD,
              youtube: 'https://www.youtube.com/watch?v=EKbtatv5wAw',
              instagram: 'https://www.instagram.com/explore/tags/mocha%E3%81%8F%E3%82%89%E3%82%89/',
            },
            {
              name: 'ぽぽ',
              sex: SexEnum.FEMALE,
              birthDate: new Date('2019-01-09'),
              image:
                'https://catmocha.jp/images/cat/ikebukuro2/58/%E3%81%BB%E3%82%9A%E3%81%BB%E3%82%9A.jpg',
              catBreed: CatBreedEnum.MINUET,
              youtube: 'https://www.youtube.com/watch?v=r1yOR9Ny2K4',
              instagram: 'https://www.instagram.com/explore/tags/mocha%E3%81%BD%E3%81%BD/?hl=ja',
            },
            {
              name: 'ダイナ',
              sex: SexEnum.FEMALE,
              birthDate: new Date('2019-02-15'),
              image: 'https://catmocha.jp/images/cat/ikebukuro2/62/%E3%83%80%E3%82%A4%E3%83%8A.jpg',
              catBreed: CatBreedEnum.SKOOKUM,
              youtube: 'https://www.youtube.com/watch?v=bgZ4yFMewh8',
              instagram:
                'https://www.instagram.com/explore/tags/mocha%E3%83%80%E3%82%A4%E3%83%8A/?hl=ja',
            },
            {
              name: 'レオ',
              sex: SexEnum.MALE,
              birthDate: new Date('2019-04-15'),
              image: 'https://catmocha.jp/images/cat/ikebukuro2/64/DSC_2789_00001.jpg',
              catBreed: CatBreedEnum.NORWEGIAN_FOREST_CAT,
              youtube: 'https://youtu.be/7Go3m6ML6PA',
              instagram: 'https://www.instagram.com/explore/tags/mocha%E3%83%AC%E3%82%AA/?hl=ja',
            },
            {
              name: 'いなり',
              sex: SexEnum.MALE,
              birthDate: new Date('2019-08-01'),
              image: 'https://catmocha.jp/images/cat/ikebukuro2/66/IMG_7992.PNG',
              catBreed: CatBreedEnum.NORWEGIAN_FOREST_CAT,
              youtube: 'https://www.youtube.com/watch?v=NF59hnY3Yl0',
              instagram:
                'https://www.instagram.com/explore/tags/mocha%E3%81%84%E3%81%AA%E3%82%8A/?hl=ja',
            },
            {
              name: '豆吉',
              sex: SexEnum.MALE,
              birthDate: new Date('2019-08-25'),
              image: 'https://catmocha.jp/images/cat/ikebukuro2/65/DSC_5924_00001.jpg',
              catBreed: CatBreedEnum.MUNCHKIN,
              youtube: 'https://www.youtube.com/watch?v=br5RKFnZNbs',
              instagram: 'https://www.instagram.com/explore/tags/mocha%E8%B1%86%E5%90%89/?hl=ja',
            },
            {
              name: 'リズ',
              sex: SexEnum.FEMALE,
              birthDate: new Date('2019-11-01'),
              image: 'https://catmocha.jp/images/cat/ikebukuro2/68/DSC_5915_00001.jpg',
              catBreed: CatBreedEnum.MUNCHKIN,
              youtube: 'https://www.youtube.com/watch?v=vinradcwImM',
              instagram: 'https://www.instagram.com/explore/tags/mocha%E3%83%AA%E3%82%BA/?hl=ja',
            },
            {
              name: '紗(すず)',
              sex: SexEnum.FEMALE,
              birthDate: new Date('2020-12-13'),
              image: 'https://catmocha.jp/images/cat/ikebukuro2/68/DSC_5915_00001.jpg',
              catBreed: CatBreedEnum.SCOTTISH_FOLD,
              youtube: 'https://youtu.be/Pm0yndMaydo',
              instagram: 'https://www.instagram.com/explore/tags/mocha%E7%B4%97/',
            },
            {
              name: '凪(なぎ)',
              sex: SexEnum.FEMALE,
              birthDate: new Date('2020/12/22'),
              image: 'https://catmocha.jp/images/cat/ikebukuro2/71/NAGI.jpg',
              catBreed: CatBreedEnum.SCOTTISH_FOLD,
              youtube: 'https://youtu.be/HEmT_Jsaf2M',
              instagram: 'https://www.instagram.com/explore/tags/mocha%E5%87%AA/',
            },
            {
              name: '朔（さく）',
              sex: SexEnum.FEMALE,
              birthDate: new Date('2021-01-01'),
              image: 'https://catmocha.jp/images/cat/ikebukuro2/72/%E3%81%95%E3%81%8F.png',
              catBreed: CatBreedEnum.RAGAMUFFIN,
              youtube: 'https://youtu.be/oRs66w-pXTw',
              instagram: 'https://www.instagram.com/explore/tags/mocha%E6%9C%94/?hl=ja',
            },
            {
              name: '麗（れい）',
              sex: SexEnum.FEMALE,
              birthDate: new Date('2022-01-10'),
              image: 'https://catmocha.jp/images/cat/ikebukuro2/75/%E9%BA%97001.jpg',
              catBreed: CatBreedEnum.AMERICAN_SHORT_HAIR,
              youtube: 'https://youtu.be/eb1lBSl_vwE',
              instagram: 'https://www.instagram.com/explore/tags/mocha%E9%BA%97/?hl=ja',
            },
            {
              name: '鞠（まり）',
              sex: SexEnum.FEMALE,
              birthDate: new Date('2022-06-01'),
              image:
                'https://catmocha.jp/images/cat/ikebukuro2/76/%E3%83%9E%E3%83%B3%E3%83%81%E2%99%80.jpg',
              catBreed: CatBreedEnum.MUNCHKIN,
              youtube: 'https://youtu.be/SK6F_5wZNVk',
              instagram: 'https://www.instagram.com/explore/tags/mocha%E9%9E%A0/?hl=ja',
            },
          ],
        },
      },
    },
  })
}

const createChubu = async (shopId: number) => {
  await prisma.shopDetail.create({
    data: {
      shopId,
      name: '猫カフェMOCHA 名古屋栄店',
      address: '愛知県名古屋市中区栄3-32-6 BECOME SAKAE 2F',
      tel: '052-380-1185',
      open: '10:00',
      close: '20:00',
      lastEntry: '19:30',
      url: 'https://catmocha.jp/shop/nagoya/',
      image: 'https://catmocha.jp/assets/img/shoplist/img-chubu01.jpg',
      prefecture: PrefectureEnum.AICHI,
      Cat: {
        createMany: {
          data: [
            {
              name: 'ぽぽ',
              sex: SexEnum.FEMALE,
              birthDate: new Date('2020-12-05'),
              catBreed: CatBreedEnum.LAMBKIN,
              image: 'https://catmocha.jp/images/cat/nagoya/32/20220711115048_IMG_1828.jpeg',
              youtube: 'https://youtu.be/uEnuD5v8xhw',
              instagram: 'https://www.instagram.com/explore/tags/mocha%E3%81%BD%E3%81%BD/?hl=ja',
            },
            {
              name: 'ほっけ',
              sex: SexEnum.MALE,
              birthDate: new Date('2020-12-11'),
              catBreed: CatBreedEnum.MAINE_COON,
              image:
                'https://catmocha.jp/images/cat/nagoya/38/662C177D-A5E5-4BCA-AB29-2FFA407208EA.jpeg',
              youtube: 'https://youtu.be/tzMRz0P3Id8',
              instagram:
                'https://www.instagram.com/explore/tags/mocha%E3%81%BB%E3%81%A3%E3%81%91/?hl=ja',
            },
            {
              name: 'ひなた',
              sex: SexEnum.MALE,
              birthDate: new Date('2021-02-06'),
              catBreed: CatBreedEnum.SIBERIAN,
              image:
                'https://catmocha.jp/images/cat/nagoya/33/56ABDB33-167F-4F40-9E6B-CA4F61A1FE17.jpeg',
              youtube: 'https://youtu.be/JdEhoQWKdZo',
              instagram:
                'https://www.instagram.com/explore/tags/mocha%E3%81%B2%E3%81%AA%E3%81%9F/?hl=ja',
            },
            {
              name: 'くくる',
              sex: SexEnum.MALE,
              birthDate: new Date('2021-02-09'),
              catBreed: CatBreedEnum.SIBERIAN,
              image: 'https://catmocha.jp/images/cat/nagoya/37/20220712203634_IMG_2080.jpeg',
              youtube: 'https://youtu.be/cwp78ME5moo',
              instagram:
                'https://www.instagram.com/explore/tags/mocha%E3%81%8F%E3%81%8F%E3%82%8B/?hl=ja',
            },
          ],
        },
      },
    },
  })
}

const createKinki = async (shopId: number) => {
  await prisma.shopDetail.create({
    data: {
      shopId,
      name: '猫カフェMOCHA 大阪心斎橋店',
      address: '大阪府大阪市中央区東心斎橋1-18-11 リバティ心斎橋ビル1F',
      tel: '06-6125-5966',
      open: '10:00',
      close: '20:00',
      lastEntry: '19:30',
      url: 'https://catmocha.jp/shop/shinsaibashi/',
      image: 'https://catmocha.jp/assets/img/shoplist/img-kinki01.jpg',
      prefecture: PrefectureEnum.OSAKA,
      Cat: {
        createMany: {
          data: [
            {
              name: 'メイ',
              sex: SexEnum.FEMALE,
              birthDate: new Date('2020-05-04'),
              catBreed: CatBreedEnum.SCOTTISH_FOLD,
              image:
                'https://catmocha.jp/images/cat/osaka/40/29128296-D762-4629-8643-C1FF81D9FECE.jpeg',
              youtube: 'https://youtu.be/OZB06rC1Sio',
              instagram: 'https://www.instagram.com/explore/tags/mocha%E3%83%A1%E3%82%A4/?hl=ja',
            },
            {
              name: '幹太（かぶと）',
              sex: SexEnum.MALE,
              birthDate: new Date('2020-09-01'),
              catBreed: CatBreedEnum.SCOTTISH_FOLD,
              image:
                'https://catmocha.jp/images/cat/osaka/45/9C5FC40D-3025-476C-BB8B-5FCB9E995577.jpeg',
              youtube: 'https://youtu.be/iGEY5fQd9nA',
              instagram: 'https://www.instagram.com/explore/tags/mocha%E5%B9%B9%E5%A4%AA/?hl=ja',
            },
            {
              name: 'ルーン',
              sex: SexEnum.MALE,
              birthDate: new Date('2020-09-24'),
              catBreed: CatBreedEnum.RUSSIAN_BLUE,
              image:
                'https://catmocha.jp/images/cat/osaka/46/2EE0E2DE-2960-4CEE-BC3B-45F58863776F.jpeg',
              youtube: 'https://youtu.be/xiScLGkCtlc',
              instagram:
                'https://www.instagram.com/explore/tags/mocha%E3%83%AB%E3%83%BC%E3%83%B3/?hl=ja',
            },
            {
              name: '望月（むつき）',
              sex: SexEnum.MALE,
              birthDate: new Date('2020-12-23'),
              catBreed: CatBreedEnum.EXOTIC_SHORT_HAIR,
              image:
                'https://catmocha.jp/images/cat/osaka/47/95F79C61-12EC-42FA-8AD9-40E8F25F16B2.jpeg',
              youtube: 'https://youtu.be/KYE6G10pAzE',
              instagram: 'https://www.instagram.com/explore/tags/mocha%E6%9C%9B%E6%9C%88/?hl=ja',
            },
          ],
        },
      },
    },
  })
}

const createChugoku = async (shopId: number) => {}

const createShikoku = async (shopId: number) => {}

const createKyushu = async (shopId: number) => {}
