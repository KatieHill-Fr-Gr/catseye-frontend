import { useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { projectShow } from '../../services/projects.js'
import { UserContext } from '../../contexts/UserContext'

import './ProjectDetails.css'


const ProjectDetails = () => {
    const { projectId } = useParams()

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


    return (
        <div className="page-content">
            <div className="page-title">
                <h2>Brief</h2>
            </div>
            <section>
                <h2></h2>
                <div className="project-board">
                    {loading ? (
                        <p>Loading project...</p>
                    ) : project ? (
                        <div className="project-info">
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
                <button className="page-button">
                    Edit
                </button>
                <button className="page-button">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ProjectDetails