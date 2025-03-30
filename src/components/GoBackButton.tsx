'use client'

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const GoBackButton = () => {
  const router = useRouter();
  return (
    <Button variant='ghost' size='menuItem' onClick={() => router.back()}>
      <ArrowLeft className="size-6" />
    </Button>
  )
}

export default GoBackButton