const User = require("../db/users");
const ObjectID = require("mongodb").ObjectID;
const bcrypt = require("bcryptjs");
const saltRounds = 10;

exports.Login = (req, res) => {
  console.log("in loging" + req.body);

  User.findOne({ email: req.body.email })
    .then(doc => {
      var state = doc.verifypass(req.body.password)
      console.log(state)

      if(state){
        var token = doc.generateJWT()
      var obj = { jwt: token, msg: "loggedin" };
      res.status(200).json(obj)

      }else{
        
        res.status(401).json('invalid_pass')
      }


     
    })
    .catch(err => {
      console.log(err)
      res.status(401).json('invalid_email')
    });
};

exports.reg = (req, res) => {
  console.log("in reg");

  var salt = bcrypt.genSaltSync(saltRounds);
  var hashpass = bcrypt.hashSync(req.body.password, salt);

  const newuser = new User({
    email: req.body.email,
    hash: hashpass,
    firstName: req.body.firstname,
    lastName: req.body.lastname
  });

  console.log(newuser);

  newuser
    .save()
    .then(doc => {
      var token = doc.generateJWT();
      console.log(token);
      var obj = { jwt: token, msg: "registered" };
      res.status(200).json(obj);
    })
    .catch(err => {
      console.log(" reg err -  " + err);

      if (err.code === 11000) {
        console.log(" reg err duplicate email found ");
        res.status(403).json(err.code);
      } else {
        res.status(403).json(err);
      }
    });
};


