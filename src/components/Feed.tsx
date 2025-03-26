import NewTweetSection from '@/components/NewTweetSection'
import { Separator } from '@/components/ui/separator'
import { currentUser } from '@clerk/nextjs/server'
import { getUserByClerkId } from '@/actions/user'

const Feed = async() => {
  let user = null;

  const authUser = await currentUser();
  if(authUser) {
    user = await getUserByClerkId(authUser.id);
  }

  if(!user) return null;
  return (
    <>
      <div className="flex flex-col mt-5 px-10 md:px-20">
        <NewTweetSection avatar={user.image} />
      </div>
      <Separator className='my-4'/>
    </>
  )
}

export default Feed