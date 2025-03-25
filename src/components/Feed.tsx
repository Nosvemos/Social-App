import NewTweetSection from '@/components/NewTweetSection'
import { Separator } from '@/components/ui/separator'

const Feed = () => {
  return (
    <>
      <div className="flex flex-col mt-5 px-10 md:px-20">
        <NewTweetSection/>
      </div>
      <Separator className='my-4'/>
    </>
  )
}

export default Feed