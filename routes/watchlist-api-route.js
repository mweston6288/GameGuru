const db = require("../models");

module.exports = (app) => {
    app.get("/api/watchlist", (req, res) => {
        db.Watchlist.findAll({}).then((dbWatchlist) => {
            res.json(dbWatchlist);
        });
    });

    app.get("/api/watchlist/:id", (req, res) => {
        db.Watchlist.findOne({
            where: {
                id: req.params.id
            }.then((dbWatchlist) => {
                res.json(dbWatchlist);
            })
        });
    });

    app.post("/api/watchlist", (req, res) => {
        db.User_Watchlist.create({
            UserId: req.body.userID,
            DeveloperId: req.body.id,
        }).then(((dbWatchlist) => {
            res.json(dbWatchlist);
        }));
    });



    app.delete("/api/watchlist", (req, res) => {
        db.Watchlist.destroy(req.body).then((dbWatchlist) => {
            res.json(dbWatchlist);
        });
    });
};