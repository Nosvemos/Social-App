'use client'

import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ChartNoAxesColumn, Heart, Loader2, Repeat, Trash } from 'lucide-react'
import { deletePost, getPosts, toggleLike } from '@/actions/post'
import { formatTimeDifference, kFormatter } from '@/lib/utils'
import { useState } from 'react'
import Comments from '@/components/Comments'
import { toast } from 'sonner'
import UserCard from '@/components/UserCard'
import Link from 'next/link'

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];

const Tweet = ({ post, dbUserId, className }: { post: Post; dbUserId: string | null, className?: string }) => {
  const hasCommented = post.comments.some(comment => comment.authorId === dbUserId);
  const [hasLiked, setHasLiked] = useState(post.likes.some(like => like.userId === dbUserId));
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [optimisticLikes, setOptimisticLikes] = useState(post._count.likes);

  const handleLike = async () => {
    if(isLiking) return;
    try {
      setIsLiking(true);
      setHasLiked((prev) => !prev);
      setOptimisticLikes(prev => prev + (hasLiked ? -1 : 1));

      await toggleLike(post.id)
    } catch {
      setOptimisticLikes(post._count.likes);
      setHasLiked(post.likes.some((like) => like.userId === dbUserId));
    } finally {
      setIsLiking(false);
    }
  }

  const handleDeletePost = async () => {
    try {
      setIsDeleting(true);
      const result = await deletePost(post.id);
      if (result.success) toast("Your comment has been successfully deleted.");
      else throw new Error(result.error);
    } catch {
      toast("Your comment could not be deleted, please try again later.");
      setIsDeleting(false);
    }
  };

  return (
    <div className={className}>
      <div className='flex flex-col'>
        <div className='flex flex-row gap-4 items-start'>
          <div className='self-start'>
            <UserCard user={post.author}>
              <Link href={`/${post.author.username}`}>
                <Avatar>
                  <AvatarImage src={post.author.image ?? ''} />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              </Link>
            </UserCard>
          </div>
          <div className='flex flex-col gap-0.5 w-full'>
            <div className='flex flex-row gap-2 text-sm md:text-base'>
              <span className='font-semibold'>{post.author.name}</span>
              <span className='text-neutral-500'>@{post.author.username}</span>
              <span className='text-neutral-500'>·</span>
              <span className='text-neutral-500'>{formatTimeDifference(new Date(post.createdAt))} ago</span>
              {dbUserId === post.author.id && (
                <Button className='rounded-full ml-auto text-neutral-500' size='deleteIcon' variant='iconButton' onClick={handleDeletePost}>
                  {isDeleting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Trash/>
                  )}
                </Button>
              )}
            </div>
            <p className="break-all whitespace-normal text-sm md:text-base">{post.content}</p>
            {post.image && (
              <img src={post.image} className='max-w-full md:max-w-5/6 h-auto border rounded-xl mt-2' alt='image'></img>
            )}
            <div className='flex flex-row w-full lg:max-w-2/3 xl:max-w-1/2 justify-between pt-1'>
              <div className='flex flex-row items-center justify-center hover:text-blue-400 text-neutral-500'>
                <Comments dbUserId={dbUserId} hasCommented={hasCommented} post={post}/>
                <span className={hasCommented ? 'text-blue-400' : ''}>{kFormatter(post._count.comments)}</span>
              </div>
              <div className='flex flex-row items-center justify-center hover:text-green-500 text-neutral-500'>
                <Button variant='repeatButton' size='icon' className='rounded-full' disabled>
                  <Repeat/>
                </Button>
                <span>?</span>
              </div>
              <div className='flex flex-row items-center justify-center hover:text-red-500 text-neutral-500'>
                <Button variant='heartButton' size='icon' className='rounded-full' onClick={handleLike} disabled={!dbUserId}>
                  <Heart className={hasLiked ? 'fill-current text-red-500' : ''} />
                </Button>
                <span className={hasLiked ? 'text-red-500' : ''}>{kFormatter(optimisticLikes)}</span>
              </div>
              <div className='flex flex-row items-center justify-center hover:text-blue-400 text-neutral-500'>
                <Button variant='iconButton' size='icon' className='rounded-full' disabled>
                  <ChartNoAxesColumn/>
                </Button>
                <span>?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator className='my-5'/>
    </div>
  )
}

export default Tweet