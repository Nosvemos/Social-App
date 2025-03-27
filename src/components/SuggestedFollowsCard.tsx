import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import SuggestedFollowsItem from '@/components/SuggestedFollowsItem'
import { Suspense } from 'react'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { getRandomUsers } from '@/actions/user'

const SuggestedFollowsCard = async () => {
  const users = await getRandomUsers();
  return (
    <Card className="w-full pt-3">
      <CardHeader className='gap-0 mb-2'>
        <CardTitle>Who to follow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col mb-2 gap-8'>
          {users.map((user) => (
            <Suspense key={user.id} fallback={<LoadingSkeleton avatar={true} className='ml-4' />}>
              <SuggestedFollowsItem userId={user.id} name={user.name} username={user.username} bio={user.bio} avatar={user.image} followers={user._count.followers} following={user._count.following}/>
            </Suspense>
          ))}
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