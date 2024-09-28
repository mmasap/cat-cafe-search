'use client'

import { ContentLayout } from '@/components/layout/content-layout'
import MapJapan from '@/components/map/map-japan'
import { usePathname, useRouter } from 'next/navigation'
import { prefectureData } from '@/data/prefecture'

export default function Page() {
  const pathname = usePathname()
  const router = useRouter()

  function handleMapClick(prefCode: number) {
    const prefecture = prefectureData.find((pref) => pref.code === prefCode)
    router.push(`${pathname}/${prefecture?.enum.toLowerCase()}`)
  }

  return (
    <ContentLayout title="猫検索">
      <div className="w-full max-w-lg mx-auto">
        <MapJapan onClick={handleMapClick} />
      </div>
    </ContentLayout>
  )
}
