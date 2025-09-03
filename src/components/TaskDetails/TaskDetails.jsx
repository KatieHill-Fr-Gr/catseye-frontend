import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { taskShow, taskDelete } from '../../services/projects.js'
import { UserContext } from '../../contexts/UserContext'

import './TaskDetails.css'

// import FormModal from '../FormModal/FormModal'
// import EditTask from '../EditTask/EditTask'


const TaskDetails = ({ task }) => {
    const [error, setError] = useState(null)
    // const [editTaskOpen, setEditTaskOpen] = useState(false)

    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            await taskDelete(task.id)
            // Close modal on delete?
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    if (!task) {
        return <p>No task data available...</p>
    }

    return (
        <div className="page-content">
            <div className="page-title">
                <h2>{task.title}</h2>
            </div>
            <section>
                <h2></h2>
                <div className="task-details">
                        <div className="task-info">
                            <div className="description">
                                {task.description}
                            </div>
                        </div>
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