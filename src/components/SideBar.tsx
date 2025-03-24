import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import SubscribeCard from '@/components/SubscribeCard'
import TrendsCard from '@/components/TrendsCard'
import SuggestedFollowsCard from '@/components/SuggestedFollowsCard'

const SideBar = () => {
  return (
    <div className='flex flex-col justify-center items-center my-3 mx-4 gap-4'>
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search"
          className="rounded-full pl-10"
        />
      </div>
      <SubscribeCard/>
      <TrendsCard/>
      <SuggestedFollowsCard/>
    </div>
  )
}

export default SideBar