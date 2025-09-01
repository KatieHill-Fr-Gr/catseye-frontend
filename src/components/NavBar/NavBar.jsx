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
        <nav>
            <nav id="main-pages">
                <div className="logo-image">
                    <img src={eyeIcon} alt="White silhouette of eye" />
                </div>
                <Link to="/" className="home-link">catseye</Link>
                <Link to="/projects" className="page-link">Projects</Link>
                <Link to="/" className="page-link">Tasks</Link>
            </nav>
            <nav id="user-access">
                {user
                    ? (
                        <>
                            {/* <Link to="/profile" className="page-link"><VscAccount />My profile</Link> */}
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
                            <Link to="#" onClick={(e) => { e.preventDefault(); signOut() }} className="nav-button">Sign Out</Link>
                        </>
                    )
                    : (
                        <>
                            <Link to="/sign-in" className="nav-button">Log in</Link>
                            <Link to="/sign-up" className="nav-button">Sign up</Link>
                        </>
                    )}
            </nav>
        </nav>
    )
}

export default NavBar