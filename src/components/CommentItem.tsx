import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createComment } from '@/actions/post'
import { formatDistanceToNow } from 'date-fns'

type Comments = Awaited<ReturnType<typeof createComment>>;
type Comment = Comments[number];

const CommentItem = ({ comment }: Comment) => {
  return (
    <div className="overflow-y-auto max-h-[20rem] scrollbar-light dark:scrollbar-dark">
      <div className="flex flex-row gap-4 my-6">
        <div className="flex flex-col">
          <Avatar>
            <AvatarImage src={comment.author.image}/>
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-row gap-2 text-xs md:text-base">
            <span className="font-semibold">{comment.author.name}</span>
            <span className="text-neutral-500">@{comment.author.username}</span>
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-500">{formatDistanceToNow(new Date(comment.createdAt))}</span>
          </div>
          <p className="break-all whitespace-pre md:whitespace-normal mr-auto">{comment.content}</p>
        </div>
      </div>
    </div>
  )
}

export default CommentItem