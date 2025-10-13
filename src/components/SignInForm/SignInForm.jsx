import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../services/users.js'
import { setToken, getUser } from '../../utils/auth'
import { UserContext } from '../../contexts/UserContext'

import '../../styles/forms.css'
import './SignInForm.css'

export default function SignInForm() {
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
      setToken(data)
      setUser(getUser())
      navigate('/')
    } catch (error) {
      const responseData = error.response?.data;
      const detail =
        responseData?.detail ||
        responseData?.non_field_errors?.[0] ||
        'Username or password not recognised. Please try again.';

      setErrors({
        identifier: detail,
        password: detail,
        message: detail
      })
    }
  }

  const handleChange = (e) => {
    const newFormData = { ...formData }
    newFormData[e.target.name] = e.target.value
    setFormData(newFormData)
    setErrors({})
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Log in to your account</h2>

      <div className="form-row">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" placeholder='Your username' value={formData.username} onChange={handleChange} />
      </div>

      <div className="form-row">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" placeholder='Your password' value={formData.password} onChange={handleChange} />
      </div>

      {errors.message && (
        <div className="error-message general-error">
          {errors.message}
        </div>
      )}

      <button type="submit">Sign In</button>
    </form>
  )
}