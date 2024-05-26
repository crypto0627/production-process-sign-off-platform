import Footer from '../Footer'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {

  return (
    <div className="flex flex-col h-screen">
      {/* Mobile */}
      <div className="md:hidden relative">
        <Navbar />
        <main className="flex-grow p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
      {/* Desktop */}
      <div className="hidden md:flex flex-row flex-1">
        <div className="w-64">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-grow w-full">
          <main className="flex-grow p-4">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
