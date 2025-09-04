import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getSourceTexts } from '../../services/texts'
import { getTranslations } from '../../services/translations'
import { taskUpdate, taskShow } from '../../services/projects'
import { toSnakeCase, toCamelCase } from '../../utils/cases'

const EditTask = () => {
    const { taskId } = useParams()
    const { projectId } = useParams()
    const [task, setTask] = useState(null)
    const [statusChoices, setStatusChoices] = useState([])
    const [existingSourceTexts, setExistingSourceTexts] = useState([])
    const [existingTranslations, setExistingTranslations] = useState([])
    const [errors, setErrors] = useState({})
    const [uploading, setUploading] = useState(false)
    
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
        const getTask = async () => {
            try {
                const response = await taskShow(taskId)
                const taskData = response.data
                setTask(toCamelCase(taskData))

                console.log(taskId)

                setFormData({
                    title: taskData.name || '',
                    description: taskData.brief || '',
                    deadline: taskData.deadline || '',
                    sourceTextOption: '', 
                    sourceText: taskData.sourceText || '',
                    translationOption: '',
                    translation: taskData.translation || '',
                    status: taskData.status || '',
                    assignedTo: taskData.assignedTo || '',
                })
            } catch (error) {
                console.error('Error fetching data:', error)
                setErrors({ message: 'Unable to load project data' })
            }
        }

        if (taskId) {
            getTask()
        }
    }, [taskId])


        useEffect(() => {
            const loadOptions = async () => {
                try {
                    const [sourceTextsResponse, translationsResponse] = await Promise.all([
                        getSourceTexts(),
                        getTranslations()
                    ]);
    
                    setExistingSourceTexts(sourceTextsResponse.data);
                    setExistingTranslations(translationsResponse.data);
                } catch (error) {
                    console.error('Error loading options:', error);
                }
            };
    
            loadOptions();
        }, []);
    
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
                const { data } = await taskUpdate(projectId, payload)
                console.log('Task creation response:', data)
                navigate(`/projects/${projectId}`)
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

    export default EditTask