import { Button } from '@/components/ui/button'
import {
  BadgeCheck,
  Bell, Bird,
  Bookmark,
  BriefcaseBusiness, CircleEllipsis, Ellipsis,
  House,
  Mail, Plus,
  Search,
  User,
  Users,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

function Menu () {
  return (
    <div className='flex flex-col max-md:justify-center max-md:items-center my-2 gap-3.5'>
      <Button variant='ghost' size='menuIcon' asChild>
        <Link href="/" className="flex gap-1">
          <Bird className="size-8" />
        </Link>
      </Button>

      <Button variant='ghost' size='menuItem' asChild>
        <Link href="/" className="gap-5 w-fit">
          <House className="size-6" />
          <span className="text-xl font-semibold mr-5 block max-xl:hidden">Home</span>
        </Link>
      </Button>

      <Button variant='ghost' size='menuItem' asChild>
        <Link href="#" className="gap-5 w-fit">
          <Search className="size-6" />
          <span className="text-xl font-thin mr-5 block max-xl:hidden">Explore</span>
        </Link>
      </Button>

      <Button variant='ghost' size='menuItem' asChild>
        <Link href="#" className="gap-5 w-fit">
          <Bell className="size-6" />
          <span className="text-xl font-thin mr-5 block max-xl:hidden">Notifications</span>
        </Link>
      </Button>

      <Button variant='ghost' size='menuItem' asChild>
        <Link href="#" className="gap-5 w-fit">
          <Mail className="size-6" />
          <span className="text-xl font-thin mr-5 block max-xl:hidden">Messages</span>
        </Link>
      </Button>

      <Button variant='ghost' size='menuItem' asChild>
        <Link href="#" className="gap-5 w-fit">
          <Bookmark className="size-6" />
          <span className="text-xl font-thin mr-5 block max-xl:hidden">Bookmarks</span>
        </Link>
      </Button>

      <Button variant='ghost' size='menuItem' asChild>
        <Link href="#" className="gap-5 w-fit">
          <BriefcaseBusiness className="size-6" />
          <span className="text-xl font-thin mr-5 block max-xl:hidden">Jobs</span>
        </Link>
      </Button>

      <Button variant='ghost' size='menuItem' asChild>
        <Link href="#" className="gap-5 w-fit">
          <Users className="size-6" />
          <span className="text-xl font-thin mr-5 block max-xl:hidden">Communities</span>
        </Link>
      </Button>

      <Button variant='ghost' size='menuItem' asChild>
        <Link href="#" className="gap-5 w-fit">
          <BadgeCheck className="size-6" />
          <span className="text-xl font-thin mr-5 block max-xl:hidden">Premium</span>
        </Link>
      </Button>

      <Button variant='ghost' size='menuItem' asChild>
        <Link href="#" className="gap-5 w-fit">
          <Zap className="size-6" />
          <span className="text-xl font-thin mr-5 block max-xl:hidden">Verified Orgs</span>
        </Link>
      </Button>

      <Button variant='ghost' size='menuItem' asChild>
        <Link href="/" className="gap-5 w-fit">
          <User className="size-6" />
          <span className="text-xl font-thin mr-5 block max-xl:hidden">Profile</span>
        </Link>
      </Button>

      <Button variant='ghost' size='menuItem' asChild>
        <Link href="#" className="gap-5 w-fit">
          <CircleEllipsis className="size-6" />
          <span className="text-xl font-thin mr-5 block max-xl:hidden">More</span>
        </Link>
      </Button>

      <Button className='rounded-full mt-3 mb-8 md:mr-5' size='menuItem' asChild>
        <Link href="#" className="md:min-w-max">
          <Plus className="size-6 hidden max-xl:block" />
          <span className='text-lg font-bold p-12 block max-xl:hidden'>Post</span>
        </Link>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='flex flex-row items-center gap-4'>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div className='flex flex-col items-start max-xl:hidden'>
              <span className='font-semibold'>name</span>
              <span className='text-gray-400'>@username</span>
            </div>
            <Ellipsis className='size-4 ml-auto mr-5 block max-xl:hidden'/>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Add an existing account</DropdownMenuItem>
          <DropdownMenuItem>Log out @username</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Menu