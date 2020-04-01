// Requiring our models for syncing
const db = require("../models");
//Route
module.exports = (app) => {
    //Find all Wishlists
    app.get("/api/wishlist/:id", (req, res) => {
        db.User_Wishlist.findAll({
            where: {
                userId: req.query.id
            }
        }).then((dbWishlist) => {
            res.json(dbWishlist);
        });
    });
    // Find One Wishlist
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
    // Post to DB
    app.post("/api/wishlist", (req, res) => {
        db.User_Wishlist.create({
            UserId: req.body.userID,
            GameId: req.body.id,
        }).then(((dbWishlist) => {
            res.json(dbWishlist);
        }));
    });
    // Delete From DB
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