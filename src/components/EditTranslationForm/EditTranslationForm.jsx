import { useState } from 'react'
import { translationUpdate, autoTranslate } from '../../services/translations'
import { toSnakeCase } from '../../utils/cases'
import { useNavigate } from 'react-router-dom'

import TextEditor from '../TextEditor/TextEditor'

const EditTranslationForm = ({ formData, setFormData, translationId, lexicalValue, setLexicalValue }) => {
    const [errors, setErrors] = useState({})
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = toSnakeCase({
            ...formData,
            body: lexicalValue
        })

        console.log(payload)

        try {
            const { data } = await translationUpdate(translationId, payload)
            console.log('Translation update response:', data)
            setShowSuccessMessage('Translation was updated successfully!')

        } catch (error) {
            console.error('Full error object:', error)
            console.error('Error response:', error.response)
            console.error('Error response data:', error.response?.data)
            setErrors(error.response?.data || { message: 'Unable to update translation' })
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
            <h2>Edit translation</h2>
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
                <label>Text</label>
                {lexicalValue !== '' ? (
                    <TextEditor
                        editable={true}
                        key={translationId}
                        value={lexicalValue}
                        onChange={handleLexicalChange}
                        placeholder="Enter your translation here..."
                    />
                ) : (
                    <div>Loading...</div>
                )}
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

            <button type="submit">Submit</button>
        </form>

    )
}

export default EditTranslationForm