import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

const MenuAvatar = async () => {
  const user = await currentUser();
  return (
    <div className='flex flex-row min-w-max'>
      <UserButton/>
      <div className='flex flex-col items-start max-xl:hidden ml-4'>
        <span className='font-semibold'>{user?.fullName ?? 'Undefined'}</span>
        <span className='text-neutral-500 text-sm'>@{user?.username ?? 'undefined'}</span>
      </div>
    </div>
  )
}

export default MenuAvatar