import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { projectUpdate, projectShow } from '../../services/projects'
import { toSnakeCase } from '../../utils/cases'
import { UserContext } from '../../contexts/UserContext'

import ImageUpload from '../ImageUpload/ImageUpload'

const EditProject = ({ project, onClose, onProjectUpdated }) => {
    const { projectId } = useParams()
    // const [project, setProject] = useState(null)
    const [statusChoices, setStatusChoices] = useState([])

    const [formData, setFormData] = useState({
        name: '',
        brief: '',
        deadline: '',
        status: '',
        images: []
    })
    const [errors, setErrors] = useState({})
    const [uploading, setUploading] = useState(false)

    const STATUS_CHOICES = [
        { value: 'in_progress', label: 'In Progress' },
        { value: 'review', label: 'Under Review' },
        { value: 'completed', label: 'Completed' },
        { value: 'on_hold', label: 'On Hold' },
        { value: 'cancelled', label: 'Cancelled' },
    ]

    // useEffect(() => {
    //     const getProject = async () => {
    //         try {
    //             const response = await projectShow(projectId)
    //             const projectData = response.data
    //             setProject(projectData)

    //             setFormData({
    //                 name: projectData.name || '',
    //                 brief: projectData.brief || '',
    //                 deadline: projectData.deadline || '',
    //                 status: projectData.status || '',
    //                 images: projectData.images || []
    //             })
    //         } catch (error) {
    //             console.error('Error fetching data:', error)
    //             setErrors({ message: 'Unable to load project data' })
    //         }
    //     }

    //     if (projectId) {
    //         getProject()
    //     }
    // }, [projectId])

    useEffect(() => {
        if (project) {
            setFormData({
                name: project.name || '',
                brief: project.brief || '',
                deadline: project.deadline || '',
                status: project.status || '',
                images: project.images || []
            })
        }
    }, [project])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = toSnakeCase(formData)

        try {
            const { data } = await projectUpdate(projectId, payload)
            console.log('Edited project:', data)
            if (onProjectUpdated) onProjectUpdated(data)
            if (onClose) onClose()
        } catch (error) {
            setErrors(error.response?.data || { message: 'Unable to edit project' })
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <h2>Edit project</h2>
            <div className="form-row">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" placeholder='Your project name' value={formData.name} onChange={handleChange} />
                {errors.name && <p className='error-message'>{errors.name}</p>}
            </div>
            <div className="form-row">
                <label htmlFor="brief">Brief</label>
                <input type="text" name="brief" id="brief" placeholder='Write your brief here' value={formData.brief} onChange={handleChange} />
                {errors.brief && <p className='error-message'>{errors.brief}</p>}
            </div>

            <div className="form-row">
                <label htmlFor="deadline">Due</label>
                <input type="deadline" name='deadline' id='deadline' placeholder='Please enter a date YYYY-MM-DD' value={formData.deadline} onChange={handleChange} />
                {errors.deadline && <p className='error-message'>{errors.deadline}</p>}
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
                {errors.status && <p className='error-message'>{errors.status}</p>}
            </div>

            <div className="form-row">
                <ImageUpload
                    labelText="Upload images"
                    fieldName="images"
                    setFormData={setFormData}
                    imageURLs={formData.images}
                    setUploading={setUploading}
                    multiple={true}
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

export default EditProject