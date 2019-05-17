const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bp = require("body-parser");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const socketFunctoins = require("./routes/socketfunctions");
const User = require("./db/users");
const ObjectID = require("mongodb").ObjectID;
const Posts = require("./db/posts");
const port = process.env.PORT || 3001;

mongoose.Promise = global.Promise;

const mongodbAPI = "mongodb://127.0.0.1:27017/social";

app.use(cors());
app.use(require("morgan")("dev"));
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

//const uu = require("./routes/userroute");

app.use("/api", require("./routes/routes"));
// app.get('/',(req,res)=>{
//   res.send('works')
// })

// app.use(express.static("../client/build"));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname,'../', "client", "build", "index.html"));
// });

try {
  mongoose.connect(mongodbAPI, { useNewUrlParser: true }, err => {
    if (!err) console.log("connected to mongodb sucsessfully" + "👍");
  });
} catch (error) {
  console.log(err);
}

mongoose.set("debug", true);

io.on("connection", sock => {
  console.log("user connected");
  sock.on("disconnect", () => {
    console.log("user disconnected");
  });

  sock.on("newpost", data => {
    console.log(
      "from socket.io newpost data - **************///////////////////////////- -" +
        JSON.stringify(data)
    );

    User.getUserByToken(data.jwt)
      .then(doc => {
        var newpost = new Posts({
          firstName: data.firstName,
          content: data.content,
          date: new Date()
        });

        newpost
          .save()
          .then(data => {
            console.log("emiting valid post");
            io.emit("newpost", data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log("emiting error post + " + err);
        sock.emit("newposterror", { content: " new post error 444" });
      });
  });

  sock.on("newupvote", msg => {
    console.log("upvoted - " + JSON.stringify(msg));

    User.getUserByToken(msg.jwt)
      .then(doc => {
        console.log("user valid");
        Posts.findById(ObjectID(msg.postid))
          .then(onepost => {
            console.log("post valid");

            if (onepost.upvoted.addToSet(doc._id).length) {
              console.log(doc.firstName + " new upvote");
              onepost.up = onepost.upvoted.length;
              onepost
                .save()
                .then(savepost => {
                  console.log('saved upvoted post - '+JSON.stringify(savepost));
                  io.emit("newupvote", {
                    msg: "sucsess",
                    postid: msg.postid,
                    updatepost:savepost
                  });
                  //res.status(200).json();
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              console.log("invalid upvote twice");
              sock.emit("newupvoteerror", { content: "cannot_upvote_twice" });
              //res.status(200).json({ msg: "invalid" });
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
  });
});

http.listen(3001, () => {
  console.log("listning on 3001");
});
