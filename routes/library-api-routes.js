const db = require("../models");

module.exports = (app) => {
    app.post("/api/library", (req, res) => {
        console.log(req.body);
        db.User_Library.create({
            UserId: req.body.userID,
            GameId: req.body.id,
        }).then(((dbWishlist) => {
            res.json(dbWishlist);
        }));
    });

    app.delete("/api/wishlist", (req, res) => {
        db.User_Library.destroy({
            UserId: req.body.userID,
            GameId: req.body.id,
        }).then((dbWishlist) => {
            res.json(dbWishlist);
        });
    });
};