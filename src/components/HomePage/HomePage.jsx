import './HomePage.css'
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'


const HomePage = () => {
    const navigate = useNavigate()

    return (
        <main>
            <section className="hero">
                <h1>Collaborate, Translate, Manage WorkFlows</h1>
                <p>Keep all your multilingual content in one place.</p>
                <Link to="/projects" className="page-button">Get started</Link>
            </section>
            <section className="page-content">
                <div className="content-wrapper">
                    <div className="text-column">
                        <h2>Streamlined project management</h2>
                        <div></div>
                    </div>
                </div>
                <div className="image-column">
                </div>
            </section>
        </main>
    )
}

export default HomePage
