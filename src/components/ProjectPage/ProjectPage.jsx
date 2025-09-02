import './ProjectPage.css'
import { useState, useEffect, useContext, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { UserContext } from '../../contexts/UserContext'
import { projectShow, getProjectTasks } from '../../services/projects.js'
import DraggableTask from '../ProjectTasks/ProjectTasks'

const ProjectPage = () => {
    const { user, setUser } = useContext(UserContext)
    const [project, setProject] = useState(null)
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
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

    if (!user) {
        return <div>Please log in to view this project.</div>
    }

    return (
        <div className="page-content">
            <div className="page-title">
                <h1>{project?.name}</h1>
            </div>
            <section>
                <h2></h2>
                <div className="project-board">
                    {loading ? (
                        <p>Loading project...</p>
                    ) : project ? (
                        <div className="project-info">
                            <div className="project-team-tag">
                                <h3>{project.team.name}</h3>
                                <div className="project-status-tag">
                                    <p>{project.status}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>There was a problem loading this project...</p>
                    )}
                </div>
            </section>
                    <section>
            <h2>Tasks</h2>
            <div className="tasks-container">
                {loading ? (
                    <p>Loading tasks...</p>
                ) : (
                    tasks.map(task => (
                        <DraggableTask key={task.id} task={task} />
                    ))
                )}
            </div>
        </section>
        </div>
    )
}

export default ProjectPage