'use client'

import { ContentLayout } from '@/components/layout/content-layout'
import MapJapan from '@/components/map/map-japan'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  function handleMapClick(prefCode: number) {
    router.push(`/cafe/${prefCode}`)
  }

  return (
    <ContentLayout title="猫カフェ検索">
      <div className="w-full max-w-lg mx-auto">
        <MapJapan onClick={handleMapClick} />
      </div>
    </ContentLayout>
  )
}
