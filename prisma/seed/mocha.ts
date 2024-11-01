import prisma from '@/lib/db'
import { CatBreedEnum, PrefectureEnum, SexEnum, type Prisma } from '@prisma/client'
import * as cheerio from 'cheerio'
import { downloadImage } from './util/image'

const BASE_URL = 'https://catmocha.jp' as const

export async function createMocha() {
  const $ = await cheerio.fromURL(`${BASE_URL}/shoplist/`)

  for (let i = 1; i <= 5; i++) {
    for (const el of $(`#content${i} .shop_link_box`).toArray()) {
      const href = $(el).find('a').attr('href')
      const imgSrc = $(el).find('img').attr('src')
      if (!href) return

      await createShop({
        shopUrl: BASE_URL + href,
        shopImage: imgSrc ? BASE_URL + imgSrc : undefined,
      })
    }
  }
}

async function createShop({ shopUrl, shopImage }: { shopUrl: string; shopImage?: string }) {
  const $ = await cheerio.fromURL(shopUrl)

  const $company_info_child = $('.company_info_child')
  const shopName = $($company_info_child[1]).find('p').text().trim()
  const address = $($company_info_child[3]).find('p').text().split('\n')[1].trim()
  const tel = $($company_info_child[5]).find('p').text().trim()
  const openingHours = $($company_info_child[7])
    .text()
    .match(/\d+:\d+/g)

  const { id: shopId } = await prisma.shop.create({
    data: {
      name: shopName,
      address,
      tel,
      open: openingHours?.[0],
      close: openingHours?.[1],
      lastEntry: openingHours?.[2],
      url: shopUrl,
      image: await downloadImage(shopImage),
      prefecture: getPrefectureEnum(address),
    },
  })

  for (const el of $('.cat_box').toArray()) {
    const [sex, breed, birthDate] = $(el)
      .find('.cat_data')
      .text()
      .split('\n')
      .map((v) => v.trim())
      .filter((v) => v)
    const [year, month, day] = birthDate
      .replace('生まれ', '')
      .split('/')
      .map((v) => +v)
    const catImageSrc = $(el).find('img').attr('src')
    const [instagram, youtube] = $(el)
      .find('.cat_sns a')
      .map((_, el) => $(el).attr('href'))

    await prisma.cat.create({
      data: {
        shopId: shopId,
        name: $(el).find('.cat_name').text().trim(),
        sex: sex === 'おとこのこ' ? SexEnum.MALE : SexEnum.FEMALE,
        birthDate: new Date(year, month - 1, day),
        catBreed: getCatBreedEnum(breed),
        mix: breed.includes('MIX') || breed.includes('x'),
        image: catImageSrc ? await downloadImage(BASE_URL + catImageSrc) : undefined,
        youtube,
        instagram,
      },
    })
  }
}

function getPrefectureEnum(prefecture: string): PrefectureEnum {
  if (prefecture.includes('北海道')) return PrefectureEnum.HOKKAIDO
  if (prefecture.includes('青森県')) return PrefectureEnum.AOMORI
  if (prefecture.includes('岩手県')) return PrefectureEnum.IWATE
  if (prefecture.includes('宮城県')) return PrefectureEnum.MIYAGI
  if (prefecture.includes('秋田県')) return PrefectureEnum.AKITA
  if (prefecture.includes('山形県')) return PrefectureEnum.YAMAGATA
  if (prefecture.includes('福島県')) return PrefectureEnum.FUKUSHIMA
  if (prefecture.includes('茨城県')) return PrefectureEnum.IBARAKI
  if (prefecture.includes('栃木県')) return PrefectureEnum.TOCHIGI
  if (prefecture.includes('群馬県')) return PrefectureEnum.GUNMA
  if (prefecture.includes('埼玉県')) return PrefectureEnum.SAITAMA
  if (prefecture.includes('千葉県')) return PrefectureEnum.CHIBA
  if (prefecture.includes('東京都')) return PrefectureEnum.TOKYO
  if (prefecture.includes('神奈川県')) return PrefectureEnum.KANAGAWA
  if (prefecture.includes('新潟県')) return PrefectureEnum.NIIGATA
  if (prefecture.includes('富山県')) return PrefectureEnum.TOYAMA
  if (prefecture.includes('石川県')) return PrefectureEnum.ISHIKAWA
  if (prefecture.includes('福井県')) return PrefectureEnum.FUKUI
  if (prefecture.includes('山梨県')) return PrefectureEnum.YAMANASHI
  if (prefecture.includes('長野県')) return PrefectureEnum.NAGANO
  if (prefecture.includes('岐阜県')) return PrefectureEnum.GIFU
  if (prefecture.includes('静岡県')) return PrefectureEnum.SHIZUOKA
  if (prefecture.includes('愛知県')) return PrefectureEnum.AICHI
  if (prefecture.includes('三重県')) return PrefectureEnum.MIE
  if (prefecture.includes('滋賀県')) return PrefectureEnum.SHIGA
  if (prefecture.includes('京都府')) return PrefectureEnum.KYOTO
  if (prefecture.includes('大阪府')) return PrefectureEnum.OSAKA
  if (prefecture.includes('兵庫県')) return PrefectureEnum.HYOGO
  if (prefecture.includes('奈良県')) return PrefectureEnum.NARA
  if (prefecture.includes('和歌山県')) return PrefectureEnum.WAKAYAMA
  if (prefecture.includes('鳥取県')) return PrefectureEnum.TOTTORI
  if (prefecture.includes('島根県')) return PrefectureEnum.SHIMANE
  if (prefecture.includes('岡山県')) return PrefectureEnum.OKAYAMA
  if (prefecture.includes('広島県')) return PrefectureEnum.HIROSHIMA
  if (prefecture.includes('山口県')) return PrefectureEnum.YAMAGUCHI
  if (prefecture.includes('徳島県')) return PrefectureEnum.TOKUSHIMA
  if (prefecture.includes('香川県')) return PrefectureEnum.KAGAWA
  if (prefecture.includes('愛媛県')) return PrefectureEnum.EHIME
  if (prefecture.includes('高知県')) return PrefectureEnum.KOCHI
  if (prefecture.includes('福岡県')) return PrefectureEnum.FUKUOKA
  if (prefecture.includes('佐賀県')) return PrefectureEnum.SAGA
  if (prefecture.includes('長崎県')) return PrefectureEnum.NAGASAKI
  if (prefecture.includes('熊本県')) return PrefectureEnum.KUMAMOTO
  if (prefecture.includes('大分県')) return PrefectureEnum.OITA
  if (prefecture.includes('宮崎県')) return PrefectureEnum.MIYAZAKI
  if (prefecture.includes('鹿児島県')) return PrefectureEnum.KAGOSHIMA
  if (prefecture.includes('沖縄県')) return PrefectureEnum.OKINAWA
  throw new Error(`PrefectureEnum undefined: ${prefecture}`)
}

