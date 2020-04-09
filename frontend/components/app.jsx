import React from "react";
import { Link } from "react-router-dom";
import GreetingContainer from "./Greeting/greeting_container";

const App = () => (
  <div>
     <header>
      <Link to="/" className="header-link">
        <h1>Rails App</h1>
      </Link>
      <GreetingContainer />
    </header>
  </div>
);

export default App;