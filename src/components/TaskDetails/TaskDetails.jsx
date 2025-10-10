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
                    {task.translation ? (
                        <div className="translation">
                            <b>Translation:</b>{" "}
                            <Link to={`/translations/${task.translation.id}/edit`}>
                                {task.translation.title}
                            </Link>
                        </div>
                    ) : task.sourceText ? (
                        <div className="source-text">
                            <b>Source Text:</b>{" "}
                            <Link to={`/texts/${task.sourceText.id}/edit`}>
                                {task.sourceText.title}
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="source-text">
                                <b>Source text:</b>{" "}
                                <Link to={`/texts/new?projectId=${projectId}&taskId=${task.id}`}>
                                    Add text
                                </Link>
                            </div>
                            <div className="translation">
                                <b>Translation:</b>{" "}
                                <Link to={`/translations/new?projectId=${projectId}&taskId=${task.id}`}>
                                    Add translation
                                </Link>
                            </div>
                        </>
                    )}
                </div>
                <p className="deadline">Due: {task.deadline}</p>
            </section >
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
        </div >
    )
}

export default TaskDetails