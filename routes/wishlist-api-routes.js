const db = require("../models");

module.exports = (app) => {
    app.get("/api/wishlist/:id", (req, res) => {
        db.User_Wishlist.findAll({
            where: {
                userId: req.query.id
            }
        }).then((dbWishlist) => {
            res.json(dbWishlist);
        });
    });

    app.get("/api/wishlist", (req, res) => {
        db.User_Wishlist.findOne({
            where:  {
                UserId: req.query.UserId,
                GameId: req.query.GameId
            },
        }).then((dbWishlist) => {
            res.json(dbWishlist);
        });
    });

    app.post("/api/wishlist", (req, res) => {
        db.User_Wishlist.create({
            UserId: req.body.userID,
            GameId: req.body.id,
        }).then(((dbWishlist) => {
            res.json(dbWishlist);
        }));
    });

    app.delete("/api/wishlist/:id", (req, res) => {
        db.User_Wishlist.destroy({
            where:{
                UserId: req.body.userID,
                GameId: req.body.id},
        }).then((dbWishlist) => {
            res.json(dbWishlist);
        });
    });
};