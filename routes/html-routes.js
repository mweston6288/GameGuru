//depndencies
const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");
//Routes
module.exports = (app) => {
    //Get Request to Retrieve Login page
    app.get("/", (req, res) => {
        if (req.user){
            res.redirect("/user");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });
    //Get Requst for a new user page
    app.get("/signup", function(req, res){
        if(req.user){
            res.redirect("/user");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });
    //GEt Request after authenticate user credentials for user page
    app.get("/user", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/user.html"));
    });
    //Get Request to change user name and password in options page
    app.get("/options", isAuthenticated, (req,res)=>{
        res.sendFile(path.join(__dirname, "../public/options.html"));
    });

};