import Footer from '../Footer'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import { Outlet, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

export default function DefaultLayout() {
  const isLogged = useSelector((state: RootState) => state.auth.isLogged)
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
      {/* Navigation Links */}
      <nav className="fixed bottom-0 inset-x-0 flex justify-center bg-gray-800 text-white p-2 md:hidden">
        {isLogged ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/admin">Admin</Link>
            <span
              onClick={() => {
                localStorage.removeItem('user')
                window.location.href = '/login'
              }}
            >
              Log Out
            </span>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </div>
  )
}
