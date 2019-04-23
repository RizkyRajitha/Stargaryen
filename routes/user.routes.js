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
        date: new Date()
      });

      newpost
        .save()
        .then(data => {
          res.status(200).send(data);
        })
        .catch(err => {
          console.log(err);
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
  console.log("in upvote  kkkk ");
  console.log(req.body);

  User.getUserByToken(req.headers.authorization)
    .then(doc => {
      console.log("user valid");
      Posts.findById(ObjectID(req.body.postid))
        .then(onepost => {
          console.log("post valid");

          if (onepost.upvoted.addToSet(doc._id).length) {
            console.log(doc.firstName + " new upvote");
            onepost.up = onepost.upvoted.length;
            onepost
              .save()
              .then(savepost => {
                console.log(savepost);
                res.status(200).json({ msg: "sucsess" });
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            console.log("invalid upvote");
            res.status(200).json({ msg: "invalid" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(401).send(err);
    });
};

exports.downvote = (req, res) => {
  //console.log(`************${req.headers.authorization}****************`);
  //var time = moment().toDate().getTime();
  console.log("in downvote  kkkk ");
  console.log(req.body);

  User.getUserByToken(req.headers.authorization)
    .then(doc => {
      console.log("user valid");
      Posts.findById(ObjectID(req.body.postid))
        .then(onepost => {
          console.log("post valid");

          if (onepost.downvoted.addToSet(doc._id).length) {
            console.log(doc.firstName + " new downvote");
            onepost.down = onepost.downvoted.length;
            onepost
              .save()
              .then(savepost => {
                console.log(savepost);
                res.status(200).json({ msg: "sucsess" });
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            console.log("invalid downvote");
            res.status(200).json({ msg: "invalid" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(401).send(err);
    });
};

exports.getposts = (req, res) => {
  User.getUserByToken(req.headers.authorization)
    .then(doc => {
      Posts.find()
        .then(postsData => {
          res.status(200).json(postsData);
        })
        .catch(err => {
          res.status(304).json(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(401).send(err);
    });
};

exports.getpost = (req, res) => {
  console.log(req.params.id);

  User.getUserByToken(req.headers.authorization)
    .then(doc => {
      Posts.findById(ObjectID(req.params.id))
        .then(postsData => {
          const voted = {
            upvoted: postsData.upvoted,
            downvoted: postsData.downvoted
          };

          res.status(200).json(voted);
        })
        .catch(err => {
          res.status(304).json(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(401).send(err);
    });
};
