'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2, MapPin, Smile } from 'lucide-react'
import { createComment, FormState } from '@/actions/post'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'

const NewComment = ({ postId }: { postId: string }) => {
  const { user, isSignedIn } = useUser()

  const initialState: FormState = {
    success: false,
    error: undefined,
    message: undefined,
    comment: undefined
  };

  const createCommentWithPostId = createComment.bind(null, postId);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const [state, formAction, isPending] = useActionState<FormState, FormData>(createCommentWithPostId, initialState);

  useEffect(() => {
    if (state?.success === true) {
      toast('Your comment has been successfully created.');
    }
  }, [state]);

  if(!isSignedIn) return null;

  return (
    <div className='flex flex-row items-start w-full'>
      <Avatar>
        <AvatarImage src={user?.imageUrl}/>
        <AvatarFallback></AvatarFallback>
      </Avatar>
      <div className='flex flex-col w-full'>
        <form action={formAction}>
          <Textarea
            placeholder="Post your reply"
            name="content"
            className='max-w-xs md:max-w-[450px] min-h-[50px] max-h-[200px] overflow-y-auto scrollbar'
          />
          {state?.error && (
            <div className="text-red-500 ml-2">
              {state.error}
            </div>
          )}
          <div className='flex flex-row'>
            <Button variant='reverseIconButton' size='icon' disabled>
              <Smile className="size-5" />
            </Button>
            <Button variant='reverseIconButton' size='icon' disabled>
              <MapPin className="size-5" />
            </Button>
            <Button
              className='rounded-full font-bold md:text-base ml-auto'
              type="submit"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Replying...
                </>
              ) : (
                'Reply'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewComment