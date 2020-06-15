import React from 'react';
import { Link } from 'react-router-dom'

const RHLogo = () => {
    
            return (
            <div className="logo">
                <Link to="/">
                <img className="logo-image" src={window.RHLogo} alt=""/>
                </Link>
            </div>
        )
        
}

export default RHLogo;