import './ProjectPage.css'
import { useState, useEffect, useContext, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LuCirclePlus } from "react-icons/lu";


import { UserContext } from '../../contexts/UserContext'
import { projectShow, getProjectTasks } from '../../services/projects.js'
import DraggableTask from '../ProjectTasks/ProjectTasks'
import DropZone from '../ProjectTaskDropZone/ProjectTaskDropZone'

import Sidebar from '../Sidebar/Sidebar'
import ProjectDetails from '../ProjectDetails/ProjectDetails'

import FormModal from '../FormModal/FormModal'
import CreateTask from '../CreateTask/CreateTask'

const ProjectPage = () => {
    const { user } = useContext(UserContext)
    const [project, setProject] = useState(null)
    const [tasks, setTasks] = useState([])
    const [taskColumns, setTaskColumns] = useState({})
    const [loading, setLoading] = useState(true)
    const [projectDetailsOpen, setProjectDetailsOpen] = useState(false)
    const [newTaskOpen, setNewTaskOpen] = useState(false)

    const { projectId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [projectResponse, tasksResponse] = await Promise.all([
                    projectShow(projectId),
                    getProjectTasks(projectId)
                ])

                setProject(projectResponse.data)
                setTasks(tasksResponse.data)
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

    const handleTaskDrop = (droppedTask, taskColumn) => {
        console.log('Task dropped:', droppedTask);
        setTaskColumns(prev => ({
            ...prev,
            [droppedTask.taskId]: taskColumn
        }))
    }
    const getTasksForColumn = (column) => {
        return tasks.filter(task =>
            (taskColumns[task.id] || 'todo') === column
        )
    }

    if (!user) {
        return <div>Please log in to view this project.</div>
    }

    return (
        <div className="page-content">
            <div className="page-title">
                <h1>{project?.name}</h1>
            </div>
            <section>
                <div className="project-board">
                    {loading ? (
                        <p>Loading project...</p>
                    ) : project ? (
                        <div>
                            <button onClick={() => setProjectDetailsOpen(true)} className="profile-button">
                                View project brief
                            </button>
                            <Sidebar
                                isOpen={projectDetailsOpen}
                                onClose={() => setProjectDetailsOpen(false)}
                                title="Project details"
                            >
                                <ProjectDetails />
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
                        <DropZone status="todo" onDrop={(task) => handleTaskDrop(task, 'todo')}>
                            <h3>To Do</h3>
                            <div className="tasks-column">
                                {getTasksForColumn('todo').map(task => (
                                    <DraggableTask key={task.id} task={task} />
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
                    <CreateTask />
                </FormModal>
            </div>
                    </div>
                    <div className="drop-zone">
                        <DropZone status="in-progress" onDrop={(task) => handleTaskDrop(task, 'in-progress')}>
                            <h3>In Progress</h3>
                            <div className="tasks-column">
                                {getTasksForColumn('in-progress').map(task => (
                                    <DraggableTask key={task.id} task={task} />
                                ))}
                            </div>
                        </DropZone>
                    </div>
                    <div className="drop-zone">
                        <DropZone status="done" onDrop={(task) => handleTaskDrop(task, 'done')}>
                            <h3>Done</h3>
                            <div className="tasks-column">
                                {getTasksForColumn('done').map(task => (
                                    <DraggableTask key={task.id} task={task} />
                                ))}
                            </div>
                        </DropZone>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProjectPage