import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import FollowButton from '@/components/FollowButton'
import Link from 'next/link'
import { kFormatter } from '@/lib/utils'
import { getRandomUsers } from '@/actions/user'

type Users = Awaited<ReturnType<typeof getRandomUsers>>;
type User = Users[number];

const UserCard = ({
  children, user
}: {
  children: React.ReactNode;
  dbUserId: User;
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex flex-row justify-center space-x-4 mb-4">
          <Link href={`/${user.username}`}>
            <Avatar className='size-16'>
              <AvatarImage src={user.image ?? ''} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </Link>
          <FollowButton type={'follow'} userId={user.id} className='ml-auto'/>
        </div>
        <div className="flex flex-col">
          <Link href={`/${user.username}`}>
            <h4 className="text-md font-semibold">{user.name}</h4>
          </Link>
          <h4 className="text-md text-neutral-500">@{user.username}</h4>
          <p className="text-md my-2">{user.bio}</p>
          <div className="flex items-center pt-2 gap-4">
            <div className='space-x-1'>
              <span className='font-semibold'>{kFormatter(user._count.following)}</span>
              <Link href={`/${user.username}/following`}>
                <span className="text-sm text-neutral-500">Following</span>
              </Link>
            </div>
            <div className='space-x-1'>
              <span className='font-semibold'>{kFormatter(user._count.followers)}</span>
              <Link href={`/${user.username}/followers`}>
                <span className="text-sm text-neutral-500">Followers</span>
              </Link>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default UserCard