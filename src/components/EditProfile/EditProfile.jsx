import { useState, useContext, useEffect } from 'react'

import { updateUserProfile } from '../../services/users'
import { getTeams } from '../../services/team'
import { UserContext } from '../../contexts/UserContext'
import ImageUpload from '../ImageUpload/ImageUpload'
import { toSnakeCase, toCamelCase } from '../../utils/cases'


export default function EditProfile() {

    const { user, setUser } = useContext(UserContext)

    const [teams, setTeams] = useState([])
    const [errors, setErrors] = useState({})
    const [uploading, setUploading] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)

    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        jobTitle: user?.jobTitle || '',
        team: user?.team || '',
        profileImg: user?.profileImg || ''
    })

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                username: user.username || '',
                email: user.email || '',
                jobTitle: user.jobTitle || '',
                team: user.team ? (typeof user.team === 'object' ? String(user.team.id) : String(user.team)) : '',
                profileImg: user.profileImg || ''
            }))
        }
    }, [user])

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
        payload.team = payload.team ? Number(payload.team) : null

        console.log('Payload:', payload)

        try {
            const { data } = await updateUserProfile(user.id, payload)
            console.log('Update response:', data)

            const camelCasedData = toCamelCase(data)

            setUser(prevUser => ({
                ...prevUser,
                ...camelCasedData
            }))

        } catch (error) {
            console.error("Update failed:", error.response?.data)
            setErrors(error.response?.data || { message: 'Update failed' })
        }
    }

    const handleChange = (e) => {
        const newFormData = { ...formData }
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <h2>Update your profile</h2>

            <div className="form-row">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder='Your username' value={formData.username} onChange={handleChange} />
                {errors.username && <p className='error-message'>{errors.username}</p>}
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
                        <option key={team.id} value={String(team.id)}>
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