import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {FaHome, FaShoppingBag} from 'react-icons/fa'
import {BiLogOut} from 'react-icons/bi'
import './index.css'

const Header = props => {
  const {history} = props
  const jwtToken = Cookies.get('jwt_token')

  const onLogout = () => {
    if (jwtToken) {
      Cookies.remove('jwt_token')
      history.replace('/login')
    }
  }

  return (
    <div className="header-container">
      <div className="larger-container">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </div>
        <ul className="nav-link-container">
          <Link to="/" className="nav-link">
            <li className="nav-link">Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li className="nav-link">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
      <div className="for-smaller-device">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </div>
        <div className="icons-container">
          <button type="button" className="button">
            <FaHome aria-label="Home" />
          </button>
          <button type="button" className="button">
            <FaShoppingBag aria-label="Jobs" />
          </button>
          <button type="button" className="button" onClick={onLogout}>
            <BiLogOut aria-label="Logout" />
          </button>
        </div>
      </div>
    </div>
  )
}
export default withRouter(Header)
