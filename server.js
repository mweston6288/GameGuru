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

require("./routes/login-api-route")(app);
require("./routes/html-routes")(app);
require("./routes/games-api-routes") (app);
require("./routes/watchlist-api-route") (app);
require("./routes/wishlist-api-routes") (app);


db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log("App listening on Port " + PORT);
    });
});
