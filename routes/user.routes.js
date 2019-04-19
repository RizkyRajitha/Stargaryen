const User = require("../db/users");
const ObjectID = require("mongodb").ObjectID;
const Posts = require('../db/posts')

exports.dashboard = (req, res) => {
  console.log(`************${req.headers.authorization}****************`);

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
