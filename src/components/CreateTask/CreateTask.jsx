import { useState, useContext, useEffect } from 'react'

import { taskCreate } from '../../services/projects'
import { toSnakeCase } from '../../utils/cases'
import { UserContext } from '../../contexts/UserContext'

import ImageUpload from '../ImageUpload/ImageUpload'

const CreateProject = () => {
    const { user } = useContext(UserContext)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: '',
        source_text_option: '', // User will be able to choose between 'Select text' and 'Create new'
        source_text: '', // Dropdown for the existing text
        translation_option, // User will be able to choose between 'Select translation' and 'Create translation'
        translation: '', // Dropdown for the existing translation
    })
    const [existingSourceTexts, setExistingSourceTexts] = useState([])
    const [existingTranslations, setExistingTranslations] = useState([])
    const [errors, setErrors] = useState({})
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        const loadOptions = async () => {
            try {
            } catch (err) {

            }
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = toSnakeCase(formData);

        try {
            const { data } = await projectCreate(payload)
            console.log('Task creation response:', data)
        } catch (error) {
            setErrors(error.response?.data || { message: 'Unable to create task' })
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
                <input type="deadline" name='deadline' id='deadline' placeholder='Please enter a date YYYY-MM-DD' value={formData.deadline} onChange={handleChange} />
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