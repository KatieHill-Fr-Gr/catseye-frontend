import { useNavigate, Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { taskDelete } from '../../services/projects.js'

import FormModal from '../FormModal/FormModal'
import EditTask from '../EditTask/EditTask'

import './TaskDetails.css'


const TaskDetails = ({ task, projectId, onClose, onTaskUpdated, onTaskDeleted }) => {
    const [error, setError] = useState(null)
    const [editTaskOpen, setEditTaskOpen] = useState(false)

    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            await taskDelete(projectId, task.id)
            if (onTaskDeleted) await onTaskDeleted(task.id)
            if (onClose) onClose()
        } catch (error) {
            console.log(error)
        }
    };

    if (!task) {
        return <p>No task data available...</p>
    }

    return (
        <div className="page-content">
            <div className="task-title">
                <h2>{task.title}</h2>
            </div>
            <section className="task-container">
                <div className="task-tags">
                    <div className="status-tag">
                        {task.status}
                    </div>
                    <div className="deadline-tag">
                        {task.deadline}
                    </div>
                </div>
                <div className="task-details">
                    <div className="description">
                        <b>Description:</b> {task.description}
                    </div>
                    <div className="source-text">
                        <b>Source:</b>{" "}
                        {task.sourceText && (
                            <Link to={`/texts/${task.sourceText.id}/edit`}>
                                {task.sourceText.title}
                            </Link>
                        )}
                    </div>
                    <div className="translation">
                        <b>Translation:</b>{" "}
                        <Link to={`/translations/${task.translation.id}/edit`}>
                            {task.translation.title}
                        </Link>
                    </div>
                </div>
            </section>
            <div className="user-actions">
                <button onClick={() => setEditTaskOpen(true)} className="page-button">
                    Edit
                </button>

                <FormModal
                    isOpen={editTaskOpen}
                    onClose={() => setEditTaskOpen(false)}
                    title="Edit task"
                >
                    <EditTask
                        task={task}
                        onClose={() => setEditTaskOpen(false)}
                        onTaskUpdated={onTaskUpdated}
                    />
                </FormModal>

                <button onClick={handleDelete} className="page-button">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default TaskDetails