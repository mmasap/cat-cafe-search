import { prefectureData, type Region } from '@/data/prefecture'
import db from '@/lib/db'
import { unstable_cache } from '@/lib/unstable-cache'

export function getRegionShops(region: Region) {
  const cacheFn = unstable_cache(getRegionShopsInner, ['shop', region], {
    revalidate: 60 * 60 * 24,
  })
  return cacheFn(region)
}

function getRegionShopsInner(region: Region) {
  const prefEnums = prefectureData.filter((pref) => pref.region === region).map((pref) => pref.enum)
  return db.shop.findMany({
    where: {
      prefecture: {
        in: prefEnums,
      },
    },
  })
}
