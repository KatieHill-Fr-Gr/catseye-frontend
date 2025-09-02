import './ProfileDetails.css'

import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'


const ProfileDetails = () => {
    const { user, signOut } = useContext(UserContext)

    if (!user) {
        return <div>Please log in to view profile</div>
    }

    return (
        <div>
            <div className='profile-img-container'>
                <img src={user.profileImg} alt='Profile' className='profile-img' />
            </div>
            <h3>{user.username}</h3>
            <h4>{user.jobTitle}</h4>
            <div className="user-actions">
                <button className="page-button">
                    Edit
                </button>
                <button className="page-button">
                    Delete
                </button>
            </div>
            {/* List of tasks */}
        </div>
    )
}

export default ProfileDetails