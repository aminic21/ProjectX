import React from "react";
import {BrowserRouter, Switch, Route, NavLink}from "react-router-dom";
import PrivateRoute from "./Utilis/PrivateRoute";
import PublicRoute  from "./Utilis/PublicRoute";

import Dashboard from "./Dashboard";
import Home from "./Home";
import Login from "./Login";


function App() {

  

  return (
    <div className="App">
     <BrowserRouter>
    <div className="header">
     <NavLink exact activeClassName="active" to="/">Home</NavLink>
     <NavLink activeClassName="active" to="/login">Login </NavLink>
     <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
      </div>
      <div className="content">
      <Switch>
        <Route exact path="/" component={Home} />
        <PublicRoute path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>

    </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
