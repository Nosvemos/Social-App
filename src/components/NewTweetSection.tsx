'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Image, Loader2, MapPin, Smile } from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'
import { createPost, FormState } from '@/actions/post'
import { toast } from "sonner"

interface NewTweetSectionProps {
  avatar: string
}

const NewTweetSection = ({ avatar } : NewTweetSectionProps ) => {
  const initialState: FormState = {
    success: false,
    error: undefined,
    message: undefined,
    post: undefined
  };

  const [state, formAction, isPending] = useActionState<FormState, FormData>(createPost, initialState);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (state?.message) {
      if (state.success === true) {
        toast(state.message);
        setImagePreview(null);
      }
    }
  }, [state]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='flex flex-row items-start w-full'>
      <Avatar className='size-12 mr-2'>
        <AvatarImage src={avatar}/>
        <AvatarFallback></AvatarFallback>
      </Avatar>
      <div className='flex flex-col w-full'>
        <form action={formAction}>
          <Textarea
            placeholder="What's happening?"
            name="content"
            className='max-h-[80vh] overflow-y-auto scrollbar-light dark:scrollbar-dark'
            disabled={isPending}
          />
          {state?.error && (
            <div className="text-red-500 ml-2">
              {state.error}
            </div>
          )}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-1/4 h-auto my-2 rounded-md"
            />
          )}
          <div className='flex flex-row'>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="hidden"
              id="imageUpload"
              onChange={handleImageChange}
            />
            <Button
              variant='reverseIconButton'
              size='icon'
              type="button"
              onClick={() => document.getElementById('imageUpload')?.click()}
              disabled={isPending}
            >
              <Image className="size-5" />
            </Button>
            <Button variant='reverseIconButton' size='icon' disabled>
              <Smile className="size-5" />
            </Button>
            <Button variant='reverseIconButton' size='icon' disabled>
              <MapPin className="size-5" />
            </Button>
            <Button
              className='rounded-full font-bold text-md ml-auto'
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Posting...
                </>
              ) : (
                'Post'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewTweetSection