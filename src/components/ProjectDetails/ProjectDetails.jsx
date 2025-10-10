import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import './ProjectDetails.css'

import FormModal from '../FormModal/FormModal'
import EditProject from '../EditProject/EditProject'
import { getProjectTeamUsers } from '../../services/projects'


const ProjectDetails = ({ project, onClose, onProjectUpdated, onProjectDeleted }) => {
    const { projectId } = useParams()
    const [error, setError] = useState(null)
    const [editProjectOpen, setEditProjectOpen] = useState(false)
    const [teamUsers, setTeamUsers] = useState([])
    const [uploading, setUploading] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const getTeamUsers = async () => {
            try {
                setUploading(true)
                const response = await getProjectTeamUsers(projectId)
                setTeamUsers(response.data)
            } catch (error) {
                setError(prev => ({ ...prev, team: 'Failed to load team members' }))
            } finally {
                setUploading(false)
            }
        }
        getTeamUsers()
    }, [projectId])

    const handleDelete = async () => {
        try {
            if (onProjectDeleted) await onProjectDeleted(projectId)
            if (onClose) onClose()
        } catch (error) {
            setError(error)
        }
    }

    console.log(project)
    console.log(project.images)

    const isLoading = !project && !error

    return (
        <div className="page-content">
            <div className="page-title">
                <h2>Brief</h2>
            </div>
            <div className="project-details-container">
                {isLoading ? (
                    <p>Loading project...</p>
                ) : project ? (
                    <>
                        <div className="brief">
                            {project.brief}
                        </div>
                        <h3>Team</h3>
                        <div className="team-row">
                            {teamUsers.length > 0 ? (
                                teamUsers.map(user => (
                                    <div key={user.id} className="team-member">
                                        <img
                                            src={user.profile_img || '/default-avatar.png'}
                                            alt={user.username}
                                            className="profile-img"
                                        />
                                    </div>
                                ))
                            ) : (
                                <p>Team members not available</p>
                            )}

                        </div>
                        <h3>Images</h3>
                        <div className="project-img-row">
                            {project.images && project.images.length > 0 ? (
                                project.images.map((imageURL, index) => (
                                    <div key={index} className="project-img-container">
                                        <img
                                            src={imageURL}
                                            alt={`Project image ${index + 1}`}
                                            className="project-img"
                                        />
                                    </div>
                                ))
                            ) : (
                                <p>No images available</p>
                            )}

                        </div>

                    </>

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
                        onProjectUpdated={onProjectUpdated} />
                </FormModal>
                <button onClick={handleDelete} className="page-button">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ProjectDetails
