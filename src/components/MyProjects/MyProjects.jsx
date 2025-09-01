import './MyProjects.css'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { getUserTeamProjects } from '../../services/projects.js'

const ProfilePage = () => {
    const { user, setUser } = useContext(UserContext)

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
                <h1>{user.username}'s workspace</h1>
            </div>
            <section>
                <h2>My Projects ({userTeamProjects.length})</h2>
                <div className="projects-grid">
                    {projectsLoading ? (
                        <p>Loading projects...</p>
                    ) : userTeamProjects.length > 0 ? (
                        userTeamProjects.map((project) => {
                            const firstLine = project.brief
                                ? project.brief.split(/\r?\n/)[0]
                                : '';
                            return (
                                <div key={project.id} className="project-card">
                                    <div className="project-info">
                                        <div className="project-title">
                                            <h3>{project.name}</h3>
                                        </div>
                                        <div className="project-description">
                                            <p>{firstLine}</p>
                                        </div>
                                    </div>
                                    <div className="project-actions">
                                        <Link to={`/projects/${project.id}`}>
                                            View Project
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