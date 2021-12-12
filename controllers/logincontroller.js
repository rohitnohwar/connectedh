const User = require("../models/usermodel")

async function login(req, res){
    const username = req.body.username
    const password = req.body.password

    User.findOne({username:username}, function(err, foundUser){
        if(err){
            console.log(err);
        }
        else if(!foundUser){
            res.json({auth:false, message:"User doesn't exist"});
        }
        
        else  if(foundUser){
            if(foundUser.password === password) {
                res.json({auth:true, message:"User exists. Login successful", foundUser: foundUser});
            }
            else {
                res.json({auth:false, message:"Incorrect password"});
            }
        }
    });
}

module.exports = {login}