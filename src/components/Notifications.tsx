'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Suspense, useCallback, useEffect, useState } from 'react'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { getNotifications, markNotificationsAsRead } from '@/actions/notification'
import { toast } from 'sonner'
import NotificationItem from '@/components/NotificationItem'
import { SignedIn, SignedOut } from '@clerk/nextjs'

type Notifications = Awaited<ReturnType<typeof getNotifications>>
type Notification = Notifications[number];

const NotificationsCard = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);

      const unreadIds = data.filter(n => !n.read).map(n => n.id);
      if (unreadIds.length > 0) await markNotificationsAsRead(unreadIds);
      return true;
    } catch {
      toast('Your notifications could not be fetched, please try again later.');
      return false;
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchNotifications();
      setIsLoading(false);
    };

    loadData();
  }, [fetchNotifications]);

  if (isLoading) {
    return (
      <Card className="w-full rounded-none border-0 mt-5">
        <CardHeader className='gap-0'>
          <CardTitle>
            <div className='flex flex-row items-center justify-center'>
              <span>Notifications</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {[1, 2, 3].map((item) => (
            <LoadingSkeleton key={item} className='p-4' avatar={true} />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <SignedIn>
        <Card className="w-full rounded-none border-0 mt-5">
          <CardHeader className='gap-0'>
            <CardTitle>
              <div className='flex flex-row items-center justify-center gap-x-1'>
                <span>Notifications</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <Suspense key={notification.id} fallback={<LoadingSkeleton className='p-4' hasThird={true} avatar={true} />}>
                  <NotificationItem notification={notification}/>
                </Suspense>
              ))
            ) : (
              <div className="flex flex-col px-4 pt-4 pb-8 text-center">
                <span className='text-md font-semibold'>Nothing to see here — yet</span>
                <span className='text-neutral-500'>From likes to reposts and a whole lot more, this is where all the action happens.</span>
              </div>
            )}
          </CardContent>
        </Card>
      </SignedIn>
      <SignedOut>
        <Card className="w-full rounded-none border-0 mt-5">
          <CardHeader className='gap-0'>
            <CardTitle>
              <div className='flex flex-row items-center justify-center gap-x-1'>
                <span>Notifications</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col px-4 pt-4 pb-8 text-center">
              <span className='text-md font-semibold'>Nothing to see here — yet</span>
              <span className='text-neutral-500'>Create your account or log in to see your notifications!</span>
            </div>
          </CardContent>
        </Card>
      </SignedOut>
    </>
  );
};

export default NotificationsCard;