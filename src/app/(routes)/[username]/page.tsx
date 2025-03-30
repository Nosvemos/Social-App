import PageLayout from '@/components/layouts/PageLayout'
import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  getUserRepliedPosts,
  isFollowing
} from '@/actions/profile'
import { notFound } from 'next/navigation'
import Profile from '@/components/Profile'

export async function generateMetadata({ params }: { params: { username: string } }) {
  const user = await getProfileByUsername(params.username);
  if (!user) return {
    title: `Undefined`,
    description: 'Undefined',
  }

  return {
    title: `${user.name} (@${user.username})`,
    description: user.bio || `Check out ${user.username}'s profile.`,
  };
}

const Page = async({
  params,
}: {
  params: Promise<{ username: string }>
}) => {
  const { username } = await params;
  const user = await getProfileByUsername(username);

  if (!user) notFound();

  const [posts, likedPosts, repliedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    getUserRepliedPosts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <PageLayout>
      <Profile user={user} posts={posts} likedPosts={likedPosts} repliedPosts={repliedPosts} isFollowing={isCurrentUserFollowing}/>
    </PageLayout>
  )
}

export default Page