import './MyProjects.css'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../../contexts/UserContext'
import { getUserTeamProjects } from '../../services/projects.js'

import Sidebar from '../Sidebar/Sidebar'
import ProfileDetails from '../ProfileDetails/ProfileDetails'

const ProfilePage = () => {
    const { user, setUser } = useContext(UserContext)

    const [profileOpen, setProfileOpen] = useState(false);
    const [userTeamProjects, setUserTeamProjects] = useState([]);
    const [projectsLoading, setProjectsLoading] = useState(true);

    useEffect(() => {
        const loadUserTeamProjects = async () => {
            try {
                setProjectsLoading(true)
                const projects = await getUserTeamProjects()
                setUserTeamProjects(projects.data)
            } catch (error) {
                console.error('Error:', error)
                setUserTeamProjects([])
            } finally {
                setProjectsLoading(false)
            }
        };

        loadUserTeamProjects()
    }, [])

    if (!user) {
        return <div>Please log in to view your projects.</div>
    }

    return (
        <div className="page-content">
            <div className="page-title">
                <h1>My projects</h1>
                <button onClick={() => setProfileOpen(true)}>
                    View Profile
                </button>
                <Sidebar
                    isOpen={profileOpen}
                    onClose={() => setProfileOpen(false)}
                    title="User Profile"
                >
                    <ProfileDetails />
                </Sidebar>
            </div>
            <section>
                <h2></h2>
                <div className="projects-grid">
                    {projectsLoading ? (
                        <p>Loading projects...</p>
                    ) : userTeamProjects.length > 0 ? (
                        userTeamProjects.map((project) => {
                            const firstLine = project.brief?.split('.')[0] + '.' || ''
                            return (
                                <div key={project.id} className={`project-card ${project.status}`}>
                                    <div className="project-info">

                                        <h3>{project.name}</h3>

                                        <div className="project-description">
                                            <p>{firstLine}</p>
                                        </div>
                                    </div>
                                    <div className="project-actions">
                                        <Link to={`/projects/${project.id}`} className="project-button">
                                            View
                                        </Link>
                                        <Link to={`/projects/${project.id}`} className="project-button">
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>There are no projects assigned to your team</p>
                    )}
                </div>
            </section>

        </div>
    )
}

export default ProfilePage