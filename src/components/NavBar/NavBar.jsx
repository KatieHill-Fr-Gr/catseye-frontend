import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'
import './NavBar.css'

import { Link } from 'react-router-dom'

import { VscAccount } from "react-icons/vsc"
import { Menu, X } from "lucide-react"
import eyeIcon from '../../assets/eyeIcon.png'

import Sidebar from '../Sidebar/Sidebar'
import ProfileDetails from '../ProfileDetails/ProfileDetails'

const NavBar = () => {
    const { user, signOut } = useContext(UserContext)
    const [profileOpen, setProfileOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMenuOpen(false)
            }
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <>
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
                                <VscAccount />
                            </button>
                            <Link to="#" onClick={(e) => { e.preventDefault(); signOut() }} className="nav-button">Sign Out</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/sign-in" className="nav-button">Log in</Link>
                            <Link to="/sign-up" className="nav-button">Sign up</Link>
                        </>
                    )}
                </div>
                <div className="mobile-user-controls">
                    {user && (
                        <button onClick={() => setProfileOpen(true)} className="profile-button">
                            <VscAccount />
                        </button>
                    )}
                    <button
                        className="hamburger"
                        onClick={() => setMenuOpen(prev => !prev)}
                    >
                        {menuOpen ? <X size={24} color="var(--dark-fonts)" /> : <Menu size={24} color="var(--dark-fonts)" />}
                    </button>
                </div>
                {menuOpen && (
                    <div className="mobile-menu">
                        <div className="mobile-links">
                            <Link to="/projects" className="mobile-link" onClick={() => setMenuOpen(false)}>Projects</Link>
                            <Link to="/projects" className="mobile-link" onClick={() => setMenuOpen(false)}>Tasks</Link>
                        </div>
                        <div className="mobile-links">
                            {user ? (
                                <>
                                    <Link to="#" onClick={(e) => {
                                        e.preventDefault()
                                        signOut()
                                        setMenuOpen(false)
                                    }}
                                        className="mobile-link">
                                        Sign Out
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/sign-in" className="mobile-link" onClick={() => setMenuOpen(false)}>Log in</Link>
                                    <Link to="/sign-up" className="mobile-link" onClick={() => setMenuOpen(false)}>Sign up</Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
            <Sidebar
                isOpen={profileOpen}
                onClose={() => setProfileOpen(false)}
                title="User Profile"
            >
                <ProfileDetails />
            </Sidebar>
        </>
    )
}

export default NavBar