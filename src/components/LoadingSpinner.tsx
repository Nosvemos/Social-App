import { LoaderCircle } from 'lucide-react'

const LoadingSpinner = ({ size } : { size?: number}) => {
  return (
    <LoaderCircle className='animate-spin mx-auto text-blue-400' size={size} />
  )
}

export default LoadingSpinner