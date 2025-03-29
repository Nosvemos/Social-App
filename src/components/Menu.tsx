import { Button } from '@/components/ui/button'
import {
  BadgeCheck,
  Bell,
  Bookmark,
  BriefcaseBusiness, CircleEllipsis,
  House, LogIn,
  Mail, Plus,
  Search,
  User, UserPlus,
  Users,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import MenuItem from '@/components/MenuItem'
import MenuAvatar from '@/components/MenuAvatar'
import ThemeToggle from '@/components/ThemeToggle'
import { Suspense } from 'react'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { currentUser } from '@clerk/nextjs/server'
import { getUserByClerkId, syncUser } from '@/actions/user'
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'
import { Separator } from '@/components/ui/separator'

const Menu = async()=> {
  let user = null;

  const authUser = await currentUser();

  if(authUser) {
    await syncUser();
    user = await getUserByClerkId(authUser.id);
  }

  return (
    <div className='flex flex-col max-md:justify-center max-md:items-center my-2 gap-3.5'>
      <ThemeToggle />

      <MenuItem
        href="/"
        icon={House}
        label="Home"
        active='true'
      />

      <MenuItem
        href="/"
        icon={Search}
        label="Explore"
      />

      <MenuItem
        href="/notifications"
        icon={Bell}
        label="Notifications"
      />

      <MenuItem
        href="/"
        icon={Mail}
        label="Messages"
      />

      <MenuItem
        href="/"
        icon={Bookmark}
        label="Bookmarks"
      />

      <MenuItem
        href="/"
        icon={BriefcaseBusiness}
        label="Jobs"
      />

      <MenuItem
        href="/"
        icon={Users}
        label="Communities"
      />

      <MenuItem
        href="/"
        icon={BadgeCheck}
        label="Premium"
      />

      <MenuItem
        href="/"
        icon={Zap}
        label="Verified Orgs"
      />

      <MenuItem
        href={user ? `/${user.username}` : '/'}
        icon={User}
        label="Profile"
      />

      <MenuItem
        href="/"
        icon={CircleEllipsis}
        label="More"
      />

      <SignedIn>
        <Button className='rounded-full mt-3 mb-8 md:mr-5' size='menuItem' asChild>
          <Link href="#" className="md:min-w-max">
            <Plus className="size-6 hidden max-xl:block" />
            <span className='text-lg font-bold p-12 block max-xl:hidden'>Post</span>
          </Link>
        </Button>

        <Suspense fallback={<LoadingSkeleton avatar={true} />}>
          <MenuAvatar name={user?.name} username={user?.username}/>
        </Suspense>
      </SignedIn>

      <SignedOut>
        <Separator/>
        <SignInButton mode='modal'>
          <Button variant='ghost' size='menuItem' asChild>
            <Link
              href={''}
              className={`flex items-center gap-5 w-fit`}
            >
              <LogIn className="size-6" />
              <span className='text-xl mr-5 block max-xl:hidden font-thin'>
                Sign in
              </span>
            </Link>
          </Button>
        </SignInButton>
        <SignUpButton mode='modal'>
          <Button variant='ghost' size='menuItem' asChild>
            <Link
              href={''}
              className={`flex items-center gap-5 w-fit`}
            >
              <UserPlus className="size-6" />
              <span className='text-xl mr-5 block max-xl:hidden font-thin'>
                Sign Up
              </span>
            </Link>
          </Button>
        </SignUpButton>
      </SignedOut>
    </div>
  )
}

export default Menu