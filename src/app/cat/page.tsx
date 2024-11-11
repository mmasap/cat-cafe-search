import { ContentLayout } from '@/components/layout/content-layout'
import MapJapan from '@/components/map/japan'

export default function Page() {
  return (
    <ContentLayout title="猫検索">
      <div className="w-full max-w-lg mx-auto">
        <MapJapan basePath="/cat" />
      </div>
    </ContentLayout>
  )
}
