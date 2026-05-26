import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {

  // const navigate = useNavigate()

  // const role = localStorage.getItem('role')

  // // ---------------- LOGOUT ----------------

  // const logout = () => {

  //   localStorage.removeItem('token')

  //   localStorage.removeItem('role')

  //   navigate('/login')
  // }

  return (

    <div className='navbar'>

      <div className='logo'>

        <h1>JobNest</h1>

      </div>

      <div className='nav-links'>

        <Link to='/'>
          Home
        </Link>

        <Link to='/about'>
          About Us
        </Link>

        <Link to='/contact'>
          Contact
        </Link>
    </div>

            <div className="nav-auth">

              <Link to='/login' className='login-btn'>
                Login
              </Link>


              <Link to='/register' className='register-btn'>
                Register
              </Link>
            </div>
      </div>
  )
}

export default Navbar