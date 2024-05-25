import React, { useState } from 'react'
import { CiMenuBurger } from 'react-icons/ci'
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import {
  AiOutlineHome,
  AiOutlineUnorderedList,
  AiOutlineFileAdd,
  AiOutlineCheckCircle,
  AiOutlineNotification,
  AiOutlineUser,
  AiOutlineSetting,
} from 'react-icons/ai'
import { useSpring, animated } from '@react-spring/web'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const IconLink: React.FC<{ to: string; icon: JSX.Element; text: string }> = ({ to, icon, text }) => (
    <Link className="flex items-start text-black text-lg" to={to}>
      {icon}
      <span className="ml-2">{text}</span>
    </Link>
  )

  const sidebarAnimation = useSpring({
    from: {
      opacity: 0,
      transform: isOpen ? 'translateY(-100%)' : 'translateY(0%)',
    },
    to: {
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? 'translateY(0%)' : 'translateY(-100%)',
    },
  })

  return (
    <div className="flex justify-between items-center bg-white p-4  border-b-2 border-red-500">
      <h1 className="text-black text-lg">Win</h1>
      {isOpen ? (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-white p-4 flex flex-col justify-between">
          <div className="flex flex-row">
            <h1 className="basis-11/12 flex items-start text-black text-lg">Win</h1>
            <IoClose
              className="text-black text-3xl cursor-pointer transition-transform transform rotate-90"
              onClick={toggleSidebar}
            />
          </div>
          <animated.div
            className="basis-11/12 flex flex-col border-4 opacity-65 rounded-2xl p-5 gap-3"
            style={sidebarAnimation}
          >
            <IconLink to="/" icon={<AiOutlineHome />} text="首頁介面" />
            <IconLink to="/" icon={<AiOutlineUnorderedList />} text="任務列表" />
            <IconLink to="/" icon={<AiOutlineFileAdd />} text="申請簽核任務" />
            <IconLink to="/" icon={<AiOutlineCheckCircle />} text="簽核操作" />
            <IconLink to="/" icon={<AiOutlineNotification />} text="通知介面" />
            <IconLink to="/" icon={<AiOutlineUser />} text="個人資料" />
            <IconLink to="/" icon={<AiOutlineSetting />} text="系統管理" />
            <div className="flex flex-row w-full justify-end">
              <Link className="flex text-black text-lg" to="/">
                Login
              </Link>
            </div>
          </animated.div>
        </div>
      ) : (
        <CiMenuBurger className="text-black text-2xl cursor-pointer" onClick={toggleSidebar} />
      )}
    </div>
  )
}
