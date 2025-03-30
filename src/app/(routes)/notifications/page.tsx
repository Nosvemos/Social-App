import PageLayout from '@/components/layouts/PageLayout'
import Notifications from '@/components/Notifications'

export async function generateMetadata() {
  return {
    title: `Social App | Notifications`,
    description: `Notifications page`,
  };
}

const NotificationsPage = () => {
  return (
    <PageLayout>
      <Notifications />
    </PageLayout>
  )
}

export default NotificationsPage