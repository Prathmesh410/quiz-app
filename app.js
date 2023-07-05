require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Port = process.env.PORT || 8000  ;



//db connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true
}).then(() =>{
    console.log("DB Connected")
}).catch(() => {
    console.log("DB not Connected")
});

//middelware 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

 //Starting a Server
 app.listen(Port,() =>{
     console.log(`app is running at ${Port}`);
 });