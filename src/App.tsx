import { lazy, Suspense } from 'react'
import MainPreview from '@/components/MainPreview'
import { SheetSkeletonFallback } from '@/components/BackgroundSheet/SheetSkeletonFallback'

const BackgroundSheet = lazy(() => import('@/components/BackgroundSheet'))

export default function App() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <MainPreview />
      <Suspense fallback={<SheetSkeletonFallback />}>
        <BackgroundSheet />
      </Suspense>
    </div>
  )
}
