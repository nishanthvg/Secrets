require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose")
const encrypt = require("mongoose-encryption");
var md5 = require('md5');

const app = express();


app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine',"ejs");

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true,useUnifiedTopology:true})

const userSchema = new mongoose.Schema( {
    email:String,
    password:String
});



const User = mongoose.model("User",userSchema);

app.get("/",(req,res) => {
    res.render("home");
});


app.route("/login")
    .get((req,res) => {
        res.render("login");
    })
    .post((req,res) => {
        const username = req.body.username;
        const password = md5(req.body.password);
        User.findOne({email: username},(err,foundUser) =>{
            if(!err) {
                if(foundUser.password === password) {
                    res.render("secrets");
                } else {
                    res.render("login")
                }
            }
        });
    });


app.route("/register")
    .get((req,res) => {
        res.render("register");
    })

    .post((req,res) => {
        const newUser = new User({
            email:req.body.username,
            password:md5(req.body.password)
        });
        newUser.save((err) => {
            if(err) {
                console.log(err)
            } else {
                res.render("secrets")
            }
        });
    });



app.listen(3000,() => [
    console.log("Server runs in port 3000")
])