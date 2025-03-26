import Menu from '@/components/Menu'
import SideBar from '@/components/SideBar'

const PageLayout = async({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-12 container mx-auto">
        <div className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-2 h-screen sticky top-0">
          <div className="h-screen overflow-y-auto scrollbar-light dark:scrollbar-dark">
            <Menu />
          </div>
        </div>

        <main className="col-span-10 sm:col-span-11 md:col-span-11 lg:col-span-7 min-h-screen border-x border-zinc-300 dark:border-zinc-800">
          {children}
        </main>

        <div className="hidden lg:block lg:col-span-4 xl:col-span-3 h-screen sticky top-0">
          <div className="h-screen overflow-y-auto scrollbar-light dark:scrollbar-dark">
            <SideBar/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageLayout