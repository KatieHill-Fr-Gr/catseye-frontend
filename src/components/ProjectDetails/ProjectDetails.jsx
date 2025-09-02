import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { projectShow, projectDelete } from '../../services/projects.js'
import { UserContext } from '../../contexts/UserContext'

import './ProjectDetails.css'

import FormModal from '../FormModal/FormModal'
import EditProject from '../EditProject/EditProject'


const ProjectDetails = () => {
    const { projectId } = useParams()

    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [editProjectOpen, setEditProjectOpen] = useState(false)

    const navigate = useNavigate()

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

    const handleDelete = async () => {
        try {
            await projectDelete(projectId)
            navigate('/projects')
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }


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
                <button onClick={() => setEditProjectOpen(true)} className="page-button">
                    Edit
                </button>
                <FormModal
                    isOpen={editProjectOpen}
                    onClose={() => setEditProjectOpen(false)}
                    title="Edit project"
                >
                    <EditProject />
                </FormModal>
                <button onClick={handleDelete} className="page-button">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ProjectDetails