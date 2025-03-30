'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { toggleFollow } from '@/actions/user'
import { getDbUserId } from '@/actions/user'
import { isFollowing } from '@/actions/profile'

interface FollowButtonProps {
  userId: string,
  className?: string
}

const FollowButton = ({userId, className } : FollowButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUserFollowing, setIsUserFollowing] = useState<boolean>(false);
  const [dbUserId, setDbUserId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const [id, followStatus] = await Promise.all([
          getDbUserId(),
          isFollowing(userId)
        ]);

        if (isMounted) {
          setDbUserId(id);
          setIsUserFollowing(followStatus);
          setIsReady(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (isMounted) {
          setIsReady(true);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      const result = await toggleFollow(userId);
      setIsUserFollowing(!isUserFollowing);
      toast(`The user has been successfully ${isUserFollowing ? 'unfollowed' : 'followed'}.`);
    } catch (error) {
      console.error("Error toggling follow:", error);
      toast(`The user could not be ${isUserFollowing ? 'unfollowed' : 'followed'}, please try again later.`);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isReady) {
    return (
      <Button
        className={`${className} rounded-full`}
        disabled={true}
      >
        <Loader2 className="animate-spin" />
      </Button>
    );
  }

  if (dbUserId === userId) {
    return null;
  }

  return (
    <Button
      className={`${className} rounded-full`}
      onClick={handleFollow}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        isUserFollowing ? 'Unfollow' : 'Follow'
      )}
    </Button>
  );
}

export default FollowButton