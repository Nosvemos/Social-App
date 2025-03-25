import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Image, MapPin, Smile } from 'lucide-react'

const NewTweetSection = () => {
  return (
    <div className='flex flex-row items-start w-full'>
      <Avatar className='size-12 mr-2'>
        <AvatarImage src="https://github.com/shadcn.png"/>
        <AvatarFallback></AvatarFallback>
      </Avatar>
      <div className='flex flex-col w-full'>
        <Textarea placeholder="What's happening?" className='max-h-[80vh] overflow-y-auto scrollbar-light dark:scrollbar-dark'/>
        <div className='flex flex-row'>
          <Button variant='reverseIconButton' size='icon'>
            <Image className="size-5" />
          </Button>
          <Button variant='reverseIconButton' size='icon'>
            <Smile className="size-5" />
          </Button>
          <Button variant='reverseIconButton' size='icon' disabled>
            <MapPin className="size-5" />
          </Button>
          <Button className='rounded-full font-bold text-md ml-auto'>Post</Button>
        </div>
      </div>
    </div>
  )
}

export default NewTweetSection