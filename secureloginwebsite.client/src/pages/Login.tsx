import React, { useEffect } from 'react'
import { login } from '../redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../redux/store'
import apiService from '../services/LoginApiService'
import { displayMessage } from '../services/DisplayMessageService'

export default function Login() {
  document.title = 'Login'
  const dispatch = useDispatch()
  const isLogged = useSelector((state: RootState) => state.auth.isLogged)
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user !== null) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    if (isLogged) {
      navigate('/')
    }
  }, [isLogged, navigate])

  async function LoginHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form_ = e.target as HTMLFormElement
    const submitter: HTMLElement | null = document.querySelector('input.login')
    const formData = new FormData(form_, submitter)
    const dataToSend: Record<string, any> = {}

    formData.forEach((value, key) => {
      dataToSend[key] = value
    })

    if (dataToSend.Remember === 'on') {
      dataToSend.Remember = true
    }

    try {
      const data = await apiService.login(dataToSend)
      if (data) {
        dispatch(login(dataToSend.Email))
        localStorage.setItem('user', dataToSend.Email)
        navigate('/')
      } else {
        displayMessage(data.message)
      }
    } catch (error) {
      displayMessage('An error occurred. Please try again.')
      console.error('Login error: ', error)
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={LoginHandler}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <input type="checkbox" name="Remember" />
              <label htmlFor="remember">Remember Password?</label>
            </div>
          </div>

          <div>
            <input
              type="submit"
              value="Login"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            />
          </div>
        </form>

        <div className="message mt-4 text-center text-sm text-red-500"></div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Register now
          </a>
        </p>
      </div>
    </div>
  )
}
