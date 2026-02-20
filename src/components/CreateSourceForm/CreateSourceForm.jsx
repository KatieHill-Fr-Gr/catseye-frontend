import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { textCreate } from '../../services/texts'
import { toSnakeCase } from '../../utils/cases'

import TextEditor from '../TextEditor/TextEditor'
import './CreateSourceForm.css'

const CreateSourceForm = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        body: '',
        sourceLanguage: 'en-GB',
    })

    const [errors, setErrors] = useState({})
    const [lexicalValue, setLexicalValue] = useState('')
    const [sourceFile, setSourceFile] = useState(null)
    const [upload, setUpload] = useState('file')
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)



    const handleSubmit = async (e) => {
        e.preventDefault()

        let payload
    
        if (upload === 'file' && sourceFile) {
            const filePayload = {
                title: formData.title,
                sourceLanguage: formData.sourceLanguage,
                sourceFile: sourceFile
            }

            const convertedPayload = toSnakeCase(filePayload)

            payload = new FormData()
            Object.keys(convertedPayload).forEach(key => {
                payload.append(key, convertedPayload[key])
            })
        } else {
            payload = toSnakeCase({
                ...formData,
                body: JSON.parse(lexicalValue)
            })
        }

        try {
            const { data } = await textCreate(payload)
            setErrors({})
            setShowSuccessMessage('Source text created successfully!')
        } catch (error) {
            console.log('Current errors state:', errors)
            console.log('Is errors.message truthy?', !!errors.message)
            if (error.response?.data) {
                setErrors(error.response.data)
            } else {
                setErrors({ message: 'Unable to create source text. Please try again.' })
            }
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

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setSourceFile(file)
    }

    const handleFileUpload = (inputType) => {
        setUpload(inputType)
        if (inputType === 'text') {
            setSourceFile(null)
        } else {
            setFormData(prev => ({
                ...prev,
                body: ''
            }))
            setLexicalValue('')
        }
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <h2>Add a new source text</h2>
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
                    <div>
                        <label htmlFor="sourceFile">Upload File:</label>
                        <input
                            id="sourceFile"
                            type="file"
                            onChange={handleFileChange}
                            accept=".txt"
                        />
                        {sourceFile && (
                            <div style={{ marginTop: '10px', color: 'green' }}>
                                ✓ Selected file: {sourceFile.name} ({(sourceFile.size / 1024).toFixed(1)} KB)
                            </div>
                        )}
                    </div>
                
            </div>

            <div className="form-row">
                <label>Text</label>
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
                <div className="error-message">
                    {errors.message}
                </div>
            )}

            <button type="submit">Submit</button>
        </form>
    )
}

export default CreateSourceForm
