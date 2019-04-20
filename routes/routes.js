const express = require("express");
const router = express.Router();
const User = require("../db/users");
//const Candidate = require("../db/candidates");
const ObjectID = require("mongodb").ObjectID;
//require("../config/passport");
//const emailhandler = require("../config/emailhandler");
const path = require("path");
//const Evaluation = require("../db/evaluation");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");

// const profileimgupload = require("./fileupload.routes");
// const adminRoutes = require('./admin.routes')

//const mailhandleremailconfirm = require('../config/emailhandler')

// router.use(function(req, res) {
// 	res.sendFile(path.join(__dirname, '/../../client/build/index.html'));
// });

router.post("/signup", authRoutes.reg);
router.post("/login", authRoutes.Login);
router.get("/dashboard", userRoutes.dashboard);
router.post('/addpost',userRoutes.addpost);

// router.get("/dashboard", (req, res, next) => {
//   passport.authenticate(
//     "jwtstrategy",
//     { session: false },
//     (err, user, info) => {
//       console.log("error - " + err);
//       console.log("user - " + user);
//       console.log("info -- " + info);

//       if (!user) {
//         res.status(401).send(info);
//       } else {
//         User.findById(ObjectID(user.id))
//           .then(result => {
//             const senddata = {
//               id: result._id,
//               email: result.email,
//               emailverified: result.emailverified,
//               firstName: result.firstName,
//               lastName: result.lastName,
//               usertype:result.usertype
//             };
//             console.log(senddata);
//             res.status(200).json(senddata);
//           })
//           .catch(err => {
//             res.status(403).json(err);
//           });
//       }
//     }
//   )(req, res, next);
// });

router.post("/sendconfirmemail/:id", (req, res) => {
  console.log(req.params.id);

  User.findById(ObjectID(req.params.id))
    .then(doc => {
      console.log("tryna sent");
      emailhandler.mailhandleremailconfirm(doc.email, doc._id);
      res.status(200).send("email sent");
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/confirmemail/:id", (req, res) => {
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
});

router.post("/fogotpassword", (req, res) => {
  var email = req.body.email;

  User.find({ email: email })
    .then(result => {
      if (!result) {
        console.log(result + "not found error");
        res.send("no user found");
      } else {
        emailhandler.mailhandlerpasswordreset(email, result[0]._id);
        console.log(result[0]._id);
        res.json(result);
      }
    })
    .catch(err => {
      console.log("error - - - " + err);
      res.send("no_user_found");
    });
});

router.get("/getcandidate", (req, res) => {
  console.log("hiiii");
  // var iid = req.params.id;
  //console.log(iid);

  Candidate.find()
    .then(result => {
      res.status(200).json(result);
      console.log("candidates found");
    })
    .catch(err => {
      console.log("error - " + err);
    });

  // User.findById(ObjectID(iid))
  //   .then(result => {
  //     console.log("found" + result);
  //     res.json(result);
  //   })
  //   .catch(err => {
  //     console.log("err - " + err);
  //   });
});

router.get("/test", (req, res) => {
  // var ada = new Date();
  // console.log(ada);
  // const newuser = new User({
  //   email: "admin@auxenta.com",
  //   hash: "admin"
  // });

  // newuser
  //   .save()
  //   .then(result => {
  //     res.send(result);
  //   })
  //   .catch(err => {
  //     res.json(err);
  //   });

  can = ["aa", "bb"];

  User.findOneAndUpdate(
    { _id: ObjectID("5ca98a6200d8ab4264d7dffc") },
    {
      $set: {
        assinngedCandidates: can
      }
    }
  )
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

// router.post("/avatar/:id", profileimgupload.profileimgup);
// router.post("/cv/:id", profileimgupload.cvupload);
// router.post('/adminlogin',adminRoutes.adminLogin)
// router.get("/userdata",adminRoutes.userlist)

module.exports = router;
