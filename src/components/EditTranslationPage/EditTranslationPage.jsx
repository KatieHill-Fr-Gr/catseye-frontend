import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { translationShow } from '../../services/translations'
import { toCamelCase } from '../../utils/cases'
import SourceDetails from '../SourceDetails/SourceDetails'
import EditTranslationForm from '../EditTranslationForm/EditTranslationForm'

const EditTranslationPage = () => {
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

     useEffect(() => {
         const getTranslation = async () => {
             try {
                 const response = await translationShow(translationId)
                 const translationData = response.data
                 setTranslation(toCamelCase(translationData))
                 console.log('Translation loaded:', translationData) // Add this
                 console.log('Source text ID:', translationData.source_text)
 
                 setFormData({
                     title: translationData.title || '',
                     body: translationData.body || '',
                     targetLanguage: translationData.targetLanguage || '',
                     sourceTextOption: translationData.sourceTextOption || '',
                     sourceText: translationData.sourceText || '',
                     termbaseOption: translationData.termbaseOption || '',
                     termbase: translationData.termbase || '',
                     feedback: translationData.feedback || [],
                 })
 
                 setLexicalValue(translationData.body || '')
 
             } catch (error) {
                 console.error('Error fetching data:', error)
                 setErrors({ message: 'Unable to load source text' })
             }
         }
         if (translationId) {
             getTranslation()
         }
     }, [translationId])

    console.log(translation) 

    return (
        <div>
            {translation && translation.sourceText && 
            <section className='form'>
                <SourceDetails sourceId={translation.sourceText} />
            </section>
            }
            <section className='form'>
                <EditTranslationForm translationId={translationId} formData={formData} setFormData={setFormData} lexicalValue={lexicalValue} setLexicalValue={setLexicalValue}/>
            </section>
        </div>
    )
}

export default EditTranslationPage