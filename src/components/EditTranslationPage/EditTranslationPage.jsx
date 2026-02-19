import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { translationShow } from '../../services/translations'
import { toCamelCase } from '../../utils/cases'
import SourceDetails from '../SourceDetails/SourceDetails'
import EditTranslationForm from '../EditTranslationForm/EditTranslationForm'

import './EditTranslationPage.css'

const EditTranslationPage = () => {
    const { translationId } = useParams()
    const [translation, setTranslation] = useState(null)
    const [lexicalValue, setLexicalValue] = useState('')

    const [formData, setFormData] = useState({
        title: '',
        body: '',
        targetLanguage: ''
    })

    useEffect(() => {
        const getTranslation = async () => {
            try {
                const response = await translationShow(translationId)
                const translationData = response.data
                setTranslation(toCamelCase(translationData))

                setFormData({
                    title: translationData.title || '',
                    body: translationData.body || '',
                    targetLanguage: translationData.target_language || 'fr-FR'
                })

                setLexicalValue(translationData.body || '')

            } catch (error) {
                setErrors({ message: 'Unable to load source text' })
            }
        }
        if (translationId) {
            getTranslation()
        }
    }, [translationId])

    return (
        <main className="page-content">
            <div className="content-wrapper">
                {translation && translation.sourceText &&
                    <section className='form'>
                        <SourceDetails sourceId={translation.sourceText} />
                    </section>
                }
                {translation && 
                <section className='form'>
                    <EditTranslationForm
                    translationId={translationId} 
                    formData={formData} 
                    setFormData={setFormData} 
                    lexicalValue={lexicalValue} 
                    setLexicalValue={setLexicalValue}
                    sourceId={translation.sourceText} />
                </section>
                }
            </div>
        </main>
    )
}

export default EditTranslationPage