import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp } from '../../services/users'
import { getTeams } from '../../services/team'
import { setToken, getUser } from '../../utils/auth'
import { UserContext } from '../../contexts/UserContext'
import ImageUpload from '../ImageUpload/ImageUpload'
import { toSnakeCase } from '../../utils/cases'

import '../../styles/forms.css'
import './SignUpForm.css'


export default function SignUpForm() {
    const { setUser } = useContext(UserContext)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        jobTitle: '',
        team: '',
        profileImg: ''
    })
    const [teams, setTeams] = useState([]);
    const [errors, setErrors] = useState({})
    const [uploading, setUploading] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                setUploading(true)
                const teamsData = await getTeams()
                setTeams(Array.isArray(teamsData) ? teamsData : [])
                setErrors({})
            } catch (err) {
                setTeams([])
                setErrors({ teams: 'Failed to load teams' })
                console.error('Error loading teams:', err)
            } finally {
                setUploading(false)
            }
        }
        fetchTeams()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = toSnakeCase(formData)

        try {
            const { data } = await signUp(payload)
            console.log('Signup response:', data)
            setToken(data)
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
            <h2>Create your account</h2>

            <div className="form-row">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder='Your username' value={formData.username} onChange={handleChange} />
                {errors.username && <p className='error-message'>{errors.username}</p>}
            </div>
            <div className="form-row">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder='Your password' value={formData.password} onChange={handleChange} />
                {errors.password && <p className='error-message'>{errors.password}</p>}
            </div>

            <div className="form-row">
                <label htmlFor="passwordConfirmation">Confirm password</label>
                <input type="password" name='passwordConfirmation' id='passwordConfirmation' placeholder='Type your password again' value={formData.passwordConfirmation} onChange={handleChange} />
                {errors.passwordConfirmation && <p className='error-message'>{errors.passwordConfirmation}</p>}
            </div>

            <div className="form-row">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder='yourname@example.com' value={formData.email} onChange={handleChange} />
                {errors.email && <p className='error-message'>{errors.email}</p>}
            </div>

            <div className="form-row">
                <label htmlFor="jobTitle">Job title</label>
                <input type="text" name="jobTitle" id="jobTitle" placeholder='Your job title' value={formData.jobTitle} onChange={handleChange} />
                {errors.jobTitle && <p className='error-message'>{errors.jobTitle}</p>}
            </div>

            <div className="form-row">
                <label htmlFor="team">Team</label>
                <select name="team" id="team" value={formData.team} onChange={handleChange} disabled={uploading}>
                    <option value=""></option>
                    {teams && teams.length > 0 && teams.map(team => (
                        <option key={team.id} value={team.id}>
                            {team.name}
                        </option>
                    ))}
                </select>
                {uploading && <p>Loading teams...</p>}
                {errors.team && <p className='error-message'>{errors.team}</p>}
            </div>
            
            <div className="form-row">
                <ImageUpload
                    labelText="Upload photo"
                    fieldName="profileImg"
                    setFormData={setFormData}
                    imageURLs={formData.profileImg}
                    setImageUploading={setImageUploading}
                    multiple={false}
                />
            </div>

            {errors.message && (
                <div className="error-message general-error">
                    {errors.message}
                </div>
            )}

            <button type="submit">Submit</button>
        </form>
    )
}