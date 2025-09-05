import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { projectCreate } from '../../services/projects'
import { toSnakeCase } from '../../utils/cases'
import { UserContext } from '../../contexts/UserContext'

import ImageUpload from '../ImageUpload/ImageUpload'

const CreateProject = ({ onClose, onProjectCreated }) => {
    const { user } = useContext(UserContext)

    const [formData, setFormData] = useState({
        name: '',
        brief: '',
        deadline: '',
        images: [],
    })
    const [errors, setErrors] = useState({})
    const [uploading, setUploading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = toSnakeCase(formData);

        try {
            const { data } = await projectCreate(payload)
            console.log('Project creation response:', data)
            if (onProjectCreated) onProjectCreated()
            if (onClose) onClose()      
        } catch (error) {
            setErrors(error.response?.data || { message: 'Unable to create project' })
        }
    }

    const handleChange = (e) => {
        const newFormData = { ...formData }
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }

    return (
            <form className='form' onSubmit={handleSubmit}>
                 <h2>Create a project</h2>
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
                    <input type="date" name='deadline' id='deadline' placeholder='Please enter a date DD-MM-2025' value={formData.deadline} onChange={handleChange} />
                    {errors.deadline && <p className='error-message'>{errors.deadline}</p>}
                </div>

                <div className="form-row">
                    <ImageUpload
                        labelText="Upload images"
                        fieldName="profileImg"
                        setFormData={setFormData}
                        imageURLs={formData.profileImg}
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

export default CreateProject