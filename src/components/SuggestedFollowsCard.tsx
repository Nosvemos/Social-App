import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import SuggestedFollowsItem from '@/components/SuggestedFollowsItem'

const SuggestedFollowsCard = () => {
  return (
    <Card className="w-full pt-3">
      <CardHeader className='gap-0 mb-2'>
        <CardTitle>Who to follow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col mb-2 gap-8'>
          <SuggestedFollowsItem name={'Samet'} username={'jesuisamet'} avatar={'https://github.com/shadcn.png'} followers={300012} following={12}/>
          <SuggestedFollowsItem name={'Samet'} username={'jesuisamet'} avatar={'https://github.com/shadcn.png'} followers={300012} following={12}/>
          <SuggestedFollowsItem name={'Samet'} username={'jesuisamet'} avatar={'https://github.com/shadcn.png'} followers={300012} following={12}/>
          <SuggestedFollowsItem name={'Samet'} username={'jesuisamet'} avatar={'https://github.com/shadcn.png'} followers={300012} following={12}/>
          <SuggestedFollowsItem name={'Samet'} username={'jesuisamet'} avatar={'https://github.com/shadcn.png'} followers={300012} following={12}/>
        </div>
        <Button variant='ghostV2' size='trendsLoad'>
          <Link href="/public">
            <span className='text-blue-400 hover:text-blue-400'>Show more</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default SuggestedFollowsCard