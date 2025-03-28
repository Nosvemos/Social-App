'use client'

import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ChartNoAxesColumn, Heart, Repeat } from 'lucide-react'
import { getPosts, toggleLike } from '@/actions/post'
import { formatDistanceToNow } from "date-fns";
import { kFormatter } from '@/lib/utils'
import { useState } from 'react'
import Comments from '@/components/Comments'

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];

const Tweet = ({ post, dbUserId }: { post: Post; dbUserId: string | null }) => {
  const [hasLiked, setHasLiked] = useState(post.likes.some(like => like.userId === dbUserId));
  const [isLiking, setIsLiking] = useState(false);
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

  return (
    <>
      <div className='flex flex-col mt-5 px-5 md:px-20'>
        <div className='flex flex-row gap-4'>
          <Avatar>
            <AvatarImage src={post.author.image ?? ''} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-0.5'>
            <div className='flex flex-row gap-2 text-sm md:text-base'>
              <span className='font-semibold'>{post.author.name}</span>
              <span className='text-neutral-500'>@{post.author.username}</span>
              <span className='text-neutral-500'>·</span>
              <span className='text-neutral-500'>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
            </div>
            <p className="break-all whitespace-pre md:whitespace-normal text-sm md:text-base">{post.content}</p>
            {post.image && (
              <img src={post.image} className='max-w-full md:max-w-5/6 h-auto border rounded-xl mt-2' alt='image'></img>
            )}
            <div className='flex flex-row max-w-5/6 justify-between'>
              <div className='flex flex-row items-center justify-center hover:text-blue-400 text-neutral-500'>
                <Comments post={post}/>
                <span>{kFormatter(post._count.comments)}</span>
              </div>
              <div className='flex flex-row items-center justify-center hover:text-green-400 text-neutral-500'>
                <Button variant='repeatButton' size='icon' className='rounded-full' disabled>
                  <Repeat/>
                </Button>
                <span>?</span>
              </div>
              <div className='flex flex-row items-center justify-center hover:text-red-400 text-neutral-500'>
                <Button variant='heartButton' size='icon' className='rounded-full' onClick={handleLike}>
                  <Heart className={hasLiked ? 'fill-current text-red-400' : ''} />
                </Button>
                <span className={hasLiked ? 'text-red-400' : ''}>{kFormatter(optimisticLikes)}</span>
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
    </>
  )
}

export default Tweet