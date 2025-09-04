import { useEffect, useState } from 'react'
import { textShow } from '../../services/texts.js'
import { toCamelCase } from '../../utils/cases'
import TextEditor from '../TextEditor/TextEditor'


import './SourceDetails.css'

const SourceDetails = ({ sourceId }) => {

    const [source, setSource] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [lexicalValue, setLexicalValue] = useState('')

      useEffect(() => {
        const getSourceText = async () => {
            try {
                const response = await textShow(sourceId)
                const sourceData = response.data
                setSource(toCamelCase(sourceData))
                setLexicalValue(JSON.stringify(sourceData.body || { root: { children: [] } }))

            } catch (error) {
                console.error('Error fetching data:', error)
                setError({ message: 'Unable to load source text' })
            } finally {
                setLoading(false)
            }
        }
        if (sourceId) {
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
                    <label>Language:</label>
                    <div className="value">{source.sourceLanguage}</div>
                </div>
            <div className="form-row">
                <label>Text</label>
                    <TextEditor
                        editable={false}
                        key={sourceId}
                        value={lexicalValue}
                    />
            </div>
                </div>
            </div>
    )
}

export default SourceDetails