import './ProfileDetails.css'

import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../../contexts/UserContext'
import { getUserTasks } from '../../services/projects.js'
import { toCamelCase } from '../../utils/cases'

import FormModal from '../FormModal/FormModal'
import EditProfile from '../EditProfile/EditProfile'


const ProfileDetails = () => {
    const { user } = useContext(UserContext)
    const [tasks, setTasks] = useState([])
    const [editProfileOpen, setEditProfileOpen] = useState(false);

    if (!user) {
        return <div>Please log in to view profile</div>
    }

    useEffect(() => {
        const userTasks = async () => {
            const response = await getUserTasks()
            setTasks(response.data.map(task => toCamelCase(task)))
        };
        userTasks()
    }, [])

    console.log("User context:", user)


    return (
        <div>
            <div className='profile-img-container'>
                <img
                    src={user.profileImg || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=E09E50&color=ffffff&size=200`}
                    alt="Profile"
                    className="profile-img"
                />
            </div>
            <h3>{user.username}</h3>
            <h4>{user.jobTitle}</h4>
            <div className="user-actions">
                <button onClick={() => setEditProfileOpen(true)} className="page-button">
                    Edit
                </button>
                <FormModal
                    isOpen={editProfileOpen}
                    onClose={() => setEditProfileOpen(false)}
                    title="Edit profile"
                >
                    <EditProfile />
                </FormModal>
            </div>
            <div className="task-container">
                <div className="task-list">
                    <h3>Tasks</h3>
                    {tasks.map(task => (
                        <div key={task.id} className="task-card">
                            <h3>
                                <Link to={`/projects/${task.parentProject}`}>
                                    {task.title}
                                </Link>
                            </h3>
                            <div className="deadline-tag">{task.deadline}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProfileDetails