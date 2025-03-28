'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { toggleFollow } from '@/actions/user'

interface FollowButtonProps {
  userId: string,
  className?: string,
  type?: 'follow' | 'unfollow'
}
const FollowButton = ({userId, className, type} : FollowButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleFollow = async () => {
    setIsLoading(true)
    try {
      await toggleFollow(userId);
      toast(`The user has been successfully ${type}ed.`);
    } catch {
      toast(`The user could not be ${type}ed, please try again later.`);
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Button
      className={`${className} rounded-full`}
      onClick={handleFollow}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
        </>
      ) : (
        type == 'follow' ? 'Follow' : 'Unfollow'
      )}
    </Button>
  )
}

export default FollowButton