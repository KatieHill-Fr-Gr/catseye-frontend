import './ProfilePage.css'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'

const ProfilePage = () => {
    const { user, setUser } = useContext(UserContext)

    if (!user) {
        return <div>Please log in to view your profile.</div>
    }

    return (
        <div className="page-content">
            <div className="profile-header">
                <div className="profile-img-container">
                    <img
                        src={user.profileImg || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                        alt="Profile"
                        className="profile-pic"
                    />
                </div>
                <div className="profile-details">
                    <h1>{user.username}</h1>
                    <p className="profile-bio">{user.bio || 'No bio yet'}</p>
                    <p className="profile-location">{user.location || 'No location set'}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage