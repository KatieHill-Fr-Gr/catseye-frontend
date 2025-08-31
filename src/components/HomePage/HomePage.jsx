import './HomePage.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const HomePage = () => {
  const navigate = useNavigate()

  return (
    <main>
    <section className="hero">
      <h1>Collaborate, Translate, Manage WorkFlows</h1>
      <p>Keep all your multilingual content in one place.</p>
            <button className="page-button">Create a project</button>
    </section>
    <section className="page-content">
      <div id="categories">
        <h2>Categories</h2>
      <p>Browse the latest items for sale in each category.</p>
      <button className="page-button">Discover all</button>
      <div className="image-row">
      </div>
      </div>
      </section>
    </main>
  )
}

export default HomePage
