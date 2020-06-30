const express = require("express");
const ejs = require("ejs");

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine',ejs);


app.listen(3000,() => [
    console.log("Server runs in port 3000")
])