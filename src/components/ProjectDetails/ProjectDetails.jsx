import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { projectShow, projectUpdate, projectDelete, getProjectTeamUsers } from '../../services/projects'
import { toSnakeCase, toCamelCase } from '../../utils/cases'

import './ProjectDetails.css'
import ImageUpload from '../ImageUpload/ImageUpload'


const ProjectDetails = ({ onClose, onProjectDeleted }) => {
    const { projectId } = useParams()
    const [project, setProject] = useState(null)
    const [error, setError] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [teamUsers, setTeamUsers] = useState([])
    const [uploading, setUploading] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        brief: '',
        deadline: '',
        status: '',
        images: []
    })

    const STATUS_CHOICES = [
        { value: 'in_progress', label: 'In Progress' },
        { value: 'review', label: 'Under Review' },
        { value: 'completed', label: 'Completed' },
        { value: 'on_hold', label: 'On Hold' },
        { value: 'cancelled', label: 'Cancelled' },
    ]

    useEffect(() => {
        const getProject = async () => {
            try {
                const response = await projectShow(projectId)
                const projectData = response.data
                setProject(projectData)

                setFormData({
                    name: projectData.name || '',
                    brief: projectData.brief || '',
                    deadline: projectData.deadline || '',
                    status: projectData.status || '',
                    images: projectData.images || []
                })
            } catch (error) {
                console.error('Error fetching data:', error)
                setError({ message: 'Unable to load project data' })
            }
        }

        if (projectId) {
            getProject()
        }
    }, [projectId])

    useEffect(() => {
        const getTeamUsers = async () => {
            try {
                setUploading(true)
                const response = await getProjectTeamUsers(projectId)
                setTeamUsers(response.data)
            } catch (error) {
                setError(prev => ({ ...prev, team: 'Failed to load team members' }))
                console.log(error)
            } finally {
                setUploading(false)
            }
        }
        getTeamUsers()
    }, [projectId])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
        try {
            const payload = toSnakeCase(formData)
            const { data } = await projectUpdate(projectId, payload)
            console.log('Edited project:', data)

            const camelCasedData = toCamelCase(data)

            setProject(prevProj => ({
                ...prevProj,
                ...camelCasedData
            }))
            setIsEditing(false)
        } catch (error) {
            setError(error.response?.data || { message: 'Unable to edit project' })
        }
    }

    const handleDelete = async () => {
        try {
            await projectDelete(projectId)
            if (onClose) onClose()
        } catch (error) {
            setError({ message: 'Failed to delete project' })
        }
    }

    const isLoading = !project && !error

    return (
        isEditing ? (
            <form className='form' onSubmit={handleSave} >
                <h2>Edit project</h2>
                <div className="form-row">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" placeholder='Your project name' value={formData.name} onChange={handleChange} />
                    {error.name && <p className='error-message'>{error.name}</p>}
                </div>
                <div className="form-row">
                    <label htmlFor="brief">Brief</label>
                    <input type="text" name="brief" id="brief" placeholder='Write your brief here' value={formData.brief} onChange={handleChange} />
                    {error.brief && <p className='error-message'>{error.brief}</p>}
                </div>

                <div className="form-row">
                    <label htmlFor="deadline">Due</label>
                    <input type="date" name='deadline' id='deadline' placeholder='Please enter a date YYYY-MM-DD' value={formData.deadline} onChange={handleChange} />
                    {error.deadline && <p className='error-message'>{error.deadline}</p>}
                </div>

                <div className="form-row">
                    <label htmlFor="status">Status</label>
                    <select name="status" id="status" value={formData.status} onChange={handleChange}>
                        <option value="">Select status</option>
                        {STATUS_CHOICES.map((choice) => (
                            <option key={choice.value} value={choice.value}>
                                {choice.label}
                            </option>
                        ))}
                    </select>
                    {error.status && <p className='error-message'>{error.status}</p>}
                </div>

                <div className="form-row">
                    <ImageUpload
                        labelText="Upload images"
                        fieldName="images"
                        setFormData={setFormData}
                        imageURLs={formData.images}
                        setImageUploading={setImageUploading}
                        multiple={true}
                    />
                </div>

                {error.message && (
                    <div className="error-message general-error">
                        {error.message}
                    </div>
                )
                }
                <div className="form-actions">
                    <button type="button" onClick={() => setIsEditing(false)} className="page-button">Cancel</button>
                    <button type="button" onClick={handleSave} className="page-button">Save</button>
                </div>
            </form >

        ) : (
            <>
                <div className="page-content">
                    <div className="page-title">
                        <h2>Brief</h2>
                    </div>
                    <div className="project-details-container">
                        {isLoading ? (
                            <p>Loading project...</p>
                        ) : project ? (
                            <>
                                <div className="brief">
                                    {project.brief}
                                </div>
                                <h3>Team</h3>
                                <div className="team-row">
                                    {teamUsers.length > 0 ? (
                                        teamUsers.map(user => (
                                            <div key={user.id} className="team-member">
                                                <img
                                                    src={user.profile_img || '/default-avatar.png'}
                                                    alt={user.username}
                                                    className="profile-img"
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <p>Team members not available</p>
                                    )}

                                </div>
                                <h3>Images</h3>
                                <div className="project-img-row">
                                    {project.images && project.images.length > 0 ? (
                                        project.images.map((imageURL, index) => (
                                            <div key={index} className="project-img-container">
                                                <img
                                                    src={imageURL}
                                                    alt={`Project image ${index + 1}`}
                                                    className="project-img"
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <p>No images available</p>
                                    )}
                                </div>
                            </>
                        ) : (
                            <p>There was a problem loading this project...</p>
                        )}
                    </div>
                    <div className="project-actions">
                        <button onClick={() => setIsEditing(true)} className="page-button">
                            Edit
                        </button>
                        <button onClick={handleDelete} className="page-button">
                            Delete
                        </button>
                    </div>
                </div>
            </>
        )
    )
}
export default ProjectDetails
