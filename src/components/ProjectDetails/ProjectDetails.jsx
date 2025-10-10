import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { projectShow, projectDelete } from '../../services/projects.js'
import { UserContext } from '../../contexts/UserContext'

import './ProjectDetails.css'

import FormModal from '../FormModal/FormModal'
import EditProject from '../EditProject/EditProject'


const ProjectDetails = ({ project, onClose, onProjectUpdated, onProjectDeleted }) => {
    const { projectId } = useParams()
    const [error, setError] = useState(null)
    const [editProjectOpen, setEditProjectOpen] = useState(false)

    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            if (onProjectDeleted) await onProjectDeleted(projectId)
            if (onClose) onClose()
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    console.log(project)
    const isLoading = !project && !error

    return (
        <div className="page-content">
            <div className="page-title">
                <h2>Brief</h2>
            </div>
                <div className="project-container">
                    {isLoading ? (
                        <p>Loading project...</p>
                    ) : project ? (
                            <div className="brief">
                                {project.brief}
                            </div>

                    ) : (
                        <p>There was a problem loading this project...</p>
                    )}
                </div>
            <div className="project-actions">
                <button onClick={() => setEditProjectOpen(true)} className="page-button">
                    Edit
                </button>
                <FormModal
                    isOpen={editProjectOpen}
                    onClose={() => setEditProjectOpen(false)}
                    title="Edit project"
                >
                    <EditProject 
                        project={project}
                        onClose={() => setEditProjectOpen(false)}
                        onProjectUpdated={onProjectUpdated}/>
                </FormModal>
                <button onClick={handleDelete} className="page-button">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ProjectDetails
