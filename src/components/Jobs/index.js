import Cookies from 'js-cookie'
import {MdSearch} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'ISLOADING',
}

class Jobs extends Component {
  state = {
    profileData: {},
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')

    if (!jwtToken) {
      console.error('JWT token not found')
      this.setState({apiStatus: apiConstants.failure})
      return
    }

    this.setState({apiStatus: apiConstants.isLoading})
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(profileUrl, options)
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        this.setState({
          apiStatus: apiConstants.success,
          profileData: data.profile_details,
        })
      } else {
        console.error('Failed to fetch profile data:', response.status)
        this.setState({apiStatus: apiConstants.failure})
      }
    } catch (error) {
      console.error('Error fetching profile data:', error)
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#fff" height="50" width="50" />
    </div>
  )

  renderProfileDetails = () => {
    const {profileData} = this.state

    if (
      !profileData.name ||
      !profileData.profile_image_url ||
      !profileData.short_bio
    ) {
      return null
    }

    const {
      name,
      profile_image_url: profileImageUrl,
      short_bio: shortBio,
    } = profileData

    return (
      <div className="profile-details">
        <img src={profileImageUrl} alt={name} className="profile-logo" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-description">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="failure-container">
      <button
        className="retry-button"
        type="button"
        onClick={this.getProfileData}
      >
        Retry
      </button>
    </div>
  )

  renderProfileDetailsBasedOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderProfileDetails()
      case apiConstants.failure:
        return this.renderProfileFailureView()
      case apiConstants.isLoading:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobs-container">
        <Header />
        <div className="bottom-container">
          <div className="profile-salary-employment-container col-12 col-md-4">
            {this.renderProfileDetailsBasedOnApiStatus()}
            <hr className="hr" />
          </div>
          {/* Add additional content for search and job listings here */}
          <div className="search-and-jobs-list-container col-12 col-md-8">
            {/* Search and job listings can go here */}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
