var express = require("express"),
    path = require("path"),
    bodyBarser = require("body-parser"),
    router = require("./model/user/userRouter.js"),
    mongoose = require("mongoose"),
    connection = mongoose.connect("mongodb://localhost/cloudfusion");

var app = express();
var port = process.env.PORT || 9000;
var file = path.resolve(__dirname, "../Client");

app.use(bodyBarser.json());
app.use(bodyBarser.urlencoded( { extended: false}));

app.use(express.static(file));

app.use("/router", router);

app.get("/", function(req, res) {
    res.sendFile(path.resolve(__dirname, "../Client/index.htm"));
});

app.listen(port);

console.log("App is Running on port 9000");
