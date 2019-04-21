import React, { Component } from "react";
import jsonwebtoken from "jsonwebtoken";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import "./register.css";

import M from "materialize-css";

class Register extends Component {
  state = {
    email: "",
    registered: false,
    password1: "",
    password2: "",
    firstname: "",
    lastname: "",
    errorpassmatch: false,
    duplicateemalifound: false
  };

  changeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value
    });

    console.log(this.state);
  };

  componentDidMount() {
    const jwt = localStorage.getItem("jwt");
    console.log("jwt token -- - -- >>>" + jwt);

    try {
      console.log("in register");
      var pay = jsonwebtoken.verify(jwt, "authdemo");
      console.log("payload - " + pay);
      console.log("************************************");
      this.props.history.push("/dashboard");
    } catch (error) {
      console.log("not logged in redirecting...............");

      //e.preventDefault();
    }
  }

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    const passmatch = this.state.password1 === this.state.password2;

    console.log(passmatch);

    if (passmatch) {
      this.setState({
        errorpassmatch: false
      });
      axios
        .post(
          "/api/signup",
          {
            email: this.state.email,
            password: this.state.password1,
            firstname: this.state.firstname,
            lastname: this.state.lastname
          },
          config
        )
        .then(response => {
          console.log("resonse came - -");
          console.log(response.data);
          this.setState({ registered: true });
          localStorage.setItem("jwt", response.data.jwt);
        })
        .catch(err => {
          console.log(err);
          console.log(err.response.data == 11000);

          if (err.response.data == 11000) {

            //M.toast({ html: "Invalid Credentials" });
            //M.toast({html:"Duplicate account found registerd to this email"})
            this.setState({ duplicateemalifound: true });
          }

        
        });
    } else {
      this.setState({ errorpassmatch: true });
    }
  };

  chngehandlsel = e => {
    this.setState({ usertype: e.target.value });
  };

  render() {
    if (this.state.registered === false) {
      return (
        <div>
          <div className="maindiv">
            <div className="wrapper">
              <div className="form-wrapper">
                <h1>FCiD</h1>

                <div className="informmm">
                  <form onSubmit={this.submitHandler}>
                    {this.state.errorpassmatch && (
                      <div class="alert alert-warning" role="alert">
                        password does not match
                      </div>
                    )}
                    {this.state.duplicateemalifound && (
                      <div class="alert alert-warning" role="alert">
                        Duplicate email Found
                      </div>
                    )}



                  <div className="input-field">
                      <input
                        required
                        type="email"
                        
                        id="email"
                        onChange={this.changeHandler}
                        
                      />
                       <label for="email">Email</label>
                    </div>

                    <div className="input-field">
                      <input
                        required
                        type="text"
                        
                        id="firstname"
                        onChange={this.changeHandler}
                        
                      />  <label for="firstname">Firstname</label>
                    </div>

                    <div className="input-field">
                      <input
                        required
                        type="text"
                       
                        id="lastname"
                        onChange={this.changeHandler}
                        
                      /><label for="lastname">Lastname</label>
                    </div>

                    <div className="input-field">
                      <input
                        required
                        type="password"
                        id="password1"
                        
                        onChange={this.changeHandler}
                      /><label for="password1">Password</label>
                    </div>

                    <div className="input-field">
                      <input
                        required
                        type="password"
                        
                        id="password2"
                        
                        onChange={this.changeHandler}
                      /><label for="password2">Confirm Password</label>
                    </div>

                    <div class="form-group" />

                    <input
                      type="submit"
                      class="btn btn-primary"
                      value="Sign Up"
                      id="submitbtn"
                    />
                  </form>
                  <div className='haveacc'>
                    Have an account?
                    <Link to="/login">
                      <span> </span> <a>login</a>
                    </Link>
                  </div>
                  {/* <div className='bcktologin'>
                    Back to Login
                    <Link to="/login">
                      <span> </span> <a>login</a>
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to={"/dashboard"} />;
    }
  }
}

export default Register;
