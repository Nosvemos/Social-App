import { Skeleton } from '@/components/ui/skeleton'
import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  className?: string,
  avatar?: boolean,
  hasThird?: boolean
}

const LoadingSkeleton = ({ className, avatar, hasThird } : LoadingSkeletonProps) => {
  return (
    <div className={cn(className, 'flex items-center space-x-4')}>
      { avatar && (
        <Skeleton className='h-12 w-12 rounded-full' />
      )}
      <div className="space-y-2 max-xl:hidden">
        <Skeleton className="h-4 w-30" />
        <Skeleton className="h-4 w-15" />
        { hasThird && (
          <Skeleton className="h-4 w-10" />
        )}
      </div>
    </div>
  )
}

export default LoadingSkeleton