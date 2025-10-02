import './ProfileDetails.css'

import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../../contexts/UserContext'
import { getUserTasks } from '../../services/projects.js'
import { updateUserProfile } from '../../services/users'
import { getTeams } from '../../services/team'
import ImageUpload from '../ImageUpload/ImageUpload'
import { toSnakeCase, toCamelCase } from '../../utils/cases'

import FormModal from '../FormModal/FormModal'
import EditProfile from '../EditProfile/EditProfile'


const ProfileDetails = () => {
    const { user, setUser } = useContext(UserContext)
    const [tasks, setTasks] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [teams, setTeams] = useState([])
    const [errors, setErrors] = useState({})
    const [uploading, setUploading] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        jobTitle: user?.jobTitle || '',
        team: user?.team ? (typeof user.team === 'object' ? String(user.team.id) : String(user.team)) : '',
        profileImg: user?.profileImg || ''
    })


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


    useEffect(() => {
        const userTasks = async () => {
            const response = await getUserTasks()
            setTasks(response.data.map(task => toCamelCase(task)))
        }
        userTasks()
    }, [])

    console.log("User context:", user)

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSave = async () => {
        try {
            const payload = toSnakeCase(formData)
            payload.team = payload.team ? Number(payload.team) : null

            console.log('Payload:', payload)

            const { data } = await updateUserProfile(user.id, payload)
            console.log('Update response:', data)

            const camelCasedData = toCamelCase(data)

            setUser(prevUser => ({
                ...prevUser,
                ...camelCasedData
            }))
            setIsEditing(false)
        } catch (error) {
            console.error("Update failed:", error.response?.data)
            setErrors(error.response?.data || { message: 'Update failed' })
        }
    }


    if (!user) {
        return <div>Please log in to view profile</div>
    }

    return (
        <>
            {isEditing ? (
                <form onSubmit={e => e.preventDefault()}>
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

                    <div className="actions">
                        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        <button type="button" onClick={handleSave}>Save</button>
                    </div>
                </form>

            ) : (
                <>
                    <div className='profile-img-container'>
                        <img
                            src={user.profileImg || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=E09E50&color=ffffff&size=200`}
                            alt="Profile"
                            className="profile-img"
                        />
                    </div>
                    <h3>{user.username}</h3>
                    <h4>{user.jobTitle}</h4>
                    <div className="user-actions">
                        <button onClick={() => setIsEditing(true)} className="page-button">
                            Edit
                        </button>

                    </div>
                    <div className="task-container">
                        <div className="task-list">
                            <h3>Tasks</h3>
                            {tasks.map(task => (
                                <div key={task.id} className="task-card">
                                    <h3>
                                        <Link to={`/projects/${task.parentProject}`}>
                                            {task.title}
                                        </Link>
                                    </h3>
                                    <div className="deadline-tag">{task.deadline}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ProfileDetails