import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import TrendsItem from '@/components/TrendsItem'

const TrendsCard = () => {
  return (
    <Card className="w-full pt-3">
      <CardHeader className='gap-0'>
        <CardTitle>What’s happening</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col'>
          <TrendsItem title='Trending in Turkey' tag='#Saraçhanedeyiz' postCount={104000}/>
          <TrendsItem title='Trending in Turkey' tag='#BOYKOT' postCount={137000}/>
          <TrendsItem title='Trending in Turkey' tag='#izlemiyoruz' postCount={3003}/>
          <TrendsItem title='Trending in Turkey' tag='Galata Köprüsü' postCount={25612}/>
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