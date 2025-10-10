import './HomePage.css'
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import MyProjects from '../../assets/MyProjects.jpeg'
import TextandTranslationView from '../../assets/TextandTranslationView.png'
import { LayoutList, Languages, BrainCircuit } from "lucide-react"

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
              <LayoutList color="var(--dark-teal)"/>
              <h3>Task Management</h3>
              <p className="feature-info description">
                Create project boards with drag-and-drop tasks
              </p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-info">
              <Languages color="var(--dark-teal)" />
              <h3>A Streamlined CAT Tool</h3>
              <p className="feature-info description">
                Translate content & keep terminology consistent
              </p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-info">
              <BrainCircuit color="var(--dark-teal)" />
              <h3>AI Integration</h3>
              <p className="feature-info description">
                Boost your productivity with AI-generated drafts
              </p>
            </div>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="text-column">
            <h2>Project Boards</h2>
            <p>Manage all your content and localization projects in one place with drag-and-drop tasks that make it easy to track progress.</p>
          </div>
          <div className="image-column">
            <div className="image-container">
              <img src={MyProjects} alt="Projects grid in navy, teal, white and yellow to indicate project statuses" />
            </div>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="image-column">
            <div className="image-container">
              <img src={TextandTranslationView} alt="Source text and editable translation displayed side by side on the page" />
            </div>
          </div>
          <div className="text-column">
            <h2>Content Management</h2>
            <p>Easily create, edit, and review source texts and translations without the hassle thanks to a sleek & minimal interface.</p>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="text-column">
            <h2>Multilingual Resources</h2>
            <p>Use built-in termbases to keep your style and terminology consistent plus AI-generated content to boost your team's productivity. </p>
          </div>
          <div className="image-column">
            <div className="image-container">
              <img src={TextandTranslationView} alt="Automatically generated translation using AI" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
