import { useState, useContext } from 'react'

import { translationCreate, autoTranslate } from '../../services/translations'
import { toSnakeCase } from '../../utils/cases'
import { UserContext } from '../../contexts/UserContext'

import TextEditor from '../TextEditor/TextEditor'

const CreateTranslationForm = ({ taskId, sourceTextId }) => {
    const { user } = useContext(UserContext)
    const [lexicalValue, setLexicalValue] = useState('')
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [isTranslating, setIsTranslating] = useState(false)
    const [editorKey, setEditorKey] = useState(0)

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
        } catch (error) {
            setErrors(error.response?.data || { message: 'Unable to create translation' })
        }
    }

    const handleChange = (e) => {
        setErrors({})
        setShowSuccessMessage(false)
        const newFormData = { ...formData }
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }

    const handleLexicalChange = (jsonString) => {
        setErrors({})
        setShowSuccessMessage(false)
        setLexicalValue(jsonString)
    }

    const handleAutoTranslate = async () => {
        setIsTranslating(true)
        try {
            const { data } = await autoTranslate(sourceTextId, formData.targetLanguage)
            setLexicalValue(JSON.stringify(data.translated_text))
            setEditorKey(prev => prev + 1)
        } catch (err) {
            setErrors({ message: 'Something went wrong! Please try again' })
        } finally {
            setIsTranslating(false)
        }
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
                    <option value="el-EL">Greek</option>
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
                    key={editorKey}
                    onChange={handleLexicalChange}
                    placeholder="Enter your translation here..."
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

            <button type="button" onClick={handleAutoTranslate} disabled={isTranslating}>
                {isTranslating ? 'Translating...' : 'Auto-translate'}
            </button>

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