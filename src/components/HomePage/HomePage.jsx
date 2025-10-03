import './HomePage.css'
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import sidebarHeader from '../../assets/sidebarHeader.jpg'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <main>
      <section className="hero">
        <h1>Collaborate, Translate, Manage WorkFlows</h1>
        <p>Keep all your multilingual content in one place.</p>
        <Link to="/projects" className="page-button">Get started</Link>
      </section>
      <section className="homepage-content">
        <div className="image-row">
          <Link to="/tech">
            <img src={sidebarHeader} alt="A yellow and teal gradient background placeholder image" />
          </Link>
          <Link to="/fashion">
            <img src={sidebarHeader} alt="A yellow and teal gradient background placeholder image" />
          </Link>
          <Link to="/tech">
            <img src={sidebarHeader} alt="A yellow and teal gradient background placeholder image" />
          </Link>
        </div>
        <div className="content-wrapper">
          <div className="text-column">
            <h2>Centralized Workflow</h2>
            <p>Manage all your content and localization needs in one workflow thanks to project boards with draggable tasks.</p>
          </div>
          <div className="image-column">
            <img src={sidebarHeader} alt="A yellow and teal gradient background placeholder image" />
          </div>
        </div>
        <div className="content-wrapper">
          <div className="image-column">
            <img src={sidebarHeader} alt="A yellow and teal gradient background placeholder image" />
          </div>
          <div className="text-column">
            <h2>Centralized Workflow</h2>
            <p>Manage all your content and localization needs in one workflow thanks to project boards with draggable tasks.</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
