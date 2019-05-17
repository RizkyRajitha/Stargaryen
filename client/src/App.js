import React, { Component } from "react";
// import "./App.css";
// const jsonwebtoken = require("jsonwebtoken");
// const request = require("request");

// import 'materialize-css/dist/css/materialize.min.css'

// import M from 'materialize-css/dist/js/materialize.min.js'

import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
import fogotpassword from "./pages/fogotpassword/fogotpassword";
import resetpassword from "./pages/resetpassword/resetpassword";
import emailconfirm from "./pages/emailverify/emailverify";
import Mod from './pages/modal'

import Userprofile from "./pages/userprofile/user";

import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter  >

        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/signup" component={Register} />
        <Route path="/Login" component={Login} />
        <Route path="/fogotpassword" component={fogotpassword} />
        <Route path="/resetpassword/:id" component={resetpassword} />
        <Route path="/confirmemail/:id" component={emailconfirm} />
        <Route path="/confirmemail/:id" component={emailconfirm} />

        <Route path="/mod" component={Mod} />
      </BrowserRouter>
    );
  }
}

export default App;
