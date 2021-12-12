require("dotenv").config();
const express=require("express");
const ejs=require("ejs");
const cors=require("cors");
const fs=require("fs");
const bodyParser = require("body-parser");
const path=require("path");
const mongoose=require("mongoose")

const app = express();
app.set('view engine','ejs');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.static("./client/Images"));

mongoose.connect(process.env.URI, {useNewUrlParser:true, useUnifiedTopology: true});
//mongoose.set("useCreateIndex", true);
//mongoose.set("useFindAndModify", false);
const loginroutes = require("./routes/loginroutes")
const mainroutes = require("./routes/mainroutes")


app.use("/", loginroutes)
app.use("/", mainroutes)

const port = process.env.PORT || 3001;

if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"));

    app.get("*", function(req, res){
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(port, () => {
});