import { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { taskCreate, getProjectTeamUsers } from '../../services/projects'
import { getSourceTexts } from '../../services/texts'
import { toSnakeCase } from '../../utils/cases'
import { UserContext } from '../../contexts/UserContext'

const CreateTask = ({ onClose, onTaskCreated }) => {
    const { user } = useContext(UserContext)
    const { projectId } = useParams()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: '',
        sourceTextOption: '',
        sourceText: ''
    })
    const [existingSourceTexts, setExistingSourceTexts] = useState([])
    const [errors, setErrors] = useState({})
    const [uploading, setUploading] = useState()
    const [teamUsers, setTeamUsers] = useState([])

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

    console.log(`Team users: ${teamUsers} `)

    useEffect(() => {
        const loadOptions = async () => {
            try {
                const sourceTextsResponse = await getSourceTexts()
                setExistingSourceTexts(sourceTextsResponse.data)
            } catch (error) {
                console.error('Error loading options:', error)
            }
        }
        loadOptions()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { sourceTextOption, sourceText, ...filteredData } = formData

        const payload = toSnakeCase({
            ...filteredData,
            sourceText: sourceTextOption === 'existing' ? sourceText : null,
        })

        try {
            await taskCreate(projectId, payload)
            if (onTaskCreated) await onTaskCreated()
            if (onClose) onClose()
        } catch (error) {
            setErrors(error.response?.data || { message: 'Unable to create task' })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
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