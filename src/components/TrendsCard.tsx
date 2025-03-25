import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import TrendsItem from '@/components/TrendsItem'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { Suspense } from 'react'

const TrendsCard = () => {
  return (
    <Card className="w-full pt-3">
      <CardHeader className='gap-0'>
        <CardTitle>What’s happening</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col'>
          <Suspense fallback={<LoadingSkeleton className='p-4' hasThird={true} />}>
            <TrendsItem title='Trending in Turkey' tag='#Saraçhanedeyiz' postCount={104000}/>
          </Suspense>

          <Suspense fallback={<LoadingSkeleton className='p-4' hasThird={true} />}>
            <TrendsItem title='Trending in Turkey' tag='#BOYKOT' postCount={137000}/>
          </Suspense>

          <Suspense fallback={<LoadingSkeleton className='p-4' hasThird={true} />}>
            <TrendsItem title='Trending in Turkey' tag='#izlemiyoruz' postCount={3003}/>
          </Suspense>

          <Suspense fallback={<LoadingSkeleton className='p-4' hasThird={true} />}>
            <TrendsItem title='Trending in Turkey' tag='Galata Köprüsü' postCount={25612}/>
          </Suspense>
        </div>
        <Button variant='ghostV2' size='trendsLoad'>
          <Link href="/">
            <span className='text-blue-400 hover:text-blue-400'>Show more</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default TrendsCard