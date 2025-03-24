import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'

interface MenuItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  active?: string;
}

const MenuItem = ({
  href,
  icon: Icon,
  label,
  active
}: MenuItemProps) => {
  return (
    <Button variant='ghost' size='menuItem' asChild>
      <Link
        href={href}
        className={`flex items-center gap-5 w-fit`}
      >
        <Icon className="size-6" />
        <span className={`text-xl font-semibold mr-5 block max-xl:hidden ${active ? 'font-semibold' : 'font-thin'}`}>
          {label}
        </span>
      </Link>
    </Button>
  )
}

export default MenuItem