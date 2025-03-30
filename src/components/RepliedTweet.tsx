import { getPosts } from '@/actions/post'
import Tweet from '@/components/Tweet'
import CommentItem from '@/components/CommentItem'

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];

const RepliedTweet = ({ post, dbUserId, className }: { post: Post; dbUserId: string | null, className?: string }) => {
  return (
    <>
      {post.comments.filter(post => post.authorId === dbUserId).map(comment => (
        <div key={comment.id} className={'px-5 bg-neutral-200/80 dark:bg-accent/30 rounded-md my-2'}>
          <CommentItem key={comment.id} comment={comment} dbUserId={dbUserId} />
        </div>
      ))}
      <Tweet post={post} dbUserId={dbUserId} className={className}/>
    </>
  )
}

export default RepliedTweet