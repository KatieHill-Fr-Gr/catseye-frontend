import './ImageUpload.css'
import { uploadImage } from '../../services/cloudinary_imgs.js'
import { useState } from 'react'

const ImageUpload = ({ labelText = 'Upload a photo', fieldName = 'image', setFormData, imageURLs, setUploading, multiple = true }) => {

    const [error, setError] = useState('')

    const handleUpload = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true)
        setError('')

        try {
            const files = Array.from(e.target.files);

            const responses = await Promise.all(files.map(file => cloudinary.uploadImage(file))
            )

            const justURLs = responses.map(response => response.data.secure_url)
            console.log(justURLs)

            setFormData(prev => ({
                ...prev,
                [fieldName]: multiple
                    ? [...(Array.isArray(prev[fieldName]) ? prev[fieldName] : []), ...uploadedURLs]
                    : uploadedURLs[0] || ''
            }));

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
            {multiple ? (
                Array.isArray(imageURLs) && imageURLs.length > 0 && (
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
                )
            ) : (
                imageURLs && (
                    <div className="image-preview-container">
                        <img
                            className="uploaded-image"
                            src={imageURLs}
                            alt="Preview"
                        />
                    </div>
                )
            )}

            {error && <p className='error-message'>{error}</p>}

            <label htmlFor={fieldName}>{labelText}</label>
            <input type="file" name={fieldName} id={fieldName} onChange={handleUpload} multiple={multiple}
                accept="image/*" />

        </>
    )
}

export default ImageUpload