import './App.css';

import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import { UserContext } from './Contexts/UserContext'

// Global
import Navbar from './components/Navbar/Navbar'

// Pages
import HomePage from './components/HomePage/HomePage'
import SignUpPage from './components/SignUpPage/SignUpPage'
import SignInPage from './components/SignInPage/SignInPage'

import NotFound from './components/404NotFound/404NotFound'

// Contexts

function App() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <Navbar />
        <div className="page-container">
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </>
  )
}

export default App
