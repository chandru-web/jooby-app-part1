import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="home-container">
      <Header />
      <div className="home-image-container">
        <div className="text-container col-md-6">
          <h1 className="heading">Find The Job That Fits Your Life</h1>
          <p className="description">
            Millions of people searching for jobs, salary information, company
            reviews. Find the job that fits your abilities and potential.
          </p>
          <button type="button" className="find-job-button">
            Find Jobs
          </button>
        </div>
      </div>
    </div>
  )
}
export default Home
