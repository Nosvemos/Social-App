import GoBackButton from '@/components/GoBackButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import FollowButton from '@/components/FollowButton'
import { kFormatter } from '@/lib/utils'
import Link from 'next/link'
import { CalendarDays } from 'lucide-react'
import { getProfileByUsername } from '@/actions/profile'
import { format } from 'date-fns'
import { SignedIn } from '@clerk/nextjs'

type User = Awaited<ReturnType<typeof getProfileByUsername>>;

const ProfileHeader = async({ user }: { user: NonNullable<User> }) => {
  return (
    <div className="flex flex-col p-4">
      <div className='flex w-full'>
        <GoBackButton/>
        <div className='flex flex-col ml-6'>
          <span className='text-lg font-semibold'>{user.username}</span>
          <span className='text-sm text-neutral-500'>{kFormatter(user._count.posts)} posts</span>
        </div>
      </div>
      <div className='flex ml-4 mt-10 md:mt-15 items-center'>
        <Avatar className='size-24 md:size-32'>
          <AvatarImage src={user.image ?? ''} />
          <AvatarFallback></AvatarFallback>
        </Avatar>
        <SignedIn>
          <FollowButton className='ml-auto' userId={user.id} />
        </SignedIn>
      </div>
      <div className='flex flex-col ml-4 mt-5'>
        <span className='font-bold text-xl'>{user.name}</span>
        <span className='text-md text-neutral-500'>@{user.username}</span>
        <span className='text-md mt-2'>{user.bio}</span>
        <div className='flex items-center text-md text-neutral-500 gap-1 mt-1 mb-2'>
          <CalendarDays className='size-5'/>
          <span>Joined {format(new Date(user.createdAt), "MMMM yyyy")}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className='space-x-1 text-md'>
            <span className='font-semibold'>{kFormatter(user._count.following)}</span>
            <Link href={`${user.username}/following`}>
              <span className="text-neutral-500">Following</span>
            </Link>
          </div>
          <div className='space-x-1 text-md'>
            <span className='font-semibold'>{kFormatter(user._count.followers)}</span>
            <Link href={`${user.username}/followers`}>
              <span className="text-neutral-500">Followers</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader