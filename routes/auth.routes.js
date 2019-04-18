const User = require("../db/users");
const ObjectID = require("mongodb").ObjectID;

exports.Login = function(req, res){

    const newuser = new User({
      email: req.body.email,
      hash: req.body.password,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      usertype: req.body.usertype
    });
    console.log(`email - ${req.body.email}  pass - ${req.body.password}`);
    //newuser.setpass(req.body.password);
    console.log('>>>>><<<<<<'+user.usertype)

    User.findById(ObjectID(user.id)).then((doc) => {
      console.log(doc.usertype)
     
        newuser
        .save()
        .then(result => {
          console.log("succsess");
          //var token = result.generateJWT();
          return res.status(200).send({});
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
    }


}

exports.reg = (req, res)=>{



}

