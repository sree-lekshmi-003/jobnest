import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  const role = localStorage.getItem('role')

  // ---------------- LOGOUT ----------------

  const logout = () => {

    localStorage.removeItem('token')

    localStorage.removeItem('role')

    navigate('/login')
  }

  return (

    <div className='navbar'>

      <div className='logo'>

        <h1>JobNest</h1>

      </div>

      <div className='nav-links'>

        <Link to='/'>
          Home
        </Link>

        {/* ---------------- USER ---------------- */}

        {
          role === "user" &&

          <Link to='/applications'>
            My Applications
          </Link>
        }

        {/* ---------------- EMPLOYER ---------------- */}

        {
          role === "employer" &&

          <Link to='/employer'>
            Employer Dashboard
          </Link>
        }

        {/* ---------------- ADMIN ---------------- */}

        {
          role === "admin" &&

          <Link to='/admin'>
            Admin Dashboard
          </Link>
        }

        {/* ---------------- LOGIN / LOGOUT ---------------- */}

        {
          !role ?

            <Link to='/login'>
              Login
            </Link>

            :

            <button onClick={logout}>
              Logout
            </button>
        }

      </div>

    </div>
  )
}

export default Navbar