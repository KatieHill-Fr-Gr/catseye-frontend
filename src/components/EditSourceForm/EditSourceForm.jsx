import { useState, useContext } from 'react'

import { textUpdate } from '../../services/texts'
import { toSnakeCase } from '../../utils/cases'
import { UserContext } from '../../contexts/UserContext'

import TextEditor from '../TextEditor/TextEditor'
import './EditSourceForm.css'

const EditSourceForm = () => {
    const { user } = useContext(UserContext)
    const [lexicalValue, setLexicalValue] = useState('')

    const [formData, setFormData] = useState({
        title: '',
        body: '',
        sourceLanguage: 'en-GB',
        feedback: [],
    })
    const [errors, setErrors] = useState({})
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        const getSource = async () => {
            try {
                const response = await sourceShow(sourceId)
                const sourceData = response.data
                setProject(sourceData)

                setFormData({
                    title: sourceData.title || '',
                    body: sourceData.body || '',
                    sourceLanguage: sourceData.sourceLanguage || '',
                    feedback: sourceData.feedback || [],
                })
            } catch (error) {
                console.error('Error fetching data:', error)
                setErrors({ message: 'Unable to load source text' })
            }
        }
        if (sourceId) {
            getSource()
        }
    }, [sourceId])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = toSnakeCase({
            ...formData,
            body: lexicalValue
        })

        try {
            const { data } = await textUpdate(payload)
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
            <h2>Edit source text</h2>
            <div className="form-row">
                <label htmlFor="sourceLanguage">Language</label>
                <select
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

export default EditSourceForm
