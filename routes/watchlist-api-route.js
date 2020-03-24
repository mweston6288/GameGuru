const db = require("../models");

module.exports = (app) => {
    app.get("/api/user/watchlist", (req, res) => {
        db.Watchlist.findAll({}).then((dbWatchlist) => {
            res.json(dbWatchlist);
            //console.log(dbWatchlist)
        });
    });

    app.get("/api/user/watchlist/:id", (req, res) => {
        db.Watchlist.findOne({
            where: {
                id: req.params.id
            }.then((dbWatchlist) => {
                res.json(dbWatchlist);
                //console.log(dbWatchlist)
            })
        });
    });

    app.post("/api/user/watchlist", (req, res) => {
        db.Watchlist.create(req.body).then ((dbWatchlist) => {
            res.json(dbWatchlist);
            //console.log(dbWatchlist)
        });
    });


    app.delete("/api/user/watchlist", (req, res) => {
        db.Watchlist.destroy(req.body).then((dbWatchlist) => {
            res.json(dbWatchlist);
            //console.log(dbWatchlist)
        });
    });
};