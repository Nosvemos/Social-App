import NewTweetSection from '@/components/NewTweetSection'
import { getDbUserId } from '@/actions/user'
import Tweet from '@/components/Tweet'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Suspense } from 'react'
import { getPosts } from '@/actions/post'
import { SignedIn } from '@clerk/nextjs'

const Feed = async() => {
  const dbUserId = await getDbUserId();

  const posts = await getPosts();
  return (
    <>
      <SignedIn>
        <NewTweetSection/>
      </SignedIn>
      <Suspense fallback={<LoadingSpinner size={26}/>}>
        {posts.map(post => (
          <Tweet key={post.id} post={post} dbUserId={dbUserId} className={'px-5 md:px-15 mt-5'}/>
        ))}
      </Suspense>
    </>
  )
}

export default Feed