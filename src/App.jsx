import './styles/layout.css';
import './styles/index.css';
import './styles/forms.css';

import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import { UserContext } from './Contexts/UserContext'

// Global
import NavBar from './components/NavBar/NavBar'
import FooterBar from './components/FooterBar/FooterBar'

// Pages
import HomePage from './components/HomePage/HomePage'
import SignUpPage from './components/SignUpPage/SignUpPage'
import SignInPage from './components/SignInPage/SignInPage'
import ProfilePage from './components/ProfilePage/ProfilePage'

import NotFound from './components/404NotFound/404NotFound'

// Contexts

function App() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <NavBar />
        <div className="page-container">
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
      <FooterBar />
    </>
  )
}

export default App
