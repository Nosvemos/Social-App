import { UserButton } from '@clerk/nextjs'

interface MenuAvatarProps {
  name: string,
  username: string
}

const MenuAvatar = async ({ name, username } : MenuAvatarProps ) => {
  return (
    <div className='flex flex-row min-w-max'>
      <UserButton/>
      <div className='flex flex-col items-start max-xl:hidden ml-4'>
        <span className='font-semibold'>{name ?? 'Undefined'}</span>
        <span className='text-neutral-500 text-sm'>@{username}</span>
      </div>
    </div>
  )
}

export default MenuAvatar