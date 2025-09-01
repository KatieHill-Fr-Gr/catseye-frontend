import './MyProjects.css'
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
            <div className="page-title">
                    <h1>Your projects</h1>
                    <p>Here's what your currently working on</p>
            </div>
            <div className="project-grid">

            </div>
        </div>
    )
}

export default ProfilePage