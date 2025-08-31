import { uploadImage } from '../../services/Cloudinary'
import { useState } from 'react'

const ImageUpload = ({ labelText = 'Upload a photo', fieldName = 'image', setFormData, imageURLs, setUploading }) => {

    // State

    const [error, setError] = useState('')

    // Functions

    const handleUpload = async (e) => {

        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true)
        setError('')

        try {
            const files = Array.from(e.target.files);

            const responses = await Promise.all(files.map(file => uploadImage(file))
            )

            const justURLs = responses.map(response => response.data.secure_url)
            console.log(justURLs)

            setFormData(formData => {
                return {
                    ...formData,
                    [fieldName]: [...formData.images, ...justURLs]
                }
            })

            e.target.value = ''

        } catch (error) {
            console.log(error)
            setError('Upload failed. Please try again.')
        } finally {
            setUploading(false)
        }
    }

    return (
        <>
        {imageURLs.length > 0 && (
            <div className="image-preview-container">
                {imageURLs.map((url, idx) => (
                    <img 
                        key={idx} 
                        className='uploaded-image' 
                        src={url} 
                        alt={`Preview ${idx + 1}`} 
                    />
                ))}
            </div>
        )}

            {error && <p className='error-message'>{error}</p>}

            <label htmlFor={fieldName}>{labelText}</label>
            <input type="file" name={fieldName} id={fieldName} onChange={handleUpload} multiple />

        </>
    )


}

export default ImageUpload