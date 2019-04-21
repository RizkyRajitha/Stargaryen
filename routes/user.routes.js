const User = require("../db/users");
const ObjectID = require("mongodb").ObjectID;
const Posts = require("../db/posts");

exports.dashboard = (req, res) => {
  console.log(`************${req.headers.authorization}****************`);

  User.getUserByToken(req.headers.authorization)
    .then(doc => {
      console.log(doc);
      //res.send(doc);
      if (doc) {
        Posts.find().then(data => {
          doc.hash = null;

          res.status(200).json(doc);
        });
      } else {
        res.status(401).send("err_no_user");
      }
    })
    .catch(err => {
      console.log(err);
      res.status(401).send(err);
    });
};

exports.addpost = (req, res) => {
  console.log("in add post");

  console.log(req.body);

  User.getUserByToken(req.headers.authorization)
    .then(doc => {
      console.log(doc);

      var newpost = new Posts({
        firstName: req.body.firstName,
        content: req.body.content,
        date: new Date(),
        postid:1222
      });

      newpost
        .save()
        .then(data => {
          res.status(200).send(data);
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(401).send(err);
    });
};

exports.upvote = (req, res) => {
  //console.log(`************${req.headers.authorization}****************`);
  //var time = moment().toDate().getTime();

  User.getUserByToken(req.headers.authorization)
    .then(doc => {
      console.log(doc);

      res.send(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(401).send(err);
    });
};
