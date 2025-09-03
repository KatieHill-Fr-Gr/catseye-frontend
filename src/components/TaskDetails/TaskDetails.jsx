import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { taskShow, taskDelete } from '../../services/projects.js'
import { UserContext } from '../../contexts/UserContext'

import './TaskDetails.css'

// import FormModal from '../FormModal/FormModal'
// import EditTask from '../EditTask/EditTask'


const TaskDetails = () => {
    const { taskId } = useParams()

    const [loading, setLoading] = useState(true)
    const [task, setTask] = useState(null)
    const [error, setError] = useState(null)
    // const [editTaskOpen, setEditTaskOpen] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await taskShow(taskId)
                setTask(response.data)
            } catch (error) {
                console.error('Error:', error)
                setTask(null)
            } finally {
                setLoading(false)
            }
        }

        if (taskId) {
            fetchData()
        }
    }, [taskId])

    const handleDelete = async () => {
        try {
            await taskDelete(taskId)
            // Close modal on delete?
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    return (
        <div className="page-content">
            <div className="page-title">
                <h2>{task.title}</h2>
            </div>
            <section>
                <h2></h2>
                <div className="task-details">
                    {loading ? (
                        <p>Loading task...</p>
                    ) : task ? (
                        <div className="task-info">
                            <div className="description">
                                {task.description}
                            </div>
                        </div>

                    ) : (
                        <p>There was a problem loading this task...</p>
                    )}
                </div>
            </section>
            <div className="task-actions">
                {/* <button onClick={() => setEditProjectOpen(true)} className="page-button">
                    Edit
                </button>
                <FormModal
                    isOpen={editProjectOpen}
                    onClose={() => setEditProjectOpen(false)}
                    title="Edit project"
                >
                    <EditProject />
                </FormModal> */}
                <button onClick={handleDelete} className="page-button">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default TaskDetails