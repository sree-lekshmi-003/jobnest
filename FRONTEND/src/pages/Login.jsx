import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({

    email: '',
    password: ''

  })

  // ---------------- HANDLE CHANGE ----------------

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    })
  }

  // ---------------- HANDLE SUBMIT ----------------

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await fetch(

        'http://localhost:3000/user/login',

        {

          method: 'POST',

          headers: {

            'Content-Type': 'application/json'

          },

          body: JSON.stringify(formData)

        }
      )

      const data = await response.json()

      // ---------------- SAVE TOKEN ----------------

      localStorage.setItem('token', data.token)

      localStorage.setItem('role', data.role)
      localStorage.setItem("userid", data.userid)
      localStorage.setItem("name", data.name)

      alert(data.msg)

      // ---------------- ROLE BASED LOGIN ----------------

      if (data.role === 'user') {

        navigate('/user')

      }

      else if (data.role === 'employer') {

        navigate('/employer')

      }

      else if (data.role === 'admin') {

        navigate('/admin')

      }

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div className='form-page'>

      <form
        className='form-box'
        onSubmit={handleSubmit}
      >

        <h1>Login</h1>

        <input
          type='email'
          name='email'
          placeholder='Enter Email'
          onChange={handleChange}
        />

        <input
          type='password'
          name='password'
          placeholder='Enter Password'
          onChange={handleChange}
        />

        <button type='submit'>

          Login

        </button>

      </form>

    </div>
  )
}

export default Login