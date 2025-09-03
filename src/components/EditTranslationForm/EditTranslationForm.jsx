import { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { translationUpdate } from '../../services/translations'
import { toSnakeCase } from '../../utils/cases'
import { UserContext } from '../../contexts/UserContext'

import TextEditor from '../TextEditor/TextEditor'
// import './EditTranslationForm.css'

const EditTranslationForm = () => {
    const { user } = useContext(UserContext)
    const { translationId } = useParams()
    const [translation, setTranslation] = useState(null)
    const [lexicalValue, setLexicalValue] = useState('')

    const [formData, setFormData] = useState({
        title: '',
        body: '',
        targetLanguage: 'en-GB',
        sourceTextOption: '',
        sourceText: '',
        termbaseOption: '', // Option to select a termbase or leave blank (or possibly create new)
        termbase: '',
        feedback: [],
    })
    const [errors, setErrors] = useState({})
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        const getTranslation = async () => {
            try {
                const response = await translationShow(translationId)
                const translationData = response.data
                setTranslation(translationData)

                setFormData({
                    title: sourceData.title || '',
                    body: sourceData.body || '',
                    targetLanguage: sourceData.targetLanguage || '',
                    sourceTextOption: sourceData.sourceTextOption || '',
                    sourceText: sourceData.sourceText || '',
                    termbaseOption: sourceData.termbaseOption || '',
                    termbase: sourceData.termbase|| '',
                    feedback: sourceData.feedback || [],
                })
            } catch (error) {
                console.error('Error fetching data:', error)
                setErrors({ message: 'Unable to load source text' })
            }
        }
        if (translationId) {
            getTranslation()
        }
    }, [translationId])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = toSnakeCase({
            ...formData,
            body: lexicalValue
        })

        try {
            const { data } = await translationUpdate(payload)
            console.log('Text update response:', data)
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
            <h2>Edit translation</h2>
            <div className="form-row">
                <label htmlFor="targetLanguage">Language</label>
                <select
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