import React, { Component } from "react";
import axios from "axios";
import "./forgotpassword.css";

// import { Alert } from 'reactstrap';

class fogotpassword extends Component {
  state = {
    email: "",
    errnotfound: false,
    succsee: false
  };
  changeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  btn1handler = e => {
    e.preventDefault();
    console.log("inform");

    axios
      .post("/api/fogotpassword", { email: this.state.email })
      .then(res => {
        console.log(res);
        console.log(res.data);
        if (res.data === "no_user_found") {
          console.log("no user found ");
          this.setState({ errnotfound: true });
        } else {
          console.log("email send successfullly");
          this.setState({ succsee: true });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    if (this.state.errnotfound) {
      return (
        <div>
         
          <br />
          <h1> please check your email and try again </h1>
        </div>
      );
    } else if (this.state.succsee) {
      return (
        <h1 color="primary" role="alert">
          
          <br />
          <h1> reset link set to your email </h1>
        </h1>
      );
    } else {
      return (
        <div className="maindiv">
          <div className="wrapper">
            <div className="informforgot">
              <div className="forgotfrm">
                <i id="padlock" class="fas fa-lock fa-5x" />
                <h3>we all forget and that's cool </h3>

                <h5>
                  {" "}
                  Enter your email and we'll send<br />
                  you a link to get back into your account.
                </h5>
                <form onSubmit={this.btn1handler}>

                <br></br>

                <div className="input-field">
                      <input
                        required
                        type="email"
                        name="email"
                        id="email"
                        onChange={this.changeHandler}
                        
                      /><label for="email">email</label>
                    </div>

                 <br></br>
                  <input
                    type="submit"
                    className="btn"
                    value="Send password reset email"
                    id="submitbtnnn"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default fogotpassword;
