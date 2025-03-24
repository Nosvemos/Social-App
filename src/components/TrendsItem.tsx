import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Ellipsis } from 'lucide-react'
import { kFormatter } from '@/lib/utils'

interface TrendsItemProps {
  title: string,
  tag: string,
  postCount: number,
  href?: string,
}

const TrendsItem = ({ title, tag, postCount, href } : TrendsItemProps) => {
  return (
    <Button variant='ghostV2' size='trendsItem' asChild>
      <div className='flex flex-row items-center gap-4 p-3 rounded-lg'>
        <Link href={href ?? '/'} className='flex-1 flex flex-row items-center gap-4'>
          <div className='flex flex-col items-start mr-auto gap-0.5'>
            <span className='text-neutral-500 font-medium'>{title}</span>
            <span className='font-semibold text-[15px]'>{tag}</span>
            <span className='text-neutral-500 font-medium'>{kFormatter(postCount)} posts</span>
          </div>
        </Link>
        <Button variant='iconButton' size='icon' className='rounded-full mb-auto'>
          <Ellipsis className='size-4'/>
        </Button>
      </div>
    </Button>
  )
}

export default TrendsItem