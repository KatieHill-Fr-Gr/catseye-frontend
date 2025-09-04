import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { textShow, textDelete } from '../../services/texts.js'

import './SourceDetails.css'

const SourceDetails = () => {
    const { sourceId } = useParams()

    const [source, setSource] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await textShow(sourceId)
                setProject(response.data)
            } catch (error) {
                console.error('Error:', error)
                setProject(null)
            } finally {
                setLoading(false)
            }
        }

        if (sourceId) {
            fetchData()
        }
    }, [sourceId])

    const handleDelete = async () => {
        try {
            await textDelete(sourceId)
            navigate('/projects')
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }


    return (
        <div className="page-content">
            <div class="form">
                <h2>{source.title}</h2>
                <div class="form-row">
                    <label>Source language:</label>
                    <div class="value">{source.sourceLanguage}</div>
                </div>
                <div class="form-row">
                    <label>Text:</label>
                    <div class="value multiline">{source.body}.</div>
                </div>
            </div>
            {/* <button onClick={handleDelete} className="page-button">
                Delete
            </button> */}
        </div>
    )
}

export default SourceDetails