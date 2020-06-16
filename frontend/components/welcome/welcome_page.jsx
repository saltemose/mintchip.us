import React from 'react';
import { Link } from 'react-router-dom';
import WelcomeFull from '../welcome_page_full';


class WelcomePage extends React.Component {

    constructor(props){
        super(props);

        this.state = { active: '1'}
    }

    render1() {
        this.setState({ active: '1'})
    }

    render2() {
        this.setState({ active: '2'})
    }

    render3() {
        this.setState({ active: '3'})
    }

    render() {
    return (
        <div className="complete-entry">
        <div className="welcome-navbar">
            <a className="rb-logo" href="/welcome">Mint Chip<img className="logo-image-main" src={window.RHLogo}></img></a>

        <div className="welcome-btns">
            <Link to="/login" className="welcome-login-btn">Sign In</Link>
            <Link to="/signup" className="welcome-login-btn-2">Sign Up</Link>
        </div>
        </div>
        <div className="welcome-full">
        <WelcomeFull/>
        </div>
        </div>
     

    )}
}

export default WelcomePage;