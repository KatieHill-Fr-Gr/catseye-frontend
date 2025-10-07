import { Divide, DivideCircleIcon } from 'lucide-react'
import SignUpForm from '../SignUpForm/SignUpForm'
import './SignUpPage.css'

const SignUpPage = () => {
  return (
    <main className="page-content">
      <div className="content-wrapper">
        <div className="text-column">
          <h2>Centralized Workflow</h2>
          <p>Manage all your content and localization needs in one workflow thanks to project boards with draggable tasks.</p>
        </div>
        <div className="form-column">
          <div className='form'>
            <SignUpForm />
          </div>
        </div>
      </div>
    </main>

  )
}

export default SignUpPage