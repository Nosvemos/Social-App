import PageLayout from '@/components/layouts/PageLayout'
import { Suspense } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'
import Feed from '@/components/Feed'

export default function HomePage() {
  return (
    <PageLayout>
      <Suspense fallback={<LoadingSpinner size={26}/>}>
        <Feed/>
      </Suspense>
    </PageLayout>
  )
}
