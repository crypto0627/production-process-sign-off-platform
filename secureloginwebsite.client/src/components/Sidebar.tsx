import React, { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { logout } from '../redux/authSlice'
import apiService from '../services/LoginApiService'

export default function Sidebar() {
  const IconLink: React.FC<{ to: string; icon: JSX.Element; text: string }> = ({ to, icon, text }) => (
    <Link className="flex items-start text-black text-lg" to={to}>
      {icon}
      <span className="ml-2">{text}</span>
    </Link>
  )

  const [userInfo, setUserInfo] = useState<{ name: string } | null>(null)
  const dispatch = useDispatch()
  const isLogged = useSelector((state: RootState) => state.auth.isLogged)

  useEffect(() => {
    if (isLogged) {
      setTimeout(() => {
        fetchUserInfo()
        console.log(isLogged)
        console.log(userInfo)
      }, 500)
    }
  }, [isLogged])

  const fetchUserInfo = async () => {
    try {
      const user = localStorage.getItem('user')
      const userInfo = await apiService.getUserInfo(user)
      setUserInfo(userInfo)
    } catch (error) {
      console.error('Error fetching user info:', error)
    }
  }

  const handleLogout = async () => {
    try {
      const success = await apiService.logout()
      if (success) {
        dispatch(logout())
      }
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return isLogged ? (
    <div className="hidden md:flex flex-col h-full w-64 bg-white border-4 opacity-65 rounded-2xl">
      <p className="text-white m-4">Sidebar Content</p>
      <div className="basis-11/12 flex flex-col p-5 gap-3">
        <IconLink to="/" icon={<AiOutlineHome />} text="首頁" />
        <IconLink to="/tasklist" icon={<AiOutlineUnorderedList />} text="任務列表" />
        <IconLink to="/" icon={<AiOutlineFileAdd />} text="申請簽核任務" />
        <IconLink to="/" icon={<AiOutlineCheckCircle />} text="簽核操作" />
        <IconLink to="/" icon={<AiOutlineNotification />} text="通知介面" />
        <IconLink to="/" icon={<AiOutlineUser />} text="個人資料" />
        <IconLink to="/" icon={<AiOutlineSetting />} text="系統管理" />
        <div className="flex flex-row w-full justify-end gap-3">
          <h3 className="flex text-black text-lg">{userInfo?.name}</h3>
          <button className="flex text-black text-lg" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="hidden md:flex flex-col h-full w-64 bg-white border-4 opacity-65 rounded-2xl">
      <p className="text-white m-4">Sidebar Content</p>
      <div className="basis-11/12 flex flex-col p-5 gap-3">
        <IconLink to="/" icon={<AiOutlineHome />} text="首頁" />
        <IconLink to="/tasklist" icon={<AiOutlineUnorderedList />} text="任務列表" />
        <IconLink to="/" icon={<AiOutlineFileAdd />} text="申請簽核任務" />
        <IconLink to="/" icon={<AiOutlineCheckCircle />} text="簽核操作" />
        <IconLink to="/" icon={<AiOutlineNotification />} text="通知介面" />
        <IconLink to="/" icon={<AiOutlineUser />} text="個人資料" />
        <IconLink to="/" icon={<AiOutlineSetting />} text="系統管理" />
        <div className="flex flex-row w-full justify-end gap-3">
          <Link className="flex text-black text-lg" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
