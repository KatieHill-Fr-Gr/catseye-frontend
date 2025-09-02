import { useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { projectShow } from '../../services/projects.js'
import { UserContext } from '../../contexts/UserContext'


const ProjectDetails = () => {
    const { projectId } = useParams()
    const { user } = useContext(UserContext)

    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await projectShow(projectId)
                setProject(response.data)
            } catch (error) {
                console.error('Error:', error)
                setProject(null)
            } finally {
                setLoading(false)
            }
        }

        if (projectId) {
            fetchData()
        }
    }, [projectId])

    if (!user) {
        return <div>Please log in to view your projects.</div>
    }


    return (
        <div className="page-content">
            <div className="page-title">
                <h2>{project?.name}</h2>
            </div>
            <section>
                <h2></h2>
                <div className="project-board">
                    {loading ? (
                        <p>Loading project...</p>
                    ) : project ? (
                        <div className="project-info">
                            <div className="team">
                                {project?.team.name}
                                </div>
                                <div className="owner">
                                    {project.owner}
                                </div>
                                <div className="brief">
                                    {project.brief}
                                </div>
                            </div>
                    ) : (
                        <p>There was a problem loading this project...</p>
                    )}
                </div>
            </section>
            <div className="project-actions">
                <button className="project-button">
                    Edit
                </button>
                <button className="project-button">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ProjectDetails