import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { kFormatter } from '@/lib/utils'

interface SuggestedFollowsItemProps {
  name: string,
  username: string,
  avatar: string,
  followers: number,
  following: number,
}
const SuggestedFollowsItem = ({ name, username, avatar, followers, following } : SuggestedFollowsItemProps) => {
  return (
    <HoverCard>
      <div className='flex flex-row gap-x-4'>
        <HoverCardTrigger asChild>
          <Button variant="link" asChild>
            <div className='flex flex-row gap-4 mr-auto'>
              <Avatar>
                <AvatarImage src={avatar} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <div className='flex flex-col items-start max-xl:hidden'>
                <span className='font-semibold'>{name}</span>
                <span className='text-neutral-500 text-sm'>@{username}</span>
              </div>
            </div>
          </Button>
        </HoverCardTrigger>
        <Button className='mr-auto rounded-full'>Follow</Button>
      </div>
      <HoverCardContent className="w-80">
        <div className="flex flex-row justify-center space-x-4 mb-4">
          <Link href={`/${username}`}>
            <Avatar className='size-16'>
              <AvatarImage src={avatar} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </Link>
          <Button className='ml-auto rounded-full'>Follow</Button>
        </div>
        <div className="flex flex-col">
          <Link href={`/${username}`}>
            <h4 className="text-md font-semibold">{name}</h4>
          </Link>
          <h4 className="text-md text-neutral-500">@{username}</h4>
          <p className="text-md my-2">
            Bio.
          </p>
          <div className="flex items-center pt-2 gap-4">
            <div className='space-x-1'>
              <span className='font-semibold'>{kFormatter(following)}</span>
              <Link href={`/${username}/following`}>
                <span className="text-sm text-neutral-500">Following</span>
              </Link>
            </div>
            <div className='space-x-1'>
              <span className='font-semibold'>{kFormatter(followers)}</span>
              <Link href={`/${username}/followers`}>
                <span className="text-sm text-neutral-500">Followers</span>
              </Link>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default SuggestedFollowsItem