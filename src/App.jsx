import './styles/layout.css';
import './styles/index.css';
import './styles/forms.css';

import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import { UserContext } from './contexts/UserContext'

// Global
import NavBar from './components/NavBar/NavBar'
import FooterBar from './components/FooterBar/FooterBar'

// Pages
import HomePage from './components/HomePage/HomePage'
import SignUpPage from './components/SignUpPage/SignUpPage'
import SignInPage from './components/SignInPage/SignInPage'
import MyProjects from './components/MyProjects/MyProjects'
import ProjectPage from './components/ProjectPage/ProjectPage'
import CreateSourcePage from './components/CreateSourcePage/CreateSourcePage'
import CreateTranslationPage from './components/CreateTranslationPage/CreateTranslationPage'
import EditSourcePage from './components/EditSourcePage/EditSourcePage'
import EditTranslationPage from './components/EditTranslationPage/EditTranslationPage'


import NotFound from './components/404NotFound/404NotFound'

// Contexts

function App() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <NavBar />
        <div className='page-container'>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/projects' element={user ? <MyProjects /> : <Navigate to="/sign-in" replace />} />
        <Route path='/projects/:projectId' element={user ? <ProjectPage /> : <Navigate to="/sign-in" replace />} />
        <Route path='/texts/new' element={user ? <CreateSourcePage /> : <Navigate to="/sign-in" replace />} />
        <Route path='/texts/:sourceId/edit' element={user ? <EditSourcePage /> : <Navigate to="/sign-in" replace />} />
        <Route path='/translations/new' element={user ? <CreateTranslationPage /> : <Navigate to="/sign-in" replace />} />
        <Route path='/translations/:translationId/edit' element={user ? <EditTranslationPage /> : <Navigate to="/sign-in" replace />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </div>
      <FooterBar />
    </>
  )
}

export default App
