import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../../services/User'
import { setToken, getUser } from '../../utils/auth'
import { UserContext } from '../../contexts/UserContext'
import ImageUpload from '../ImageUpload/ImageUpload'

import '../../styles/forms.css'
import './SignUpForm.css'


export default function SignUpForm(){
  // Context
  const { setUser } = useContext(UserContext)

  // State
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    jobTitle: '',
    team: '',
    profileImg: ''
  })
  const [errors, setErrors] = useState({})


  // Nav
  const navigate = useNavigate()

  // Functions
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await signUp(formData)
      setToken(data.token)
      setUser(getUser())
      navigate('/')
    } catch (error) {
      setErrors(error.response?.data || { message: 'Sign-up failed' })
    }
  }

  const handleChange = (e) => {
    const newFormData = { ...formData }
    newFormData[e.target.name] = e.target.value
    setFormData(newFormData)
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h2>Join today</h2>

      <ImageUpload
      labelText="Upload photo"
      fieldName="images"
      setFormData={ setFormData }
      imageURLs={formData.profileImg}
      setUploading={setUploading}
      />

      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" placeholder='yourname@example.com' value={formData.email} onChange={handleChange} />
      { errors.email && <p className='error-message'>{errors.email}</p>}

      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" placeholder='Your username' value={formData.username} onChange={handleChange} />
      {errors.username && <p className='error-message'>{errors.username}</p>}

      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" placeholder='Your password' value={formData.password} onChange={handleChange} />
      {errors.password && <p className='error-message'>{errors.password}</p>}

      <label htmlFor="passwordConfirmation">Type your password again</label>
      <input type="password" name='passwordConfirmation' id='passwordConfirmation' placeholder='Confirm password' value={formData.passwordConfirmation} onChange={handleChange} />
      {errors.passwordConfirmation && <p className='error-message'>{errors.passwordConfirmation}</p>}

      {errors.message && (
        <div className="error-message general-error">
          ❌ {errors.message}
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  )
}