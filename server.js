const express = require("express");
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const {uri} = require("./config/key");
const user = require("./routers/api/user");
const profile = require("./routers/api/profile");

const bodyParser = require('body-parser');
const passport = require("passport");

app.use(passport.initialize());
require("./config/passport")(passport);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("链接成功")
    }).catch((err) => {
    console.log(err);
})
mongoose.set('useFindAndModify', false);

app.get("/", (req, res) => {
    res.send("首页");
})
app.use("/api/user", user);
app.use("/api/profile", profile);

app.listen(3000, () => {
    console.log(port);
})