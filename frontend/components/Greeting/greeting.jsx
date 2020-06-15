import React from 'react';
import { Link } from 'react-router-dom';
import WelcomePage from '../welcome/welcome_page';
import Portfolio from '../dashboard/portfolio';



const Greeting = ({ currentUser, logout }) => {
  const welcome = () => (
    <WelcomePage/>
  );
  const dashboard = () => (
    <hgroup className="header-group">
    </hgroup>
  

  );

  return currentUser ? dashboard() : welcome();
};


export default Greeting;