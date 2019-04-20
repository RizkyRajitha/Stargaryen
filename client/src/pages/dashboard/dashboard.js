import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CandidateCard from "../../components/CandidateCard";
import UserCard from "../../components/usercard";
import "./dashboard.css";
import Navbar from "../../components/navbar_metcss";
import axios from "axios";
const jsonwebtoken = require("jsonwebtoken");

//import { CandidateCard } from "./CandidateCard";
// const request = require("request");

class dashboard extends Component {
  state = {
    logedin: true,
    email: "",
    id: "",
    firstName: "",
    lastName: "",
    greet: "",
    usertype: "",
    emailverified: false
  };

  verifyemail = () => {
    //this.props.history.push('/fogotpassword')
    axios
      .post("/usr/sendconfirmemail/" + this.state.id)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  greet = () => {
    var now = new Date();
    var hour = now.getHours();
    console.log(hour);
    if (hour > 18 && hour < 23) {
      this.setState({ greet: "Good night" });
    } else if (hour > 16 && hour < 18) {
      this.setState({ greet: "Good evening" });
    } else if (hour > 12 && hour < 16) {
      this.setState({ greet: "Good afternoon" });
    } else {
      this.setState({ greet: "Good morning" });
    }
  };

  usrprofile = e => {
    e.preventDefault();
    this.props.history.push("/user/" + this.state.id);
  };

  componentDidMount() {
    this.greet();
    console.log("mount");

    var jwt = localStorage.getItem("jwt");
    var now = new Date();
    console.log(now.getHours());

    // try {
    //   var dashboard = jsonwebtoken.verify(jwt)
    //   if(dashboard){
    //     this.setState({logedin:true})
    //   }
    // } catch (error) {
    //   this.setState({logedin:true})
    //   console.log(error)

    // }

    var config = {
      headers: { authorization: jwt }
    };
    axios
      .get("/api/dashboard", config)
      .then(result => {
        console.log("sucsess" + result.data);
        if (result.data) {
          console.log("menna apu data");
          console.log(result.data);

          this.setState({
            email: result.data.email,
            emailverified: result.data.emailverified,
            id: result.data._id,
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            usertype: result.data.usertype
          });

          this.setState({ logedin: true });
          console.log(this.state);

          localStorage.setItem("userId", result.data._id);
        } else {
          this.setState({ logedin: false });
        }
      })
      .catch(err => {
        this.setState({ logedin: false });
        console.log("error" + err);
      });

    setTimeout(() => {
      console.log(this.state);
    }, 1000);
  }

  render() {
    if (this.state.logedin == true) {
      var cndetailes = this.state.candidatedata;
      var usrdetails = this.state.userdata;
      return (
        <div>
          <Navbar />
          <div class="row">
          
            <div className='maindash' />
            <div className='container'>
            <div className='greet'>
            <h1>hello</h1>
            </div>

            <CandidateCard name = 'rajitha'/>
            
            </div>
            
          </div>
        </div>
      );
    } else {
      return <Redirect to={`/login`} />;
    }
  }
}

export default dashboard;
