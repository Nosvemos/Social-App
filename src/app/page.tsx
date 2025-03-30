import PageLayout from '@/components/layouts/PageLayout'
import Feed from '@/components/Feed'

export async function generateMetadata() {
  return {
    title: `Social App | Home`,
    description: `Home page`,
  };
}

export default function HomePage() {
  return (
    <PageLayout>
      <Feed/>
    </PageLayout>
  )
}
