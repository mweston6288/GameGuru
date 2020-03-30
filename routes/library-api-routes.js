const db = require("../models");

module.exports = (app) => {
    app.post("/api/library", (req, res) => {
        db.User_Library.create({
            UserId: req.body.userID,
            GameId: req.body.id,
        }).then(((dbWishlist) => {
            res.json(dbWishlist);
        }));
    });

    app.delete("/api/library/:id", (req, res) => {
        db.User_Library.destroy({
            where:{
            UserId: req.body.userID,
            GameId: req.body.id},
        }).then((dbWishlist) => {
            res.json(dbWishlist);
        });
    });
};