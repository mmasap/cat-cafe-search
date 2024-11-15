import { prefectureData, type Region } from '@/data/prefecture'
import db from '@/lib/db'
import { unstable_cache } from '@/lib/unstable-cache'

export function getRegionCats(region: Region) {
  const cacheFn = unstable_cache(getRegionCatsInner, ['cat', region], {
    revalidate: 60 * 60 * 24,
  })
  return cacheFn(region)
}

function getRegionCatsInner(region: Region) {
  const prefEnums = prefectureData.filter((pref) => pref.region === region).map((pref) => pref.enum)
  return db.cat.findMany({
    where: {
      Shop: {
        prefecture: { in: prefEnums },
      },
    },
    include: { Shop: true },
  })
}
