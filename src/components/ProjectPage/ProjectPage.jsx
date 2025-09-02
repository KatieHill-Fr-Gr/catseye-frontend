import './ProjectPage.css'
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { UserContext } from '../../contexts/UserContext'
import { projectShow } from '../../services/projects.js'

const ProjectPage = () => {
    const { user, setUser } = useContext(UserContext)

    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)

    const { projectId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getProject = async () => {
            try {
                setLoading(true)
                const project = await projectShow(projectId)
                console.log(project.data)
                setProject(project.data)
            } catch (error) {
                console.error('Error:', error)
                setProject(null)
            } finally {
                setLoading(false)
            }
        };

        getProject()
    }, [projectId])

    if (!user) {
        return <div>Please log in to view this project.</div>
    }

return (
    <div className="page-content">
        <div className="page-title">
            <h1>Project</h1>
        </div>
        <section>
            <h2></h2>
            <div className="project-board">
                {loading ? (
                    <p>Loading project...</p>
                ) : project ? (
                        <div className="project-team">
                            <h3>{project.team}</h3>
                            <div className="project-status">
                                <p>{project.status}</p>
                            </div>
        
                        <div className="project-actions">
                            <button className="project-button">
                                Edit
                            </button>
                            <button className="project-button">
                                Delete
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>There was a problem loading this project...</p>
                )}
            </div>
        </section>
    </div>
)
}

export default ProjectPage