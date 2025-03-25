import { Bird } from 'lucide-react'

const Loading = async() => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Bird className='animate-spin text-blue-400' size={60} />
    </div>
  )
}

export default Loading