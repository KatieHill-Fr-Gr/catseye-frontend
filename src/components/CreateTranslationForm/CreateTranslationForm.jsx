import { useState, useContext } from 'react'

import { translationCreate } from '../../services/translations'
import { toSnakeCase } from '../../utils/cases'
import { UserContext } from '../../contexts/UserContext'

import TextEditor from '../TextEditor/TextEditor'
import './CreateTranslationForm.css'

const CreateTranslationForm = ({ taskId, sourceTextId }) => {
    const { user } = useContext(UserContext)
    const [lexicalValue, setLexicalValue] = useState('')
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        body: '',
        targetLanguage: 'en-GB',
        sourceTextOption: '',
        sourceText: '',
        termbaseOption: '',
        temrbase: '',
        feedback: [],
    })
    const [errors, setErrors] = useState({})
    const [uploading, setUploading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            ...toSnakeCase(formData),
            body: lexicalValue,
            task: taskId,
            source_text: sourceTextId,
        }

        setShowSuccessMessage('Translation was added successfully!')

        try {
            const { data } = await translationCreate(payload)
            console.log('Translation response:', data)
        } catch (error) {
            setErrors(error.response?.data || { message: 'Unable to create translation' })
        }
    }

    const handleChange = (e) => {
        const newFormData = { ...formData }
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }

    const handleLexicalChange = (jsonString) => {
        setLexicalValue(jsonString)
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <h2>Add your translation</h2>
            <div className="form-row">
                <label htmlFor="targetLanguage">Language</label>
                <select
                    id="targetLanguage"
                    name="targetLanguage"
                    value={formData.targetLanguage}
                    onChange={handleChange}
                >
                    <option value="en-GB">English (UK)</option>
                    <option value="en-US">English (US)</option>
                    <option value="fr-FR">French</option>
                    <option value="es-ES">Spanish</option>
                    <option value="it-IT">Italian</option>
                    <option value="gr-GR">Greek</option>
                    <option value="de-DE">German</option>
                    <option value="nl-NL">Dutch</option>
                    <option value="pl-PL">Polish</option>
                </select>
            </div>
            <div className="form-row">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" placeholder='Enter your heading here' value={formData.title} onChange={handleChange} />
                {errors.title && <p className='error-message'>{errors.title}</p>}
            </div>

            <div className="form-row">
                <label>Translation</label>
                <TextEditor
                    value={lexicalValue}
                    onChange={handleLexicalChange}
                    placeholder="Enter your source text here..."
                />
            </div>

            {showSuccessMessage && (
                <div className="success-message">
                    {showSuccessMessage}
                </div>
            )}

            {errors.message && (
                <div className="error-message general-error">
                    {errors.message}
                </div>
            )}

            <button
                type="submit"
                disabled={!!showSuccessMessage}
            >
                Submit
            </button>
        </form >
    )
}

export default CreateTranslationForm