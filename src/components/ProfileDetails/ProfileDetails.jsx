import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'


const ProfileDetails = () => {
    const { user, signOut } = useContext(UserContext)

    if (!user) {
    return <div>Please log in to view profile</div>
    }   

    return (
        <div>
            <img src={user.profileImg} alt='Profile' className='profile-img' />
            <h3>{user.name}</h3>
            {/* Job title */}
            {/* Team */}
            {/* List of tasks */}
        </div>
    )
}

export default ProfileDetails