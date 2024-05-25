class ApiService {
  baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  public async login(dataToSend: Record<string, any>) {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      const data = await response.json()
      if (!response.ok) {
        let errorMessage = "<div>Attention please:</div><div class='normal'>"
        data.error.forEach((error: any) => {
          errorMessage += error.description + ' '
        })
        errorMessage += '</div>'
        throw new Error(data.message || errorMessage)
      }

      return data
    } catch (error) {
      console.error('Login error: ', error)
      throw error
    }
  }

  public async register(dataToSend: Record<string, any>) {
    try {
      const response = await fetch(`${this.baseUrl}/register`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        let errorMessage = "<div>Attention please:</div><div class='normal'>"
        data.error.forEach((error: any) => {
          errorMessage += error.description + ' '
        })
        errorMessage += '</div>'
        throw new Error(data.message || errorMessage)
      }

      return data
    } catch (error) {
      console.error('Register error: ', error)
      throw error
    }
  }

  public async checkUser() {
    try {
      const response = await fetch(`${this.baseUrl}/xhtlekd`, {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('user', data.user.email)
        return data.user.email
      } else {
        localStorage.removeItem('user')
        return null
      }
    } catch (error) {
      console.error('Error in protected routes:', error)
      localStorage.removeItem('user')
      throw error
    }
  }

  public async logout() {
    try {
      const response = await fetch(`${this.baseUrl}/logout`, {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        localStorage.removeItem('user')
        return true
      } else {
        console.error('Failed to logout')
        return false
      }
    } catch (error) {
      console.error('Error logging out:', error)
      throw error
    }
  }

  public async getUserInfo(user: string | null) {
    try {
      const response = await fetch(`${this.baseUrl}/home/${user}`, {
        method: 'GET',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user info')
      }

      const data = await response.json()
      return data.userInfo
    } catch (error) {
      console.error('Error fetching user info:', error)
      throw error
    }
  }
}

const apiService = new ApiService('/api/SecureLoginWebsite')

export default apiService
