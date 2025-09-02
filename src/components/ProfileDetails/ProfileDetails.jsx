import './ProfileDetails.css'

import { useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'

import FormModal from '../FormModal/FormModal'
import EditProfile from '../EditProfile/EditProfile'


const ProfileDetails = () => {
    const { user, signOut } = useContext(UserContext)
    const [editProfileOpen, setEditProfileOpen] = useState(false);

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
            {/* List of tasks */}
        </div>
    )
}

export default ProfileDetails