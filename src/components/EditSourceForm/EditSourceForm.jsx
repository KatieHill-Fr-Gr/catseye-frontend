import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { textUpdate, textShow } from '../../services/texts'
import { toSnakeCase } from '../../utils/cases'
import TextEditor from '../TextEditor/TextEditor'


const EditSourceForm = () => {
    const { sourceId } = useParams()
    const [source, setSource] = useState(null)
    const [lexicalValue, setLexicalValue] = useState('')
     const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        body: '',
        sourceLanguage: 'en-GB',
    })
    const [errors, setErrors] = useState({})
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        const getSourceText = async () => {
            try {
                const response = await textShow(sourceId)
                const sourceData = response.data
                setSource(sourceData)

                setFormData({
                    title: sourceData.title || '',
                    body: sourceData.body || '',
                    sourceLanguage: sourceData.sourceLanguage || 'en-GB',
                })
                setLexicalValue(JSON.stringify(sourceData.body || { root: { children: [] } })) 

            } catch (error) {
                setErrors({ message: 'Unable to load source text' })
            }
        }
        if (sourceId) {
            getSourceText()
        }
    }, [sourceId])

    const handleSubmit = async (e) => {
        e.preventDefault()

        let bodyPayload
        try {
            bodyPayload = JSON.parse(lexicalValue)
        } catch (err) {
            setErrors({ message: 'Invalid JSON in editor' })
            return
        }

        const payload = toSnakeCase({
            title: formData.title,
            body: bodyPayload,
            source_language: formData.sourceLanguage,
        })

        try {
            const { data } = await textUpdate(sourceId, payload)
            setShowSuccessMessage('Source text updated successfully!')
        } catch (error) {
            setErrors(error.response?.data || { message: 'Unable to update source text' })
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
            <h2>Edit source text</h2>
            <div className="form-row">
                <label htmlFor="sourceLanguage">Language</label>
                <select
                    id="sourceLanguage"
                    name="sourceLanguage"
                    value={formData.sourceLanguage}
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
                        key={sourceId}
                        value={lexicalValue}
                        onChange={handleLexicalChange}
                        placeholder="Enter your source text here..."
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

export default EditSourceForm
