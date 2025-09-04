import { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { taskCreate } from '../../services/projects'
import { getSourceTexts } from '../../services/texts'
import { getTranslations } from '../../services/translations'
import { toSnakeCase } from '../../utils/cases'
import { UserContext } from '../../contexts/UserContext'

const CreateTask = ({ onClose, onTaskCreated }) => {
    const { user } = useContext(UserContext)
    const { projectId } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: '',
        sourceTextOption: '',
        sourceText: '',
        translationOption: '',
        translation: '',
    })
    const [existingSourceTexts, setExistingSourceTexts] = useState([])
    const [existingTranslations, setExistingTranslations] = useState([])
    const [errors, setErrors] = useState({})
    const [uploading, setUploading] = useState()

    useEffect(() => {
        const loadOptions = async () => {
            try {
                const [sourceTextsResponse, translationsResponse] = await Promise.all([
                    getSourceTexts(),
                    getTranslations()
                ]);

                setExistingSourceTexts(sourceTextsResponse.data)
                setExistingTranslations(translationsResponse.data)

            } catch (error) {
                console.error('Error loading options:', error);
            }
        };

        loadOptions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { sourceTextOption, translationOption, ...filteredData } = formData

        if (sourceTextOption !== 'existing') {
            filteredData.sourceText = null
        }
        if (translationOption !== 'existing') {
            filteredData.translation = null
        }

        const payload = toSnakeCase(filteredData)

        try {
            const { data } = await taskCreate(projectId, payload)
            if (onTaskCreated) await onTaskCreated()
            if (onClose) onClose()
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
            <h2>Add a new task</h2>
            <div className="form-row">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" placeholder='Your task name' value={formData.title} onChange={handleChange} />
                {errors.title && <p className='error-message'>{errors.title}</p>}
            </div>
            <div className="form-row">
                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" placeholder='Describe what needs to be done' value={formData.description} onChange={handleChange} />
                {errors.description && <p className='error-message'>{errors.description}</p>}
            </div>

            <div className="form-row">
                <label htmlFor="deadline">Due</label>
                <input type="date" name='deadline' id='deadline' placeholder='Please enter a date DD-MM-YYYY' value={formData.deadline} onChange={handleChange} />
                {errors.deadline && <p className='error-message'>{errors.deadline}</p>}
            </div>

            <div className="form-row">
                <label htmlFor="sourceText">Source text</label>
                <select
                    name="sourceTextOption"
                    value={formData.sourceTextOption}
                    onChange={handleChange}
                >
                    <option value="">None</option>
                    <option value="existing">Select existing</option>
                    <option value="create_new">Create new</option>
                </select>
                {formData.sourceTextOption === 'existing' && (
                    <select name="sourceText" id="sourceText" value={formData.sourceText || ''} onChange={handleChange}>
                        <option value="">Select source text...</option>
                        {existingSourceTexts && existingSourceTexts.length > 0 && existingSourceTexts.map(source => (
                            <option key={source.id} value={source.id}>
                                {source.title}
                            </option>
                        ))}
                    </select>
                )}
                {uploading && <p>Loading source texts...</p>}
                {errors.sourceText && <p className='error-message'>{errors.sourceText}</p>}
            </div>

            <div className="form-row">
                <label htmlFor="translation">Translation</label>
                <select
                    name="translationOption"
                    value={formData.translationOption}
                    onChange={handleChange}
                >
                    <option value="">None</option>
                    <option value="existing">Select existing</option>
                    <option value="create_new">Create new</option>
                </select>
                {formData.translationOption === 'existing' && (
                    <select name="translation" id="translation" value={formData.translation || ''} onChange={handleChange}>
                        <option value="">Select translation...</option>
                        {existingTranslations && existingTranslations.length > 0 && existingTranslations.map(translation => (
                            <option key={translation.id} value={translation.id}>
                                {translation.title}
                            </option>
                        ))}
                    </select>
                )}
                {uploading && <p>Loading translations...</p>}
                {errors.translation && <p className='error-message'>{errors.translation}</p>}
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

export default CreateTask