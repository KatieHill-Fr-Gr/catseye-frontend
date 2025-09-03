import './ProfileDetails.css'

import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../../contexts/UserContext'
import { getUserTasks } from '../../services/projects.js'

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
            setTasks(response.data)
        };
        userTasks()
    }, [])


    return (
        <div>
            <div className='profile-img-container'>
                <img src={user.profileImg} alt='Profile' className='profile-img' />
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
                <button className="page-button">
                    Delete
                </button>
            </div>
            <div className="task-container">
                <div className="task-list">
                <h3>Tasks</h3>
                {tasks.map(task => (
                    <div key={task.id} className="task-card">
                        <h3>
                            <Link to={`/projects/${task.parent_project}/tasks/${task.id}`}>
                                {task.title}
                            </Link>
                        </h3>
                        <div className="deadline-tag">{task.deadline}</div>
                        {task.source_text && <p>Source: {task.source_text.title}</p>}
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default ProfileDetails