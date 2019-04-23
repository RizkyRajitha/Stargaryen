import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./candidatecard.css";
import M from "materialize-css";
import Axios from "axios";

class CandidateCard extends Component {
  state = {
    upvotesbegin: null,
    downvotesbegin: null,
    upvotesnow: null,
    downvotesnow: null,
    id: null
  };

  upvote = () => {
    console.log("up");
    console.log("id - " + this.props.id);
    console.log(this.state);

    if (this.state.upvotesnow >= this.state.upvotesbegin + 1) {
      M.toast({ html: "cannot upvote twice" });
    } else {
      this.setState({ upvotesnow: this.state.upvotesbegin + 1 });

      setTimeout(() => {
        var jwt = localStorage.getItem("jwt");

        var config = {
          headers: { authorization: jwt }
        };
        Axios.post("/api/upvote", { postid: this.props.id }, config)
          .then(result => {
            console.log(result);
            M.toast({ html: "upvotes" });
          })
          .catch(err => {
            console.log(err);
          });
      }, 2000);
    }
  };

  componentDidMount() {
    // console.log('id - '+this.props.id)
    //     var jwt = localStorage.getItem("jwt");
    //     console.log(jwt);
    //     var config = {
    //       headers: { authorization: jwt }
    //     };
    //     Axios.get("/api/getpost/"+this.props.id, config)
    //       .then(res => {
    //         this.setState();
    //         console.log('voted array list - '+res.data);
    //        // this.setState({ posts: res.data });
    //       })
    //       .catch(err => {
    //         console.log(err);
    //         M.toast({ html: "Error Ocurred" });
    //       });
  }

  downvote = () => {
    console.log("down");
    console.log(this.state);

    if (this.state.downvotesnow <= this.state.downvotesbegin - 1) {
      M.toast({ html: "cannot downvote twice" });
    } else {
      this.setState({ downvotesnow: this.state.downvotesbegin - 1 });
      setTimeout(() => {
        var jwt = localStorage.getItem("jwt");

        var config = {
          headers: { authorization: jwt }
        };
        Axios.post("/api/downvote", { postid: this.props.id }, config)
          .then(result => {
            console.log(result);
            M.toast({ html: "upvotes" });
          })
          .catch(err => {
            console.log(err);
          });
      }, 2000);
    }
  };

  render() {
    if (this.props.date) {
      console.log("dataaa" + this.props.date);
      var dd = new Date(this.props.date);
      var d = dd.toJSON().slice(0, 10);
      console.log();
    }

    //   .toJSON()
    //   .slice(0, 10)
    //   .replace(/-/g, "/");

    return (
      <div className="postcard">
        <div>
          <div className="card horizontal">
            <div className="card-image">
              <img src="https://lorempixel.com/100/190/nature/6" />
            </div>
            <div className="card-stacked">
              <h2 className="cardheader">{this.props.name}</h2>
              <div className="card-content">
                <p className="cardcontent">{this.props.content}</p>
              </div>

              <div className="row" id='arrow'>
                <div class="col s12 m4 l2">
                  <div className="counter">
                    upvotes:= {this.props.upvotes} <br />
                    downvotes:= {this.props.downvotes}
                  </div>
                </div>
                <div class="col s12 m4 l8">
                
                </div>
                <div class="col s12 m4 l2">
                  <div className="votes">
                    <a>
                      <i
                        onClick={this.upvote}
                        id="up"
                        className="far fa-thumbs-up fa-2x"
                      />
                    </a>
                    <a>
                      <i
                        onClick={this.downvote}
                        id="down"
                        class="far fa-thumbs-down fa-2x"
                      />
                    </a>

                    <a>
                      <i class="fas fa-thumbs-up fa-2x" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CandidateCard);
