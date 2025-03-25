import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/ThemeProvider'
import Menu from '@/components/Menu'
import SideBar from '@/components/SideBar'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen">
          <div className="grid grid-cols-12 container mx-auto">
            <div className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-2 h-screen sticky top-0">
              <div className="h-screen overflow-y-auto scrollbar-light dark:scrollbar-dark">
                <Menu />
              </div>
            </div>

            <main className="col-span-10 sm:col-span-11 md:col-span-11 lg:col-span-7 min-h-screen border-x">
              {children}
            </main>

            <div className="hidden lg:block lg:col-span-4 xl:col-span-3 h-screen sticky top-0">
              <div className="h-screen overflow-y-auto scrollbar-light dark:scrollbar-dark">
                <SideBar/>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
      </body>
      </html>
    </ClerkProvider>
  );
}