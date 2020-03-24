const db = require("../models");

module.exports = (app) => {
    app.get("/api/user/wishlist", (req, res) => {
        db.Wishlist.findAll({
            where: devQuery, pubQuery,
            include: [db.Developer] [db.Publisher]
        }).then((dbWishlist) => {
            res.json(dbWishlist);
        });
    });

    app.get("/api/user/wishlist", (req, res) => {
        db.Wishlist.findOne({
            where:  {
                id: req.params.id
            },
        }).then((dbWishlist) => {
            res.json(dbWishlist);
        });
    });

    app.post("/api/user/wishlist", (req, res) => {
        db.Wishlist.create(req.body).then(((dbWishlist) => {
            res.json(dbWishlist);
        }));
    });

    app.delete("/api/user/wishlist", (req, res) => {
        db.Wishlist.destroy(req.body).then((dbWishlist) => {
            res.json(dbWishlist);
        });
    });
};