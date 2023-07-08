require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Port = process.env.PORT || 8000  ;
const authRoutes = require("./routes/auth");
const questionRoutes = require('./routes/Question')
const quizRoutes = require('./routes/Quiz')
const participantRoutes = require('./routes/Paticipant')
const scoreRoutes = require('./routes/Score')
//middelware 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



app.use("/api",authRoutes);
app.use("/api",questionRoutes);
app.use("/api",quizRoutes);
app.use("/api",participantRoutes);
app.use("/api",scoreRoutes);




//db connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true,
    useFindAndModify: false 
}).then(() =>{
    console.log("DB Connected")
}).catch(() => {
    console.log("DB not Connected")
});

 //Starting a Server
 app.listen(Port,() =>{
     console.log(`app is running at ${Port}`);
 });