import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'

interface MenuAvatarProps {
  name: string,
  username: string,
  avatar: string,
}

const MenuAvatar = ({ name, username, avatar} : MenuAvatarProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='flex flex-row items-center gap-4'>
          <Avatar>
            <AvatarImage src={avatar} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className='flex flex-col items-start max-xl:hidden'>
            <span className='font-semibold'>{name}</span>
            <span className='text-neutral-500 text-sm'>@{username}</span>
          </div>
          <Ellipsis className='size-4 ml-auto mr-5 block max-xl:hidden'/>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Add an existing account</DropdownMenuItem>
        <Link href='/'>
          <DropdownMenuItem>Log out @{username}</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MenuAvatar