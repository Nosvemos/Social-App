import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { MessageCircle, X } from 'lucide-react'
import { getPosts } from '@/actions/post'
import CommentItem from '@/components/CommentItem'
import NewComment from '@/components/NewComment'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { formatTimeDifference } from '@/lib/utils'
import Link from 'next/link'
import UserCard from '@/components/UserCard'

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];

const Comments = ({ dbUserId, post, hasCommented }: { dbUserId: string | null, post: Post, hasCommented: boolean }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='iconButton' size='icon' className='rounded-full'>
          <MessageCircle className={hasCommented ? 'fill-current text-blue-400' : ''}/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogCancel asChild>
            <Button variant='ghostV2' size='icon' className='rounded-full'>
              <X/>
            </Button>
          </AlertDialogCancel>
          <AlertDialogTitle className={'hidden'}></AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              <div className='flex flex-row gap-4 items-start'>
                <div className='self-start'>
                  <UserCard user={post.author}>
                    <Link href={`/${post.author.username}`}>
                      <Avatar>
                        <AvatarImage src={post.author.image}/>
                        <AvatarFallback></AvatarFallback>
                      </Avatar>
                    </Link>
                  </UserCard>
                </div>
                <div className='flex flex-col gap-0.5 w-full mb-2'>
                  <div className='flex flex-row gap-2'>
                    <span className='font-semibold'>{post.author.name}</span>
                    <span className='text-neutral-500'>@{post.author.username}</span>
                    <span className='text-neutral-500'>·</span>
                    <span className='text-neutral-500'>{formatTimeDifference(new Date(post.createdAt))} ago</span>
                  </div>
                  <p className="break-all whitespace-pre md:whitespace-normal mr-auto">{post.content} {post.image ?? ''}</p>
                  {dbUserId && (
                    <p className="text-neutral-500 text-sm mr-auto">Replying to <span className='text-blue-400'>@{post.author.username}</span></p>
                  )}
                </div>
              </div>
              <NewComment postId={post.id} />

              <h1 className='font-semibold mt-4 mb-2 text-left text-sm md:text-lg'>Comments ({post._count.comments})</h1>
              { post._count.comments > 0 ? (
                post.comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} dbUserId={dbUserId} />
                ))
              ) : (
                <p className="text-sm mb-2">No comments yet.</p>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Comments