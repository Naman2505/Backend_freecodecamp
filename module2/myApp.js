let express = require('express');
require("dotenv").config();
let app = express();

let msg = process.env.MESSAGE_STYLE;

app.use('/public', express.static(__dirname+"/public"));

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/views/index.html");
});

app.get("/json",(req,res)=>{
    if(msg == "uppercase"){
        res.json({"message":"HELLO JSON"});
    }
    else{
        res.json({"message": "Hello json"});
    }
})





























 module.exports = app;
