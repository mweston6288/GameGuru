const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = (app) => {
  app.get("/", (req, res) => {
    if (req.user){
      res.redirect("/user");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function(req, res){
    if(req.user){
      res.redirect("/user");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  app.get("/user", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
  app.get("/user/wishlist", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/wishlist.html"));
  });
  app.get("/user/watchlist", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/watchlist.html"));
  });

};