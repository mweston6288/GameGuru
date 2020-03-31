const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");

const app = express();
const PORT = process.env.PORT || 8080;
const db = require("./models");


app.use(express.urlencoded({ extented: true}));
app.use(express.json());
app.use(express.static("public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/login-api-route")(app);
require("./routes/html-routes")(app);
require("./routes/games-api-routes") (app);
require("./routes/watchlist-api-route") (app);
require("./routes/wishlist-api-routes") (app);
require("./routes/library-api-routes") (app);

require("./routes/developer-api-route") (app);

const routes = require("./controllers/wishlistControllers");
app.use(routes);
app.use(require("./controllers/libraryControllers"));
app.use(require("./controllers/watchlistControllers"));

db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log("App listening on Port " + PORT);
    });
});
