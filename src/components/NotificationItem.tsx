import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getNotifications } from '@/actions/notification'
import UserCard from '@/components/UserCard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatTimeDifference, smartTruncateString } from '@/lib/utils'
import { HeartIcon, MessageCircleIcon, Repeat, UserPlusIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

type Notifications = Awaited<ReturnType<typeof getNotifications>>
type Notification = Notifications[number]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "LIKE":
      return <HeartIcon className="size-4 text-red-500" />;
    case "COMMENT":
      return <MessageCircleIcon className="size-4 text-blue-500" />;
    case "FOLLOW":
      return <UserPlusIcon className="size-4 text-base" />;
    case "RETWEET": //TODO
      return <Repeat className="size-4 text-green-500" />;
    default:
      return null;
  }
};

const getNotificationMessage = (type: string) => {
  switch (type) {
    case "LIKE":
      return "Liked your post";
    case "COMMENT":
      return "Commented on your post";
    case "FOLLOW":
      return "Started following you";
    case "RETWEET":
      return "Retweeted your post";
    default:
      return null;
  }
};

const NotificationItem = ({notification}: { notification: Notification }) => {
  return (
    <>
      <Button variant='ghostV2' size='notificationItem' className={`w-full ${!notification.read ? "bg-neutral-200/70 dark:bg-accent/10" : ""}`} asChild>
        <div className='flex flex-row gap-4 items-start'>
          <div className='self-start'>
            <UserCard user={notification.creator}>
              <Link href={`/${notification.creator.username}`}>
                <Avatar>
                  <AvatarImage src={notification.creator.image ?? ''} />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              </Link>
            </UserCard>
          </div>
          <div className='flex flex-col gap-0.5 w-full'>
            <div className='flex flex-row gap-2 text-sm md:text-base items-center'>
              {getNotificationIcon(notification.type)}
              <span className='font-semibold'>{notification.creator.name}</span>
              <p className="break-all whitespace-normal text-sm md:text-base font-normal text-neutral-500">
                <span>{ getNotificationMessage(notification.type) }</span>
              </p>
            </div>
            {/*{notification.post && (notification.type === "LIKE" || notification.type === "RETWEET") && (*/}
            {notification.post && notification.type === "LIKE" && (
              <div className='space-y-1 mb-1'>
                <div className="text-sm text-muted-foreground rounded-md mt-2">
                  <div className="text-neutral-500 font-normal">
                    {notification.post.content && (
                      <p className='break-all whitespace-normal text-sm md:text-base'>{smartTruncateString(notification.post.content, 200)}</p>
                    )}
                    {notification.post.image && (
                      <img
                        src={notification.post.image}
                        className="mt-2 rounded-md w-full max-w-[200px] h-auto object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
            {notification.post && notification.type === "COMMENT" && (
              <div className='space-y-2 mb-1'>
                <div className="text-sm text-muted-foreground rounded-md mt-2">
                  <div className="text-neutral-500 font-normal">
                    {notification.post.content && (
                      <p className='break-all whitespace-normal text-sm md:text-base'>{smartTruncateString(notification.post.content, 200)}</p>
                    )}
                    {notification.post.image && (
                      <img
                        src={notification.post.image}
                        className="mt-2 rounded-md w-full max-w-[200px] h-auto object-cover"
                      />
                    )}
                  </div>
                </div>
                {notification.comment && (
                  <span className="text-base font-normal">
                  {smartTruncateString(notification.comment.content, 100)}
                </span>
                )}
              </div>
            )}
            <span className='text-neutral-500'>{formatTimeDifference(new Date(notification.createdAt))} ago</span>
          </div>
        </div>
      </Button>
      <Separator/>
    </>
  )
}

export default NotificationItem