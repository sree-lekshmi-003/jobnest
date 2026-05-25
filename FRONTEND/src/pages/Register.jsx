import { useState } from 'react'

const Register = () => {

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    role:'user'
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    const response = await fetch(
      'http://localhost:3000/user/register',
      {
        method:'POST',

        headers:{
          'Content-Type':'application/json'
        },

        body:JSON.stringify(formData)
      }
    )

    const data = await response.json()

    alert(data.msg)
  }

  return (

    <div className='form-page'>

      <form
        className='form-box'
        onSubmit={handleSubmit}
      >

        <h1>Register</h1>

        <input
          type='text'
          name='name'
          placeholder='Name'
          onChange={handleChange}
        />

        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
        />

        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
        />

        <select
          name='role'
          onChange={handleChange}
        >

          <option value='user'>
            User
          </option>

          <option value='employer'>
            Employer
          </option>

          <option value='admin'>
            Admin
          </option>

        </select>

        <button type='submit'>
          Register
        </button>

      </form>

    </div>
  )
}

export default Register