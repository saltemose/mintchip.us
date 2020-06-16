import React from "react";
import { Link, Switch } from "react-router-dom";
import GreetingContainer from "./Greeting/greeting_container";
import { Route } from "react-router-dom";
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
import { AuthRoute, RenderIfLoggedIn, RenderIfLoggedOut, ProtectedRoute } from '../util/route_util';
import SearchBar from '../components/dashboard/searchbar';
import NavBar from '../components/dashboard/dashboard';
import Dashboard from "../components/dashboard/dashboard";
import StockCard from '../components/stocks/stock_card_container';
import RHLogo from "./logo";
import searchbar_container from "./dashboard/searchbar_container";
import Portfolio from "./dashboard/portfolio_container";
import WelcomePage from "./welcome/welcome_page";
import cash_container from "./cash_container";

const App = () => (
  <div>
    <GreetingContainer/>
    <Switch>
    <AuthRoute path="/login" component={LoginFormContainer} />
    <AuthRoute path="/signup" component={SignupFormContainer} />
    <ProtectedRoute path="/stocks/:ticker" component={StockCard}/>
    
    <ProtectedRoute exact path="/" component={Portfolio} />
    <ProtectedRoute exact path="/cash" component={cash_container} />
  </Switch>
  </div>
);

export default App;