import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {

  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  // ---------------- LOGOUT ----------------

  const logout = () => {

    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userid')
    localStorage.removeItem('name')

    navigate('/login')
  }

  return (

    <div className='navbar'>

      <div className='logo'>
        <h1>JobNest</h1>
      </div>

      <div className='nav-links'>
        <Link to='/'>Home</Link>
        <Link to='/about'>About Us</Link>
        <Link to='/contact'>Contact</Link>
        {token && role === "user" && (
          <Link to='/myapplications'>
            My Applications
          </Link>
        )}
      </div>

      <div className='nav-auth'>

        {
          !token ? (
            <>
              <Link to='/login' className='login-btn'>
                Login
              </Link>

              <Link to='/register' className='register-btn'>
                Register
              </Link>
            </>
          ) : (
            <>
              <span className='welcome-text'>
                Welcome {localStorage.getItem('name')}
              </span>

              <button
                className='register-btn'
                onClick={logout}
              >
                Logout
              </button>
            </>
          )
        }

      </div>

    </div>
  )
}

export default Navbar