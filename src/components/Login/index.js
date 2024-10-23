import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value, showError: false})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value, showError: false})
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <div className="username-container">
        <label className="username" htmlFor="username">
          USERNAME
        </label>
        <br />
        <input
          type="text"
          id="username"
          className="username-input"
          value={username}
          placeholder="Username"
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="password-container">
        <label className="password" htmlFor="password">
          PASSWORD
        </label>
        <br />
        <input
          type="password"
          id="password"
          className="password-input"
          value={password}
          placeholder="Password"
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitUserDetails = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const loginUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }

    const response = await fetch(loginUrl, options)

    if (response.ok) {
      const data = await response.json()
      this.onSubmitSuccess(data.jwt_token)
    } else {
      const data = await response.json()
      this.onSubmitFailure(data.error_msg || 'Login failed')
    }
  }

  render() {
    const {showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <form className="form-container" onSubmit={this.onSubmitUserDetails}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="websites-logo"
        />
        <div className="input-field-container">
          {this.renderUsername()}
          {this.renderPassword()}
          <button type="submit" className="login-button">
            Login
          </button>
          {showError && <p className="error-msg">{errorMsg}</p>}
        </div>
      </form>
    )
  }
}

export default LoginForm
