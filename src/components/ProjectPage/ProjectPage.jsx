import './ProjectPage.css'
import { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LuCirclePlus } from "react-icons/lu";

import { UserContext } from '../../contexts/UserContext'
import { projectShow, getProjectTasks, taskShow, taskUpdate, taskUpdateStatus } from '../../services/projects.js'
import { toCamelCase } from '../../utils/cases'
import DraggableTask from '../ProjectTasks/ProjectTasks'
import DropZone from '../ProjectTaskDropZone/ProjectTaskDropZone'

import Sidebar from '../Sidebar/Sidebar'
import ProjectDetails from '../ProjectDetails/ProjectDetails'

import FormModal from '../FormModal/FormModal'
import CreateTask from '../CreateTask/CreateTask'
import TaskDetails from '../TaskDetails/TaskDetails'

const ProjectPage = () => {
    const { user } = useContext(UserContext)
    const [selectedTask, setSelectedTask] = useState(null)
    const [project, setProject] = useState(null)
    const [tasks, setTasks] = useState([])
    const [droppedStatus, setDroppedStatus] = useState({})
    const [loading, setLoading] = useState(true)
    const [projectDetailsOpen, setProjectDetailsOpen] = useState(false)
    const [newTaskOpen, setNewTaskOpen] = useState(false)
    const [taskDetailsOpen, setTaskDetailsOpen] = useState(false)

    const { projectId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [projectResponse] = await Promise.all([
                    projectShow(projectId),
                ])
                setProject(projectResponse.data)
                await refreshTasks()
            } catch (error) {
                console.error('Error:', error)
                setProject(null)
                setTasks([])
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [projectId])

    const handleTaskDrop = async (droppedTask, droppedStatus) => {
        console.log(`Task ${droppedTask} moved to ${droppedStatus}`)

        try {
            await taskUpdateStatus(projectId, droppedTask.taskId, droppedStatus)

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === droppedTask.taskId ? { ...task, status: droppedStatus } : task
                )
            )

            setDroppedStatus(prev => ({
                ...prev,
                [droppedTask.id]: droppedStatus
            }))

        } catch (error) {
            console.error("Error updating task status:", error)
        }
    }

    const getTasksForColumn = (column) => {
        return tasks.filter(task => (droppedStatus[task.id] || task.status || 'in_progress') === column)
    }

    const handleTaskClick = async (taskId) => {
        try {
            setLoading(true)
            const response = await taskShow(projectId, taskId)
            const camelTask = toCamelCase(response.data)
            setSelectedTask(camelTask)
            setTaskDetailsOpen(true)
        } catch (error) {
            console.error("Error loading task:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleCloseTaskDetails = () => {
        setTaskDetailsOpen(false)
        setSelectedTask(null)
    }

    const refreshTasks = async () => {
        try {
            const tasksResponse = await getProjectTasks(projectId)
            setTasks(tasksResponse.data)
        } catch (error) {
            console.error('Error refreshing tasks:', error)
            setTasks([])
        }
    }

    const handleTaskUpdated = async () => {
        await refreshTasks()
    }

    if (!user) {
        return <div>Please log in to view this project.</div>
    }

    return (
        <div className="page-content">
            <div className="page-title">
                <h1>{project?.name}</h1>
            </div>
            {console.log('Tasks in In Progress:', getTasksForColumn('inProgress'))}
            {console.log('Tasks in Review:', getTasksForColumn('review'))}
            {console.log('Tasks in Completed:', getTasksForColumn('completed'))}
            <section>
                <div className="project-board">
                    {loading ? (
                        <p>Loading project...</p>
                    ) : project ? (
                        <div>
                            <button onClick={() => setProjectDetailsOpen(true)} className="page-button">
                                View project details
                            </button>
                            <Sidebar
                                project={project}
                                isOpen={projectDetailsOpen}
                                onClose={() => setProjectDetailsOpen(false)}
                                title="Project details"
                            >
                                <ProjectDetails
                                    project={project} onClose={() => setProjectDetailsOpen(false)} />
                            </Sidebar>

                            <div className="tag-container">
                                <span className="team-tag">
                                    {project.team.name}
                                </span>
                                <span className="status-tag">
                                    {project.status}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <p>There was a problem loading this project...</p>
                    )}
                </div>
            </section>
            <section>
                <h2>Tasks</h2>
                <div className="project-board">
                    <div className="drop-zone">
                        <DropZone status="in_progress" onDrop={(task) => handleTaskDrop(task, 'in_progress')}>
                            <h3>In Progress</h3>
                            <div className="tasks-column">
                                {getTasksForColumn('in_progress').map(task => (
                                    <DraggableTask key={task.id} task={task} onClick={() => handleTaskClick(task.id)} />
                                ))}
                            </div>
                        </DropZone>
                        <div>
                            <button onClick={() => setNewTaskOpen(true)} className="new-task">
                                <LuCirclePlus /> Add new task
                            </button>
                            <FormModal
                                isOpen={newTaskOpen}
                                onClose={() => setNewTaskOpen(false)}
                                title="Create new task"
                            >
                                <CreateTask
                                    onClose={() => setNewTaskOpen(false)}
                                    onTaskCreated={refreshTasks}
                                />
                            </FormModal>
                        </div>
                    </div>
                    <div className="drop-zone">
                        <DropZone status="review" onDrop={(task) => handleTaskDrop(task, 'review')}>
                            <h3>Review</h3>
                            <div className="tasks-column">
                                {getTasksForColumn('review').map(task => (
                                    <DraggableTask key={task.id} task={task} onClick={() => handleTaskClick(task.id)} />
                                ))}
                            </div>
                        </DropZone>
                    </div>
                    <div className="drop-zone">
                        <DropZone status="completed" onDrop={(task) => handleTaskDrop(task, 'completed')}>
                            <h3>Done</h3>
                            <div className="tasks-column">
                                {getTasksForColumn('completed').map(task => (
                                    <DraggableTask key={task.id} task={task} onClick={() => handleTaskClick(task.id)} />
                                ))}
                            </div>
                        </DropZone>
                    </div>
                </div>
                {taskDetailsOpen && (
                    <FormModal
                        isOpen={taskDetailsOpen}
                        onClose={handleCloseTaskDetails}
                        title=""
                    >
                        {loading ? (
                            <div>Loading task details...</div>
                        ) : selectedTask ? (
                            <TaskDetails
                                task={selectedTask}
                                projectId={project.id}
                                onClose={handleCloseTaskDetails}
                                onTaskUpdated={refreshTasks}
                                onTaskDeleted={refreshTasks}
                            />
                        ) : null}
                    </FormModal>
                )}
            </section>
        </div>
    )
}

export default ProjectPage