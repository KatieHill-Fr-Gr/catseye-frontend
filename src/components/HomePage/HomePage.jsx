import './HomePage.css'
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import placeholder from '../../assets/placeholder.png'

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
        <div className="feature-row">
          <div className="feature-card">
          <div className="feature-info">
            <h3>Task Management</h3>
            <div className="feature-info description">
              <p>Create projects with drag-and-drop tasks</p>
            </div>
          </div>
          </div>
          <div className="feature-card">
          <div className="feature-info">
            <h3>A Streamlined CAT Tool</h3>
            <div className="feature-info description">
              <p>Translate content & keep style consistent</p>
            </div>
          </div>
          </div>
          <div className="feature-card">
          <div className="feature-info">
            <h3>AI Integration</h3>
            <div className="feature-info description">
              <p>Boost productivity with AI-generated drafts</p>
            </div>
          </div>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="text-column">
            <h2>Project Boards</h2>
            <p>Manage all your content and localization projects in one place with drag-and-drop tasks that make it easy to track progress..</p>
          </div>
          <div className="image-column">
            <img src={placeholder} alt="A yellow and teal gradient background placeholder image" />
          </div>
        </div>
        <div className="content-wrapper">
          <div className="image-column">
            <img src={placeholder} alt="A yellow and teal gradient background placeholder image" />
          </div>
          <div className="text-column">
            <h2>Content Management</h2>
            <p>MEasily create, edit, and review source texts and translations without the hassle thanks to a sleek & minimal interface.</p>
          </div>
        </div>
                <div className="content-wrapper">
          <div className="text-column">
            <h2>Multilingual Resources</h2>
            <p>Load termbases to keep your style consistent and AI-generated content to boost your team’s productivity. </p>
          </div>
          <div className="image-column">
            <img src={placeholder} alt="A yellow and teal gradient background placeholder image" />
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
