import { Button } from '@/components/ui/button'
import {
  BadgeCheck,
  Bell,
  Bookmark,
  BriefcaseBusiness, CircleEllipsis,
  House,
  Mail, Plus,
  Search,
  User,
  Users,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import MenuItem from '@/components/MenuItem'
import MenuAvatar from '@/components/MenuAvatar'
import ThemeToggle from '@/components/ThemeToggle'

const Menu = ()=> {
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
        href="/"
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
        href="/"
        icon={User}
        label="Profile"
      />

      <MenuItem
        href="/"
        icon={CircleEllipsis}
        label="More"
      />

      <Button className='rounded-full mt-3 mb-8 md:mr-5' size='menuItem' asChild>
        <Link href="#" className="md:min-w-max">
          <Plus className="size-6 hidden max-xl:block" />
          <span className='text-lg font-bold p-12 block max-xl:hidden'>Post</span>
        </Link>
      </Button>

      <MenuAvatar name={'Samet Ozturk'} username={'jesuisamet'} avatar={'https://github.com/shadcn.png'}/>
    </div>
  )
}

export default Menu