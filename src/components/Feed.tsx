import NewTweetSection from '@/components/NewTweetSection'
import { currentUser } from '@clerk/nextjs/server'
import { getDbUserId, getUserByClerkId } from '@/actions/user'
import Tweet from '@/components/Tweet'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Suspense } from 'react'
import { getPosts } from '@/actions/post'

const Feed = async() => {
  const dbUserId = await getDbUserId();

  let user = null;

  const authUser = await currentUser();
  if(authUser) {
    user = await getUserByClerkId(authUser.id);
  }

  if(!user) return null;

  const posts = await getPosts();
  return (
    <>
      <NewTweetSection avatar={user.image ?? ''} />
      <Suspense fallback={<LoadingSpinner size={26}/>}>
        {posts.map(post => (
          <Tweet key={post.id} post={post} dbUserId={dbUserId}/>
        ))}
      </Suspense>
    </>
  )
}

export default Feed