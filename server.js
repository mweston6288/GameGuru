// Server.js - This file is the initial starting point for the Node/Express server.
//required NPM packages (dependecies)
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
//Sets up Express App
const app = express();
const PORT = process.env.PORT || 8080;
// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extented: true}));
app.use(express.json());
// Static directory
app.use(express.static("public"));
//This is authentication process for passport
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
//Handlebars Config
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//API Routes
require("./routes/login-api-route")(app);
require("./routes/html-routes")(app);
require("./routes/games-api-routes") (app);
require("./routes/watchlist-api-route") (app);
require("./routes/wishlist-api-routes") (app);
require("./routes/library-api-routes") (app);
require("./routes/developer-api-route") (app);
//Controller Routes
const routes = require("./controllers/wishlistControllers");
app.use(routes);
app.use(require("./controllers/libraryControllers"));
app.use(require("./controllers/watchlistControllers"));
//Sequelize config
db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log("App listening on Port " + PORT);
    });
});
