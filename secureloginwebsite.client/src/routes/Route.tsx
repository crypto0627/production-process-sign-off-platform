// src/router.js
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import DefaultLayout from '../components/Layout/DefaultLayout'
import ProtectedRoutes from './ProtectedRoutes'
import HomePage from '../pages/HomePage'
import Admin from '../pages/Admin'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { Link } from 'react-router-dom'
import TaskList from '../pages/TaskList'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/tasklist" element={<TaskList />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="*"
        element={
          <div>
            <header>Not Found</header>
            <p>
              <Link to="/">Back to Home</Link>
            </p>
          </div>
        }
      />
    </Route>,
  ),
)

export default router
