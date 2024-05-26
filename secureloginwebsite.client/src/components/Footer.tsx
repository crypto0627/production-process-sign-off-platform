import { IoMailOpen, IoPhonePortraitSharp } from 'react-icons/io5'
export default function Footer() {
  return (
    <footer className="bg-white text-gray-300 py-6 border-2 rounded-2xl shadow-xl bg-opacity-70">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="/" className="text-gray-300 text-2xl font-bold">
              MyApp
            </a>
          </div>
          <div className="flex space-x-4">
            <a href="/" className="hover:text-white">
              Home
            </a>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="mailto:info@myapp.com" className="hover:text-white">
              <IoMailOpen className="h-6 w-6" />
            </a>
            <a href="tel:+123456789" className="hover:text-white">
              <IoPhonePortraitSharp className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-4 text-center md:text-right">
          &copy; {new Date().getFullYear()} LHA. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
