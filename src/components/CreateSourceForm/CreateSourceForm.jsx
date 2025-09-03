import { useState, useContext, useEffect } from 'react'

import { textCreate } from '../../services/projects'
import { toSnakeCase } from '../../utils/cases'
import { UserContext } from '../../contexts/UserContext'

import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

import SlateEditor from '../SlateEditor/SlateEditor'


// file upload??

const CreateSourceText = () => {
    const { user } = useContext(UserContext)
    const [slateValue, setSlateValue] = useState([
        { type: 'paragraph', children: [{ text: '' }] }
    ])
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        sourceLanguage: 'en-GB',
        feedback: [],
    })
    const [errors, setErrors] = useState({})
    const [uploading, setUploading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = toSnakeCase({
            ...formData,
            body: JSON.stringify(slateValue)
        })

        try {
            const { data } = await textCreate(payload)
            console.log('Text creation response:', data)
        } catch (error) {
            setErrors(error.response?.data || { message: 'Unable to create source text' })
        }
    }

    const handleChange = (e) => {
        const newFormData = { ...formData }
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }

    const handleSlateChange = (value) => {
        setSlateValue(value)
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <SlateEditor 
                value={slateValue} 
                onChange={handleSlateChange} 
            />
            <h2>Create a project</h2>
            <div className="form-row">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" placeholder='Your project name' value={formData.name} onChange={handleChange} />
                {errors.name && <p className='error-message'>{errors.name}</p>}
            </div>
            <div className="form-row">
                <label htmlFor="brief">Brief</label>
                <input type="text" name="brief" id="brief" placeholder='Write your brief here' value={formData.brief} onChange={handleChange} />
                {errors.brief && <p className='error-message'>{errors.brief}</p>}
            </div>

            <div className="form-row">
                <label htmlFor="deadline">Due</label>
                <input type="deadline" name='deadline' id='deadline' placeholder='Please enter a date YYYY-MM-DD' value={formData.deadline} onChange={handleChange} />
                {errors.deadline && <p className='error-message'>{errors.deadline}</p>}
            </div>

            <div className="form-row">
                <ImageUpload
                    labelText="Upload images"
                    fieldName="profileImg"
                    setFormData={setFormData}
                    imageURLs={formData.profileImg}
                    setUploading={setUploading}
                    multiple={true}
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

export default CreateSourceText
