import './ProjectPage.css'
import { useState, useEffect, useContext, useRef } from 'react'
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
                console.log('Full project data:', project.data)
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
                <h1>{project.name}</h1>
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
        </div>
    )
}

export default ProjectPage