import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../services/User'
import { setToken, getUser } from '../../utils/auth'
import { UserContext } from '../../contexts/UserContext'

import '../../styles/forms.css'
import './SignInForm.css'

export default function SignInForm(){
  
  const { setUser } = useContext(UserContext)

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await signIn(formData)
      console.log('Login response:', data)
      console.log(formData)
      setToken(data)
      setUser(getUser())
      navigate('/')
    } catch (error) {
      setErrors(error.response?.data || { message: 'Sign-in failed' })
    }
  }

  const handleChange = (e) => {
    const newFormData = { ...formData }
    newFormData[e.target.name] = e.target.value
    setFormData(newFormData)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Log in to your account</h2>
      
      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" placeholder='Your username' value={formData.username} onChange={handleChange} />
      {errors.identifier && <p className='error-message'>{errors.identifier}</p>}

      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" placeholder='Your password' value={formData.password} onChange={handleChange} />
      {errors.password && <p className='error-message'>{errors.password}</p>}

      {errors.message && (
        <div className="error-message general-error">
          ❌ {errors.message}
        </div>
      )}

      <button type="submit">Sign In</button>
    </form>
  )
}