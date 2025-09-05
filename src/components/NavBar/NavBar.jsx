import { useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import './NavBar.css'

import { Link } from 'react-router-dom'

import { VscAccount } from "react-icons/vsc"
import eyeIcon from '../../assets/eyeIcon.png'

import Sidebar from '../Sidebar/Sidebar'
import ProfileDetails from '../ProfileDetails/ProfileDetails'

const NavBar = () => {
    const { user, signOut } = useContext(UserContext)
    const [profileOpen, setProfileOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="left-section">
                <div className="logo-image">
                    <img src={eyeIcon} alt="White silhouette of eye" />
                </div>
                <Link to="/" className="home-link">catseye</Link>
            </div>

            <div className="center-section">
                <Link to="/projects" className="profile-button">Projects</Link>
                <Link to="/projects" className="profile-button">Tasks</Link>
            </div>

            <div className="right-section">
                {user ? (
                    <>
                        <button onClick={() => setProfileOpen(true)} className="profile-button">
                            My Profile
                        </button>
                        <Sidebar
                            isOpen={profileOpen}
                            onClose={() => setProfileOpen(false)}
                            title="User Profile"
                        >
                            <ProfileDetails />
                        </Sidebar>
                        <Link to="#" onClick={(e) => { e.preventDefault(); signOut() }} className="nav-button">Sign Out</Link>
                    </>
                ) : (
                    <>
                        <Link to="/sign-in" className="nav-button">Log in</Link>
                        <Link to="/sign-up" className="nav-button">Sign up</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default NavBar