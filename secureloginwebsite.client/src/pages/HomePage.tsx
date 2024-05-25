import { useEffect, useState } from 'react'
import { UserInfoType } from '../types/userInfoType'
import apiService from '../services/LoginApiService'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export default function HomePage() {
  document.title = 'Welcome'

  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null)
  const isLogged = useSelector((state: RootState) => state.auth.isLogged)

  const fetchUserInfo = async () => {
    try {
      const user = localStorage.getItem('user')
      const userInfo = await apiService.getUserInfo(user)
      setUserInfo(userInfo)
    } catch (error) {
      console.error('Error fetching user info:', error)
    }
  }
  useEffect(() => {
    if (isLogged) {
      fetchUserInfo()
    }
  }, [isLogged])

  return (
    <div>
      <header>
        <h1>Welcome to Home page</h1>
      </header>
      {userInfo ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userInfo.name}</td>
                <td>{userInfo.email}</td>
                <td>{userInfo.createdDate ? userInfo.createdDate.split(':')[0] : ''}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="warning">
          <div>Access Denied!</div>
        </div>
      )}
    </div>
  )
}
