import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./candidatecard.css";
import M from "materialize-css";
import Axios from "axios";

const moment = require("moment");

class CandidateCard extends Component {
  state = {
    id: null,
    thumbsicon: false,
    fromNow: null
  };

  upvote = () => {
    console.log("up");
    console.log("id - " + this.props.id);
    console.log(this.state);

    if (this.state.thumbsicon === false) {
      this.setState({
        thumbsicon: true
      });

      this.props.upvote(this.props.id);
    } else {
      // this.setState({
      //   thumbsicon: false
      // });
    }

    // if (this.state.upvotesnow >= this.state.upvotesbegin + 1) {
    //   M.toast({ html: "cannot upvote twice" });
    // } else {
    //   this.setState({ upvotesnow: this.state.upvotesbegin + 1 });

    //   setTimeout(() => {
    //     var jwt = localStorage.getItem("jwt");

    //     var config = {
    //       headers: { authorization: jwt }
    //     };
    //     Axios.post("/api/upvote", { postid: this.props.id }, config)
    //       .then(result => {
    //         console.log(result);
    //         M.toast({ html: "upvotes" });
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   }, 2000);
    // }
  };

  // componentDidMount() {
  //   //this.setState({ upvotecount: this.props.upvotescount });
  //   console.log(
  //     "time i got in can card - " +
  //       this.props.time.slice(4, 24) +
  //       "pro - " +
  //       JSON.stringify(this.props)
  //   );
  //   // const dote = new Date(this.props.time)
  //   // console.log(dote.toTimeString)
  //   //Tue Apr 23 2019 12:21:53 GMT+0530 (+0530)
  //   var s = this.props.time.slice(4, 24); //"2019-04-24 18:00:00";  // from action.timeStamp

  //   //var actionTime = moment(s , "YYYY-MM-DD HH:mm:ssZ");
  //   var actionTime = moment(s, "MMM-DD-YYYY HH:mm:ssZ");
  //   var timeAgo = actionTime.fromNow();

  //   console.log(timeAgo);

  //   this.setState({ fromNow: timeAgo });

  //   console.log("upvoide count - " + this.props.upvotescount);
  //   console.log(this.props);

  //   // this.setState({
  //   //   thumbsicon: this.props.thisUserUpVoted
  //   // })
  // }

  render() {
    if (this.props.time) {
      var s = this.props.time.slice(4, 24); //"2019-04-24 18:00:00";  // from action.timeStamp

      //var actionTime = moment(s , "YYYY-MM-DD HH:mm:ssZ");
      var actionTime = moment(s, "MMM-DD-YYYY HH:mm:ssZ");
      var timeAgo = actionTime.fromNow();
    }

    return (
      <div className="postcard">
        <div>
          <div className="card horizontal">
            <div className="card-stacked">
              <h4 className="cardheader">
                {this.props.name} <span className="fromnow">{timeAgo}</span>{" "}
              </h4>
              <div className="card-content">
                <p className="cardcontent">{this.props.content}</p>
              </div>

              <div />
              <div>
                <div className="votes">
                  <span className="upvotecount">{this.props.upvotescount}</span>

                  <a hidden={this.props.thisUserUpVoted}>
                    <i
                      onClick={this.upvote}
                      id="up"
                      className="far fa-thumbs-up fa-2x"
                    />
                  </a>
                  <a hidden={!this.props.thisUserUpVoted}>
                    <i
                      class="fas fa-thumbs-up fa-2x"
                      onClick={this.upvote}
                      id="up"
                    />
                  </a>
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
