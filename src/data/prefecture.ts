import { PrefectureEnum } from '@prisma/client'

export type Prefecture = {
  name: string
  region: string
  code: number
  enum: PrefectureEnum
}

export const prefectureData: Prefecture[] = [
  {
    name: '北海道',
    region: '北海道',
    code: 1,
    enum: PrefectureEnum.HOKKAIDO,
  },
  {
    name: '青森県',
    region: '東北',
    code: 2,
    enum: PrefectureEnum.AOMORI,
  },
  {
    name: '岩手県',
    region: '東北',
    code: 3,
    enum: PrefectureEnum.IWATE,
  },
  {
    name: '宮城県',
    region: '東北',
    code: 4,
    enum: PrefectureEnum.MIYAGI,
  },
  {
    name: '秋田県',
    region: '東北',
    code: 5,
    enum: PrefectureEnum.AKITA,
  },
  {
    name: '山形県',
    region: '東北',
    code: 6,
    enum: PrefectureEnum.YAMAGATA,
  },
  {
    name: '福島県',
    region: '東北',
    code: 7,
    enum: PrefectureEnum.FUKUSHIMA,
  },
  {
    name: '茨城県',
    region: '関東',
    code: 8,
    enum: PrefectureEnum.IBARAKI,
  },
  {
    name: '栃木県',
    region: '関東',
    code: 9,
    enum: PrefectureEnum.TOCHIGI,
  },
  {
    name: '群馬県',
    region: '関東',
    code: 10,
    enum: PrefectureEnum.GUNMA,
  },
  {
    name: '埼玉県',
    region: '関東',
    code: 11,
    enum: PrefectureEnum.SAITAMA,
  },
  {
    name: '千葉県',
    region: '関東',
    code: 12,
    enum: PrefectureEnum.CHIBA,
  },
  {
    name: '東京都',
    region: '関東',
    code: 13,
    enum: PrefectureEnum.TOKYO,
  },
  {
    name: '神奈川県',
    region: '関東',
    code: 14,
    enum: PrefectureEnum.KANAGAWA,
  },
  {
    name: '新潟県',
    region: '中部',
    code: 15,
    enum: PrefectureEnum.NIIGATA,
  },
  {
    name: '富山県',
    region: '中部',
    code: 16,
    enum: PrefectureEnum.TOYAMA,
  },
  {
    name: '石川県',
    region: '中部',
    code: 17,
    enum: PrefectureEnum.ISHIKAWA,
  },
  {
    name: '福井県',
    region: '中部',
    code: 18,
    enum: PrefectureEnum.FUKUI,
  },
  {
    name: '山梨県',
    region: '中部',
    code: 19,
    enum: PrefectureEnum.YAMANASHI,
  },
  {
    name: '長野県',
    region: '中部',
    code: 20,
    enum: PrefectureEnum.NAGANO,
  },
  {
    name: '岐阜県',
    region: '中部',
    code: 21,
    enum: PrefectureEnum.GIFU,
  },
  {
    name: '静岡県',
    region: '中部',
    code: 22,
    enum: PrefectureEnum.SHIZUOKA,
  },
  {
    name: '愛知県',
    region: '中部',
    code: 23,
    enum: PrefectureEnum.AICHI,
  },
  {
    name: '三重県',
    region: '近畿',
    code: 24,
    enum: PrefectureEnum.MIE,
  },
  {
    name: '滋賀県',
    region: '近畿',
    code: 25,
    enum: PrefectureEnum.SHIGA,
  },
  {
    name: '京都府',
    region: '近畿',
    code: 26,
    enum: PrefectureEnum.KYOTO,
  },
  {
    name: '大阪府',
    region: '近畿',
    code: 27,
    enum: PrefectureEnum.OSAKA,
  },
  {
    name: '兵庫県',
    region: '近畿',
    code: 28,
    enum: PrefectureEnum.HYOGO,
  },
  {
    name: '奈良県',
    region: '近畿',
    code: 29,
    enum: PrefectureEnum.NARA,
  },
  {
    name: '和歌山県',
    region: '近畿',
    code: 30,
    enum: PrefectureEnum.WAKAYAMA,
  },
  {
    name: '鳥取県',
    region: '中国',
    code: 31,
    enum: PrefectureEnum.TOTTORI,
  },
  {
    name: '島根県',
    region: '中国',
    code: 32,
    enum: PrefectureEnum.SHIMANE,
  },
  {
    name: '岡山県',
    region: '中国',
    code: 33,
    enum: PrefectureEnum.OKAYAMA,
  },
  {
    name: '広島県',
    region: '中国',
    code: 34,
    enum: PrefectureEnum.HIROSHIMA,
  },
  {
    name: '山口県',
    region: '中国',
    code: 35,
    enum: PrefectureEnum.YAMAGUCHI,
  },
  {
    name: '徳島県',
    region: '四国',
    code: 36,
    enum: PrefectureEnum.TOKUSHIMA,
  },
  {
    name: '香川県',
    region: '四国',
    code: 37,
    enum: PrefectureEnum.KAGAWA,
  },
  {
    name: '愛媛県',
    region: '四国',
    code: 38,
    enum: PrefectureEnum.EHIME,
  },
  {
    name: '高知県',
    region: '四国',
    code: 39,
    enum: PrefectureEnum.KOCHI,
  },
  {
    name: '福岡県',
    region: '九州',
    code: 40,
    enum: PrefectureEnum.FUKUOKA,
  },
  {
    name: '佐賀県',
    region: '九州',
    code: 41,
    enum: PrefectureEnum.SAGA,
  },
  {
    name: '長崎県',
    region: '九州',
    code: 42,
    enum: PrefectureEnum.NAGASAKI,
  },
  {
    name: '熊本県',
    region: '九州',
    code: 43,
    enum: PrefectureEnum.KUMAMOTO,
  },
  {
    name: '大分県',
    region: '九州',
    code: 44,
    enum: PrefectureEnum.OITA,
  },
  {
    name: '宮崎県',
    region: '九州',
    code: 45,
    enum: PrefectureEnum.MIYAZAKI,
  },
  {
    name: '鹿児島県',
    region: '九州',
    code: 46,
    enum: PrefectureEnum.KAGOSHIMA,
  },
  {
    name: '沖縄県',
    region: '沖縄',
    code: 47,
    enum: PrefectureEnum.OKINAWA,
  },
]
