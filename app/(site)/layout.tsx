import Nav from "@/components/Nav"
import Sidebar from "@/components/Sidebar"
import { SanityLive } from "@/sanity/lib/live"

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="min-h-screen flex flex-col lg:h-screen lg:overflow-hidden">
        <Nav />
        <div className="flex flex-1 flex-col lg:flex-row lg:min-h-0">
          <Sidebar />
          <main className="flex flex-1 flex-col lg:min-h-0 lg:overflow-y-auto">{children}</main>
        </div>
      </div>
      <SanityLive />
    </>
  )
}
