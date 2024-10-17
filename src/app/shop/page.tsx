'use client'

import { ContentLayout } from '@/components/layout/content-layout'
import MapJapan from '@/components/map/japan'
import { prefectureData } from '@/data/prefecture'
import { usePathname, useRouter } from 'next/navigation'

export default function Page() {
  const pathname = usePathname()
  const router = useRouter()

  function handleMapClick(prefCode: number) {
    const prefecture = prefectureData.find((pref) => pref.code === prefCode)
    router.push(`${pathname}/${prefecture?.region}`)
  }

  return (
    <ContentLayout title="店舗検索">
      <div className="w-full max-w-lg mx-auto">
        <MapJapan onClick={handleMapClick} />
      </div>
    </ContentLayout>
  )
}
