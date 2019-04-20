import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./candidatecard.css";

class CandidateCard extends Component {
  upvote = () => {
    console.log("up");
  };

  downvote = () => {
    console.log("down");
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
          <h2 class="header">{this.props.name}</h2>
          <div class="card horizontal">
            <div class="card-image">
              <img src="https://lorempixel.com/100/190/nature/6" />
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <p>
                  I am a very simple card. I am good at containing small bits of
                  information.
                </p>
              </div>
              <div className="votes">
                <a >
                  <i
                    onClick={this.upvote}
                    id="up"
                    class="far fa-thumbs-up fa-2x"
                  />
                </a>
                <a >
                  <i
                    onClick={this.downvote}
                    id="down"
                    class="far fa-thumbs-down fa-2x"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CandidateCard);
