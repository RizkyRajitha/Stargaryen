import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CandidateCard from "../../components/CandidateCard";
import UserCard from "../../components/usercard";
import "./dashboard.css";
import Navbar from "../../components/navbar_metcss";
import axios from "axios";
import Modal from "react-modal";
import M from "materialize-css";
import io from "socket.io-client";
//import { upvote } from "../../../../api/routes/user.routes";
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
    transform: "translate(-50%, -50%)"
  }
};

//import { CandidateCard } from "./CandidateCard";
// const request = require("request");
const socket = io("http://127.0.0.1:3001", {
  transports: ["websocket"],
  upgrade: false
});

//"up":0,"down":0,"upvoted":[],"downvoted":[],"_id":"5cdc55822f24c95dec2e45d4","firstName":"Dewindi","content":"aaa","date":"Wed May 15 2019 23:38:02 GMT+0530 (+0530)","__v":0}

Modal.setAppElement("#root");
class dashboard extends Component {
  constructor(props) {
    super(props);
    //this.upvoteprop = this.upvoteprop.bind(this);
  }

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
    posts: [],
    upvoted: [],
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

  upvoteprop = postid => {
    console.log("only i upvoted post");
    var jwt = localStorage.getItem("jwt");
    var upvotedta = { postid: postid, jwt: jwt };

    var postarr = this.state.posts;

    for (var i = 0; i < postarr.length; i++) {
      if (postarr[i]._id === postid) {
        postarr[i].thisUserUpVoted = true;
        postarr[i].up = postarr[i].up + 1;
        break;
      }
    }

    socket.emit("newupvote", upvotedta);
    this.setState({ posts: postarr });
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
      content: this.state.content,
      jwt: jwt
    };

    socket.emit("newpost", senddata); //newposterror

    socket.on("newposterror", err => {
      M.toast({ html: "Error Ocurred" });
      console.log("error post emit fired " + err);
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
        // M.toast({ html: "Error Ocurred" });
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
      M.toast({ html: "Session Expired" });
    }

    this.fetchPosts();

    socket.on("newpost", newpost => {
      var preposts = this.state.posts;

      console.log(
        "added new post somewhere - 0=================" +
          JSON.stringify(newpost)
      );

      // this.setState(prevState => {
      //   const postszzz = [newpost, ...prevState.posts];
      //   console.log("set state = " + postszzz);
      //   return {postszzz}
      // });

      preposts.unshift(newpost);
      this.setState({ posts: preposts });
      console.log(this.state.posts);
    });

    socket.on("newupvote", upvotedata => {
      console.log("someone upvoted" + JSON.stringify(upvotedata));

      const userId = localStorage.getItem("userId");

      if (userId != upvotedata.userId) {
        M.toast({ html: upvotedata.name + " upvoted a post just now " });
        var postarr = this.state.posts;
        console.log("post arr - " + postarr.length);
        for (var i = 0; i < postarr.length; i++) {
          //console.log("postszz - " + JSON.stringify(postarr[i]));
          if (postarr[i]._id === upvotedata.postid) {
            postarr[i].up = upvotedata.updatepost.up;
            //postarr.splice(i, 1)
            // console.log("aha  - "+JSON.stringify(postarr));
          }
          this.setState({ posts: postarr });
        }
      } else {
      }
      //postarr.push(upvotedata.updatepost)
      setTimeout(() => {
        console.log(this.state.posts);
      }, 1000);
    }); //newupvoteerror

    socket.on("newupvoteerror", err => {
      console.log("error upvoted" + JSON.stringify(err));
      if (err.content === "cannot_upvote_twice") {
        M.toast({ html: "Cannot upvote an upvoted post" });
      }
    });

    //socket.emit("newpost", "sasasasasasas/////////////*qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");

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
    //var postsss = this.state.posts;

    //     socket.on("newpost", newpost => {
    //       var preposts = this.state.posts;

    // console.log("added new post somewhere - 0=================")

    //       preposts.push({ name: newpost.firstName, content: newpost.content });
    //       this.setState({ posts: preposts });
    //     });

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
                <label id="postlable" for="textarea1">
                  What's Happening ?
                </label>
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

            {this.state.posts.map(
              function(ele, i) {
                console.log("test");
                return (
                  <CandidateCard
                    key={i}
                    upvotescount={ele.up}
                    name={ele.firstName}
                    id={ele._id}
                    content={ele.content}
                    upvote={this.upvoteprop}
                    time={ele.date}
                    thisUserUpVoted={ele.thisUserUpVoted}
                  />
                );
              }.bind(this)
            )}

            {/* {postsss &&
              postsss.map((ele, iis) => {
                return (
                  <CandidateCard
                    upvotescount={ele.up}
                    name={ele.firstName}
                    id={ele._id}
                    content={ele.content}
                    upvote={this.upvoteprop}
                    time = {ele.date}
                    thisUserUpVoted = {ele.thisUserUpVoted}
                  />
                );
              })} */}
          </div>
        </div>
      </div>
    );
  }
}

export default dashboard;