function getCatBreedEnum(breed: string): CatBreedEnum {
  switch (breed) {
    case 'アビシニアン':
      return CatBreedEnum.ABYSSINIAN
    case 'アメリカンカール':
      return CatBreedEnum.AMERICAN_CURL
    case 'アメリカンショートヘア':
    case 'アメリカンショートヘアー':
      return CatBreedEnum.AMERICAN_SHORT_HAIR
    case 'エキゾチックショートヘア':
    case 'エキゾチックショートヘアー':
      return CatBreedEnum.EXOTIC_SHORT_HAIR
    case 'エキゾチックロングヘア':
    case 'エキゾチックロングヘアー':
      return CatBreedEnum.EXOTIC_LONG_HAIR
    case 'エジプシャンマウ':
      return CatBreedEnum.EGYPTIAN_MAU
    case 'キンカロー':
      return CatBreedEnum.KINKALOW
    case 'サイベリアン':
      return CatBreedEnum.SIBERIAN
    case 'スクーカム':
      return CatBreedEnum.SKOOKUM
    case 'ジェネッタ':
      return CatBreedEnum.GENETTA
    case 'シャルトリュー':
      return CatBreedEnum.CHARTREUX
    case 'シンガプーラ':
      return CatBreedEnum.SINGAPURA
    case 'スコティッシュストレート':
      return CatBreedEnum.SCOTTISH_STRAIGHT
    case 'スコティッシュフォールド':
      return CatBreedEnum.SCOTTISH_FOLD
    case 'セルカークレックス':
      return CatBreedEnum.CHARTREUX
    case 'ソマリ':
      return CatBreedEnum.SOMALI
    case 'ティグレット':
      return CatBreedEnum.TIGRETT
    case 'トンキニーズ':
      return CatBreedEnum.TONKINESE
    case 'ノルウェージャンフォレストキャット':
      return CatBreedEnum.NORWEGIAN_FOREST_CAT
    case 'ヒマラヤン':
      return CatBreedEnum.HIMALAYAN
    case 'フォールデックス':
      return CatBreedEnum.FOLDEX
    case 'ブリティッシュショートヘア':
    case 'ブリティッシュ ショートヘア':
    case 'ブリティッシュショートヘアー':
      return CatBreedEnum.BRITISH_SHORT_HAIR
    case 'ベンガル':
      return CatBreedEnum.BENGAL
    case 'ペルシャ':
      return CatBreedEnum.PERSIAN
    case 'ミヌエット':
      return CatBreedEnum.MINUET
    case 'メインクーン':
    case 'メインクーン×ミヌエット':
      return CatBreedEnum.MAINE_COON
    case 'マンチカン':
      return CatBreedEnum.MUNCHKIN
    case 'マンチカンロングレッグ':
      return CatBreedEnum.MUNCHKIN_LONG_LEG
    case 'ラガマフィン':
      return CatBreedEnum.RAGAMUFFIN
    case 'ラグドール':
    case 'ラグドールMIX':
      return CatBreedEnum.RAGDOLL
    case 'ラパーマ':
    case 'ラパーマMIX':
      return CatBreedEnum.LA_PERM
    case 'ラムキン':
      return CatBreedEnum.LAMBKIN
    case 'ロシアンブルー':
      return CatBreedEnum.RUSSIAN_BLUE

    default:
      throw new Error(`CatBreedEnum undefined: ${breed}`)
  }
}
