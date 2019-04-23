import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CandidateCard from "../../components/CandidateCard";
import UserCard from "../../components/usercard";
import "./dashboard.css";
import Navbar from "../../components/navbar_metcss";
import axios from "axios";
import Modal from "react-modal";
import M from "materialize-css";
const jsonwebtoken = require("jsonwebtoken");

const customStyles = {
  content: {
    width: "50%",
    height: "50%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    
  }
};

//import { CandidateCard } from "./CandidateCard";
// const request = require("request");

Modal.setAppElement("#root");

class dashboard extends Component {
  state = {
    logedin: true,
    email: "",
    id: "",
    firstName: "",
    lastName: "",
    content: "",
    usertype: "",
    emailverified: false,
    modalIsOpen: false,
    posts: null,    upvoted: [],
    downvoted: []
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  changeHandlercontent = e => {
    this.setState({ content: e.target.value });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
    this.subtitle.style.textAlign = "center";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
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

  addpost = e => {
    e.preventDefault();
    console.log(this.state);

    var jwt = localStorage.getItem("jwt");
    console.log(jwt);

    var config = {
      headers: { authorization: jwt }
    };

    var senddata = {
      firstName: this.state.firstName,
      content: this.state.content
    };

    axios
      .post("/api/addpost", senddata, config)
      .then(res => {
        console.log(res);
        M.toast({ html: "Posted.." });
        window.location.reload();
        
      })
      .catch(err => {
        console.log(err);
        M.toast({ html: "Error Ocurred" });
      });

    this.closeModal();
  };

  fetchPosts = () => {
    var jwt = localStorage.getItem("jwt");
    console.log(jwt);

    var config = {
      headers: { authorization: jwt }
    };

    axios
      .get("/api/getposts", config)
      .then(res => {
        this.setState();
        console.log(res.data);
        this.setState({ posts: res.data });
        
      })
      .catch(err => {
        console.log(err);
        M.toast({ html: "Error Ocurred" });
      });
  };

  componentDidMount() {
    this.greet();
    console.log("mount");

    var jwt = localStorage.getItem("jwt");
    var now = new Date();
    console.log(jwt);

    try {
      var dashboard = jsonwebtoken.verify(jwt, "authdemo");
      if (dashboard) {
        this.setState({ logedin: true });
      }
    } catch (error) {
      this.props.history.push("/login");
      console.log(error);
    }
   

    this.fetchPosts();

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
            lastName: result.data.lastName
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

 
  
    

  }

  render() {
    var postsss = this.state.posts;
    return (
      <div>
        <Navbar />
        <div class="row">
          <div className="maindash" />

          <a
            onClick={this.openModal}
            id="addbtn"
            class="btn-floating btn-large light-blue darken-3 pulse"
          >
            <i class="fas fa-plus fa-3x" />
          </a>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 ref={subtitle => (this.subtitle = subtitle)}>Add Story</h2>

            <form onSubmit={this.addpost}>
              <div class="input-field col s12">
                <textarea
                  id="textarea1"
                  onChange={this.changeHandlercontent}
                  class="materialize-textarea"
                />
                <label id='postlable' for="textarea1">What's Happening ?</label>
              </div>

              <div className="submit">
                <input
                  type="submit"
                  className="btn  waves-light light-blue darken-3"
                  value="Post"
                  id="submit"
                />
              </div>
            </form>
          </Modal>

          <div className="container">
            <div className="greet">
              <h1>hello {this.state.firstName}</h1>
            </div>

            <CandidateCard name="rajitha" />

            {postsss &&
              postsss.reverse().map((ele, iis) => {
                return <CandidateCard  upvotes={ele.up} downvotes={ele.down} name={ele.firstName} id={ele._id} content = {ele.content}/>;
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default dashboard;
