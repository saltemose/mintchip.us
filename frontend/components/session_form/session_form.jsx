import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="log-in">
        <div className="left-side-login"></div>
      <div className="login-form-container">

        <form onSubmit={this.handleSubmit} className="login-form-box">
        <div className="login-box-title">Welcome to Mint Chip</div>
          
          {this.renderErrors()}
          <div className="login-form">
            <label><div className="login-box-text">Email or username</div>
         
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="login-input"
              />
              <br/>
            </label>
            <label><div className="login-box-text">Password</div>
        
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
            </label>
            <br/>
            <br/>
            <div className="forgot-link"><Link className="forgot-link" to="/">Forgot your username or password?</Link></div>
            <div className="login-form-spacer"></div>
            <br/>
            <br/>
            <button className="session-submit" type="submit">Sign In</button> &nbsp;
            <button className="session-submit-2" onClick={() => this.setState({username: 'guest', password: 'password'})} type="submit">Demo Login</button>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

export default SessionForm;
