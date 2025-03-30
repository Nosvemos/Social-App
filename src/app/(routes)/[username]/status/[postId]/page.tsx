import { getPostById } from '@/actions/post'
import PageLayout from '@/components/layouts/PageLayout'
import Tweet from '@/components/Tweet'
import { notFound } from 'next/navigation'
import { getDbUserId } from '@/actions/user'

const Page = async({
  params,
}: {
  params: Promise<{ postId: string }>
}) => {
  const { postId } = await params;

  const [post, dbUserId] = await Promise.all([
    getPostById(postId),
    getDbUserId()
  ]);

  if (!post) notFound();
  return (
    <PageLayout>
      <Tweet post={post} dbUserId={dbUserId} className={'px-5 md:px-20 mt-5'}/>
    </PageLayout>
  )
}

export default Page