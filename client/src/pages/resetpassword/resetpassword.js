import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./restpassword.css";

const jwt = require("jsonwebtoken");
const axios = require("axios");

class resetpassword extends Component {
  state = {
    id: "",
    pass1: "",
    pass2: "",
    passchangeok: false,
    massmissmatch: false,
    exp: false
  };

  componentDidMount() {
    // try {
    //   const iid = jwt.verify(this.props.match.params.id, "authdemo");
    //   console.log(iid.id);
    //   console.log(iid.id);
    //   this.setState({ id: iid.id });
    // } catch (error) {
    //   this.setState({ exp: true });
    //   console.log(error);
    //   setTimeout(() => {
    //     this.props.history.push("/login");
    //   }, 2000);
    // }
  }

  changeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  redirectlogin = () => {
    this.props.history.push("/login");
  };

  submithandler = e => {
    e.preventDefault();

    console.log("passs - " + this.state.pass1 + "idd -- " + this.state.id);

    var match = this.state.pass1 === this.state.pass2;

    if (match) {
      this.setState({ massmissmatch: false });
      axios
        .post(`/api/resetpassword/${this.state.id}`, {
          password: this.state.pass1
        })
        .then(Response => {
          console.log(Response.data);
          if (Response.data === "password changed succesfully") {
            this.setState({ passchangeok: true });
            setTimeout(() => {
              this.redirectlogin();
            }, 5000);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({ massmissmatch: true });
    }
  };

  render() {
    if (!this.state.exp) {
      return (
        <div>
          {this.state.massmissmatch && (
            <div class="passmissmatch">password does not match</div>
          )}

          <div className="container">
            <div className="row">
              
              <div className="respassheader"> reset your password </div>

              <form onSubmit={this.submithandler}>
                <div className="formresetpass">
                  <div className="input-field">
                    <input
                      required
                      type="password"
                      id="pass1"
                      onChange={this.changeHandler}
                    />
                    <label for="pass1">new password</label>
                  </div>
                  <div className="input-field">
                    <input
                      required
                      type="password"
                      id="pass2"
                      onChange={this.changeHandler}
                    />
                    <label for="pass2">re enter new password</label>
                  </div>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary"
                  value="reset password"
                />
              </form>
              {this.state.passchangeok === true && (
                <div>
                  {" "}
                  <h1>password changed succesfully</h1>{" "}
                </div>
              )}
            </div>
          
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1> Link expired </h1>
        </div>
      );
    }
  }
}

export default resetpassword;
