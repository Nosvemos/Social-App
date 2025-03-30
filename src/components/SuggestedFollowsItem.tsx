import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getRandomUsers } from '@/actions/user'
import UserCard from '@/components/UserCard'
import FollowButton from '@/components/FollowButton'

type Users = Awaited<ReturnType<typeof getRandomUsers>>;
type User = Users[number];

const SuggestedFollowsItem = ({ user } : {user: User}) => {
  return (
    <UserCard user={user}>
      <Button variant="link" asChild>
        <div className='flex flex-row gap-4'>
          <Avatar>
            <AvatarImage src={user.image ?? ''} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className='flex flex-col items-start'>
            <span className='font-semibold'>{user.name}</span>
            <span className='text-neutral-500 text-sm'>@{user.username}</span>
          </div>
          <div className='flex flex-col w-full'>
            <FollowButton userId={user.id} className='ml-auto'/>
          </div>
        </div>
      </Button>
    </UserCard>
  )
}

export default SuggestedFollowsItem