var express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  router = require("./model/user/userRouter.js"),
  mongoose = require("mongoose"),
  session = require("express-session"),
  postmark = require("postmark"),
  usermodel_1 = require("./model/user/usermodel"),
  cors = require('cors'),
  connection = mongoose.connect(
    "mongodb://cloudUser:KingOfFighterz@ds023560.mlab.com:23560/cloudfusion");
//connection = mongoose.connect("mongodb://localhost/cloudfusion");

var app = express();
var port = process.env.PORT || 9000;
var file = path.resolve(__dirname, "../Client");

app.use(bodyParser.json({
  limit: '1500kb'
}));
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '1500kb'
}));
// app.use(session({
//     secret:"cloudfusion:ksdf5i01siu8sdfj7mkahksmamksmaksjsdi",
//     resave:false,
//     saveUninitialized: true,
//     expire:8.64e+7
// }));
app.use(express.static(file));
app.use(cors());
app.get("/verify/:id", function(req, res) {
  res.redirect("/#/login?verified=true");
  success.varifyToken = null;
  // success.save(function(err, success){
  //
  //
  //
  // })
  // console.log(req.params)
  // usermodel_1.UserModel.findOne({email: req.params.email}, function(err, success) {
  //     if (err) {
  //         res.send("Error to Find Data");
  //     }
  //     else {
  //         console.log(success);
  //
  //
  //     }
  // });
})
app.use("/router", router);
app.post("/logout", function(req, res) {
  delete req.session.loginUserDetails;
  res.status(200).send("ok");
});
app.get("/", function(req, res) {
  res.sendFile(path.resolve(__dirname, "../Client/index.htm"));
});

app.listen(port);

console.log("App is Running on port 9000");
