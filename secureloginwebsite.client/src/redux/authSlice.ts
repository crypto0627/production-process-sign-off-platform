import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isLogged: boolean
  user: string | null
}

const initialState: AuthState = {
  isLogged: false,
  user: localStorage.getItem('user') || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLogged = true
      state.user = action.payload
      localStorage.setItem('user', action.payload)
    },
    logout: (state) => {
      state.isLogged = false
      state.user = null
      localStorage.removeItem('user')
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
