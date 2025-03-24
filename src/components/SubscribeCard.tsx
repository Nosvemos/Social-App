import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const SubscribeCard = () => {
  return (
    <Card className="w-full py-3">
      <CardHeader>
        <CardTitle>Subscribe to Premium</CardTitle>
        <CardDescription className='leading-snug'>Subscribe to unlock new features and if eligible, receive a share of revenue.</CardDescription>
      </CardHeader>
      <CardContent className='px-4'>
        <Button variant='blueButton'>Subscribe</Button>
      </CardContent>
    </Card>
  )
}

export default SubscribeCard