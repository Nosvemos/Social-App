'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { deleteComment, getPosts } from '@/actions/post'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Loader2, Trash } from 'lucide-react'
import { formatTimeDifference } from '@/lib/utils'
import { useState } from 'react'
import Link from 'next/link'
import UserCard from '@/components/UserCard'

type Comments = Awaited<ReturnType<typeof getPosts>>;
type Comment = Comments[number];

const CommentItem = ({ comment, dbUserId }: { comment: Comment, dbUserId: string | null }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteComment = async () => {
    try {
      setIsDeleting(true);
      const result = await deleteComment(comment.id);
      if (result.success) {
        toast.success("Your comment has been successfully deleted.");
      } else {
        throw new Error(result.error);
      }
    } catch {
      toast.error("Your comment could not be deleted, please try again later.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="overflow-y-auto max-h-[20rem] scrollbar">
      <div className="flex flex-row gap-4 my-4 items-start">
        <div className='self-start'>
          <UserCard user={comment.author}>
            <Link href={`/${comment.author.username}`}>
              <Avatar>
                <AvatarImage src={comment.author.image ?? ''}/>
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </Link>
          </UserCard>
        </div>
        <div className="flex flex-col gap-0.5 w-full">
          <div className="flex flex-row gap-2">
            <span className="font-semibold">{comment.author.name}</span>
            <span className="text-neutral-500">@{comment.author.username}</span>
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-500">{formatTimeDifference(new Date(comment.createdAt))}</span>
            {dbUserId === comment.author.id && (
              <Button
                className='rounded-full ml-auto text-neutral-500'
                size='deleteIcon'
                variant='iconButton'
                onClick={handleDeleteComment}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Trash/>
                )}
              </Button>
            )}
          </div>
          <p className="break-all whitespace-normal mr-auto">{comment.content}</p>
        </div>
      </div>
    </div>
  )
}

export default CommentItem