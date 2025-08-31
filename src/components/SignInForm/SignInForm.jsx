import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../services/User'
import { setToken, getUser } from '../../utils/auth'
import { UserContext } from '../../contexts/UserContext'

import '../../styles/forms.css'
import './SignInForm.css'

export default function SignInForm(){
  
  // Context
  const { setUser } = useContext(UserContext)

  // State
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  })
  const [errors, setErrors] = useState({})


  // Nav
  const navigate = useNavigate()

  // Functions
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await signIn(formData)
      setToken(data.token)
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
      <h2>Welcome back to <span className='brand-font'>Re-lux</span></h2>
      
      <label htmlFor="identifier">Email or Username</label>
      <input type="text" name="identifier" id="identifier" placeholder='yourname@example.com or username' value={formData.identifier} onChange={handleChange} />
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