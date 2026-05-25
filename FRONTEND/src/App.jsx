import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import EmployerDashboard from './pages/employer/EmployerDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import MyApplications from './pages/MyApplications'
import UserDashboard from './pages/user/UserDashboard'
function App() {

  return (

    <div>

      <Navbar />

      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/login' element={<Login />} />

        <Route path='/register' element={<Register />} />

        <Route
          path='/applications'
          element={<MyApplications />}
        />

        <Route
          path='/employer'
          element={<EmployerDashboard />}
        />

        <Route
          path='/admin'
          element={<AdminDashboard />}
        />

        <Route
          path='/user'
          element={<UserDashboard />}
        />

      </Routes>



    </div>
  )
}

export default App