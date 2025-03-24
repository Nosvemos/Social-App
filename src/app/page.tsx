import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <div className='m-4'>
      <SignedOut>
        <SignInButton mode='modal'>
          <Button>
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>

      <ThemeToggle />

      <Button variant='secondary'>Click me!</Button>
    </div>
  );
}
