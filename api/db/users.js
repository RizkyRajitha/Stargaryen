const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ObjectID = require("mongodb").ObjectID;

saltRounds = 10;

var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },
  firstName: {
    type: String
  },

  lastName: {
    type: String
  },
  hash: {
    type: String
  },
  emailverified: {
    type: Boolean
  }
});

userSchema.methods.verifypass = function(password) {
  console.log("very pass - " + this.email + "\n hash - " + this.hash);
  const sts = bcrypt.compareSync(password, this.hash);
  console.log(" pass verified - " + sts);
  return sts;
};

userSchema.statics.getUserByToken = function(token) {
  console.log("inside get token");

  try {
    var data = jwt.verify(token, "authdemo");
    console.log("decode data " + data.id);
    var User = this;

    return User.findOne({ _id: data.id });
  } catch (error) {
    return new Promise((resolve,reject)=>{
      reject(error)
    })
  }
};

userSchema.methods.generateJWT = function() {
  console.log("inside genJWT");

  // console.log(this.email)

  return jwt.sign(
    {
      email: this.email,
      id: this._id
    },
    "authdemo",
    { expiresIn: "36000m" }
  );
};

const User = mongoose.model("User", userSchema);

module.exports = User;


/**    socket.on("newupvote", upvotedata => {
      console.log("someone upvoted" + JSON.stringify(upvotedata));

      var postarr = this.state.posts;
      console.log("post arr - " + postarr.length);
      for (var i = 0; i < postarr.length; i++) {
        //console.log("postszz - " + JSON.stringify(postarr[i]));
        if (postarr[i]._id === upvotedata.postid) {
          postarr[i] = upvotedata.updatepost;
          //postarr.splice(i, 1)
          // console.log("aha  - "+JSON.stringify(postarr));
        }
      }

      const userId = localStorage.getItem("userId");

      if (userId != upvotedata.userId) {
        M.toast({ html: upvotedata.name + " upvoted a post just now " });
      }
      //postarr.push(upvotedata.updatepost)
      setTimeout(() => {
        console.log(this.state.posts);
      }, 1000);
      this.setState({ posts: postarr });
    }); */