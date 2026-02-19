import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import CreateTranslationForm from '../CreateTranslationForm/CreateTranslationForm'
import SourceDetails from '../SourceDetails/SourceDetails'
import { taskShow } from '../../services/projects.js'

const CreateTranslationPage = () => {
  const [searchParams] = useSearchParams()
  const projectId = searchParams.get('projectId')
  const taskId = searchParams.get('taskId')

  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) return
      try {
        const response = await taskShow(projectId, taskId)
        setTask(response.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTask()
  }, [projectId, taskId])

  if (loading) return <p>Loading...</p>

  return (
    <main className="page-content">
      <div className="content-wrapper">
        {task?.source_text && (
          <section className='form'>
            <SourceDetails sourceId={task.source_text.id} />
          </section>
        )}

        <section className='form'>
          <CreateTranslationForm
            taskId={taskId}
            sourceTextId={task?.source_text?.id}
          />
        </section>
      </div>
    </main>
  )
}

export default CreateTranslationPage
