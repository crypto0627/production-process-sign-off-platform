import React, { useEffect } from 'react'
import { displayMessage } from '../services/DisplayMessageService'
import apiService from '../services/LoginApiService'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  document.title = 'Register'
  const navigate = useNavigate()
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      document.location.href = '/'
    }
  }, [])

  async function RegisterHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form_ = e.target as HTMLFormElement
    const formData = new FormData(form_)
    const dataToSend: Record<string, any> = {}

    formData.forEach((value, key) => {
      dataToSend[key] = value
    })
    const newUserName = dataToSend.Name.trim().split(' ')
    dataToSend.UserName = newUserName.join('')

    try {
      const data = await apiService.register(dataToSend)
      console.log(data)
      if (data) {
        navigate('/login')
      } else {
        let errorMessage = "<div>Attention please:</div><div class='normal'>"
        data.error.forEach((error: any) => {
          errorMessage += error.description + ' '
        })
        errorMessage += '</div>'
        displayMessage(data.message || errorMessage)
        console.log(displayMessage)
      }
    } catch (error) {
      displayMessage('An error occurred. Please try again.')
      console.error('Register error: ', error)
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
        <form className="space-y-6" onSubmit={RegisterHandler}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="Name"
                type="text"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="Email"
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
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="PasswordHash"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <input
              type="submit"
              value="Register"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            />
          </div>
        </form>

        <div className="message mt-4 text-center text-sm text-red-500"></div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already register?{' '}
          <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Login your account
          </a>
        </p>
      </div>
    </div>
  )
}
