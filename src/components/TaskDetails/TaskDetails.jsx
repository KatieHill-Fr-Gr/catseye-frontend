import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { taskDelete } from '../../services/projects.js'

import FormModal from '../FormModal/FormModal'
import EditTask from '../EditTask/EditTask'

import './TaskDetails.css'


const TaskDetails = ({ task, projectId, onClose, onTaskUpdated, onTaskDeleted }) => {
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

    console.log("Task object:", task)
    console.log("task.sourceText:", task?.sourceText)
    console.log(task)

    return (
        <div className="page-content">
            <div className="task-title">
                <h2>{task.title}</h2>
            </div>
            <section className="task-container">
                {task.assignedTo ? (
                    <div className="assigned-user">
                        <img
                            src={task.assignedTo.profile_img}
                            alt={task.assignedTo.username}
                            className="assigned-img"
                        />
                        <span className="assigned-username">{task.assignedTo.username}</span>
                    </div>
                ) : (
                    <span></span>
                )}
                <div className="task-details">
                    <div className="description">
                        <b>Description:</b> {task.description}
                    </div>
                    <div className="source-text">
                        <b>Text:</b>{" "}
                        {task.sourceText ? (
                            <Link to={`/texts/${task.sourceText.id}/edit`}>
                                {task.sourceText.title}
                            </Link>
                        ) : (
                            <Link to={`/texts/new?taskId=${task.id}`}>
                                Add source text
                            </Link>
                        )}
                    </div>
                    <div className="translation">
                        <b>Translation:</b>{" "}
                        {task.translation ? (
                            <Link to={`/translations/${task.translation.id}/edit`}>
                                {task.translation.title}
                            </Link>
                        ) : (
                            <Link to={`/translations/new?projectId=${projectId}&taskId=${task.id}`}>
                                Add translation
                            </Link>
                        )}
                    </div>
                    <p className="deadline">Due: {task.deadline}</p>
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