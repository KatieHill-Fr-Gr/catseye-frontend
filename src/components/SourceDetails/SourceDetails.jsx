import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { textShow } from '../../services/texts.js'

import './SourceDetails.css'

const SourceDetails = ({ sourceId }) => {

    const [source, setSource] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

      useEffect(() => {
        const getSourceText = async () => {
            try {
                const response = await textShow(sourceId)
                const sourceData = response.data
                setSource(sourceData)

            } catch (error) {
                console.error('Error fetching data:', error)
                setError({ message: 'Unable to load source text' })
            } finally {
                setLoading(false)
            }
        }
        console.log(sourceId)
        if (sourceId) {
            console.log("Getting")
            getSourceText()
        }
    }, [sourceId])

    if (loading) return <div>Loading source text...</div>
    if (error) return <div>Error: {error}</div>
    if (!source) return <div>No source text available</div>

    return (
        <div className="page-content">
            <div className="form">
            <h2>{source.title}</h2>
                <div className="form-row">
                    <label>Source language:</label>
                    <div className="value">{source.source_language}</div>
                </div>
                <div className="form-row">
                    <label>Text:</label>
                    <div className="value multiline">{source.body}.</div>
                </div>
            </div>
        </div>
    )
}

export default SourceDetails