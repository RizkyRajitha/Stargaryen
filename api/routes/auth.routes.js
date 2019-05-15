const User = require("../db/users");
const ObjectID = require("mongodb").ObjectID;
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const emailhandler = require('../emailhandler/emailhndler')

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


//router.post("/sendconfirmemail/:id",
exports.sendconfirmmail = (req, res) => {
  console.log(req.params.id);


  User.findById(ObjectID(req.params.id))
    .then(doc => {
      console.log('tryna sent')
      emailhandler.mailhandleremailconfirm(doc.email, doc._id);
      res.status(200).send("email sent");
    })
    .catch(err => {
      res.json(err);
    });
}

//router.post("/confirmemail/:id", 

 exports.confirmmail = (req, res) => {
  console.log(req.params.id);

  User.findOneAndUpdate(
    { _id: ObjectID(req.params.id) },
    { $set: { emailverified: true } }
  )
    .then(doc => {
      console.log("verified + " + doc.emailverified);
      res.send("email verified");
    })
    .catch(err => {
      console.log("error confirming email");
    });
}

//router.post("/fogotpassword", 

 exports.forgotpassword  = (req, res) => {
  var email = req.body.email;

  User.find({ email: email })
    .then(result => {
      if (!result) {
        console.log(result + "not found error");
        res.status(404).send("no user found");
      } else {
        emailhandler.mailhandlerpasswordreset(email, result[0]._id,result[0].firstName,result[0].lastName);
        console.log(result[0]._id);
        res.json(result);
      }
    })
    .catch(err => {
      console.log("error - - - "+err);
      res.send("no_user_found");
    });
}



//router.post("/resetpassword/:id",

exports.resetpassword =  (req, res) => {
  id = req.params.id;
  newpassword = req.body.password;
  console.log(id);
  console.log(newpassword);
  // res.send("hahahaha  " + id);
  User.findById({ _id: ObjectID(id) })
    .then(result => {
      console.log("found " + result.email);

      var salt = bcrypt.genSaltSync(saltRounds);
      result.hash = bcrypt.hashSync(newpassword, salt);

      
      result
        .save()
        .then(doc => {
          console.log("password changed succesfully");
          res.send("password changed succesfully");
        })
        .catch(err => {
          console.log(err);
          res.status(500).send(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.send("error");
    });
}




// router.post("/changepass/:id", (req, res) => {
//   id = req.params.id;
//   newpassword = req.body.password;
//   console.log(id);
//   console.log("pppppppppppppppppppppppppp");
//   console.log(newpassword);
//   console.log("pppppppppppppppppppppppppp");

//   User.findById({ _id: ObjectID(id) })
//     .then(result => {
//       console.log("found " + result.email);

//       result.hash = newpassword;
//       result
//         .save()
//         .then(doc => {
//           console.log("password changed succesfully");
//           res.send("password changed succesfully");
//         })
//         .catch(err => {
//           console.log(err);
//           res.status(500).send(err);
//         });
//     })
//     .catch(err => {
//       console.log(err);
//       res.send("error");
//     });
// });