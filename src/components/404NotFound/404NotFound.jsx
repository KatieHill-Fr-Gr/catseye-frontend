import './404NotFound.css'
import eyeIcon from '../../assets/eyeIcon.png'

import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="page-content">
            <div className="notfound-image">
            <img src={eyeIcon} alt="White silhouette of eye" />
            </div>
            <h1> Oops, page not found</h1>
            <p>We can't find the page you were looking for.</p>
            <Link to="/items" className="page-button">Continue shopping</Link>
        </div>
    )

}


export default NotFound