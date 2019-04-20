const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectID;



var Schema = mongoose.Schema;

var postSchema = new Schema({
  postid: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },
  firstName: {
    type: String
  },

  content: {
    type: String
  },
  date: {
    type: String
  },
  up: {
    type: Number
  },
  down:{
      type:Number
  }
});





const Post = mongoose.model("Post", postSchema);

module.exports = Post;
