import ProfileHeader from '@/components/ProfileHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Tweet from '@/components/Tweet'
import { getProfileByUsername, getUserPosts } from '@/actions/profile'
import { getDbUserId } from '@/actions/user'
import RepliedTweet from '@/components/RepliedTweet'

type User = Awaited<ReturnType<typeof getProfileByUsername>>;
type Posts = Awaited<ReturnType<typeof getUserPosts>>;

interface ProfileProps {
  user: NonNullable<User>;
  posts: Posts;
  repliedPosts: Posts;
  likedPosts: Posts;
}

const Profile = async ({
  likedPosts,
  repliedPosts,
  posts,
  user,
}: ProfileProps) => {
  const dbUserId = await getDbUserId();
  console.log(dbUserId);

  return (
    <>
      <ProfileHeader user={user}/>
      <Tabs defaultValue="posts" className="w-full px-4">
        <TabsList className='w-full'>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="replies">Replies</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          {posts.length > 0 ? (
            posts.map((post) => <Tweet key={post.id} post={post} dbUserId={dbUserId} className={'pt-4'} />)
          ) : (
            <div className="text-center py-8 text-muted-foreground">No posts yet</div>
          )}
        </TabsContent>
        <TabsContent value="replies">
          {repliedPosts.length > 0 ? (
            repliedPosts.map((post) => <RepliedTweet key={post.id} post={post} userId={user.id} dbUserId={dbUserId} />)
          ) : (
            <div className="text-center py-8 text-muted-foreground">No replied posts to show</div>
          )}
        </TabsContent>
        <TabsContent value="likes">
          {likedPosts.length > 0 ? (
            likedPosts.map((post) => <Tweet key={post.id} post={post} dbUserId={dbUserId} className={'pt-4'} />)
          ) : (
            <div className="text-center py-8 text-muted-foreground">No liked posts to show</div>
          )}
        </TabsContent>
      </Tabs>
    </>
  )
}

export default Profile