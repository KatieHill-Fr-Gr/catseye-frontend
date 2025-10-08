import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getSourceTexts } from '../../services/texts'
import { getTranslations } from '../../services/translations'
import { taskUpdate, getProjectTeamUsers } from '../../services/projects'
import { toSnakeCase, toCamelCase } from '../../utils/cases'

const EditTask = ({ task, onClose, onTaskUpdated }) => {

    const { projectId } = useParams()
    const [existingSourceTexts, setExistingSourceTexts] = useState([])
    const [existingTranslations, setExistingTranslations] = useState([])
    const [errors, setErrors] = useState({})
    const [uploading, setUploading] = useState(false)
    const [teamUsers, setTeamUsers] = useState([])

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: '',
        status: '',
        sourceTextOption: '',
        sourceText: '',
        translationOption: '',
        translation: '',
        assignedTo: '',
    })

    const STATUS_CHOICES = [
        { value: 'in_progress', label: 'In Progress' },
        { value: 'review', label: 'Under Review' },
        { value: 'completed', label: 'Completed' },
        { value: 'on_hold', label: 'On Hold' },
        { value: 'cancelled', label: 'Cancelled' },
    ]

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || task.name || '',
                description: task.description || task.brief || '',
                deadline: task.deadline || '',
                status: task.status || '',
                sourceTextOption: task.sourceText?.id ? 'existing' : '',
                sourceText: task.sourceText?.id ? String(task.sourceText.id) : '',
                translationOption: task.translation?.id ? 'existing' : '',
                translation: task.translation?.id ? String(task.translation.id) : '',
                assignedTo: task.assignedTo?.id ? String(task.assignedTo.id) : '',
            })
        }
    }, [task])

    console.log(formData)


    useEffect(() => {
        const getTeamUsers = async () => {
            try {
                setUploading(true)
                const response = await getProjectTeamUsers(projectId)
                setTeamUsers(response.data)
            } catch (error) {
                setErrors(prev => ({ ...prev, team: 'Failed to load team members' }))
            } finally {
                setUploading(false)
            }
        }
        getTeamUsers()
    }, [projectId])


    useEffect(() => {
        const loadOptions = async () => {
            try {
                const [sourceTextsResponse, translationsResponse] = await Promise.all([
                    getSourceTexts(),
                    getTranslations()
                ])
                setExistingSourceTexts(sourceTextsResponse.data)
                setExistingTranslations(translationsResponse.data)
            } catch (error) {
                console.error('Error loading options:', error)
            }
        }

        loadOptions()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const { sourceTextOption, translationOption, ...filteredData } = formData

        if (sourceTextOption !== 'Use existing') {
            filteredData.sourceText = null
        }
        if (translationOption !== 'Use existing') {
            filteredData.translation = null
        }

        const payload = toSnakeCase(formData)

        try {
            const { data } = await taskUpdate(projectId, task.id, payload)
            if (onTaskUpdated) await onTaskUpdated()
            if (onClose) onClose()

        } catch (error) {
            setErrors(error.response?.data || { message: 'Unable to update task' })
        }
    }

    const handleChange = (e) => {
        const newFormData = { ...formData }
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <h2>Edit task</h2>
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
                <label htmlFor="assignedTo">Assigned</label>
                <select
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    disabled={uploading}
                >
                    <option value="">None</option>
                    {teamUsers.map(user => (
                        <option key={user.id} value={String(user.id)}>
                            {user.username}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-row">
                <label htmlFor="deadline">Due</label>
                <input type="date" name='deadline' id='deadline' placeholder='Please enter a date YYYY-MM-DD' value={formData.deadline} onChange={handleChange} />
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
                <label htmlFor="sourceText">Source text</label>
                <select
                    name="sourceText"
                    id="sourceText"
                    value={formData.sourceText || ''}
                    onChange={handleChange}
                >
                    <option value="">Select source text...</option>
                    {existingSourceTexts.map(source => (
                        <option key={source.id} value={String(source.id)}>
                            {source.title}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-row">
                <label htmlFor="translation">Translation</label>
                <select
                    name="translation"
                    id="translation"
                    value={formData.translation || ''}
                    onChange={handleChange}
                >
                    <option value="">Select translation...</option>
                    {existingTranslations.map(translation => (
                        <option key={translation.id} value={String(translation.id)}>
                            {translation.title}
                        </option>
                    ))}
                </select>
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

export default EditTask