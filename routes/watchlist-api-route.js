// Requiring our models
const db = require("../models");
//Routes
module.exports = (app) => {
    //Get request to find a watch list by UserId and DeveloperId
    app.get("/api/watchlist", (req, res) => {

        db.User_Watchlist.findOne({
            where:{
                UserId: req.query.UserId,
                DeveloperId: req.query.DeveloperId
            }
        }).then((dbWatchlist) => {
            res.json(dbWatchlist);
        });
    });
    //Get Request to find watchlist by Watchlist.id
    app.get("/api/watchlist/:id", (req, res) => {
        db.Watchlist.findOne({
            where: {
                id: req.params.id
            }.then((dbWatchlist) => {
                res.json(dbWatchlist);
            })
        });
    });
    //Post Request to add Developer to watchlist
    app.post("/api/watchlist", (req, res) => {
        db.User_Watchlist.create({
            UserId: req.body.userID,
            DeveloperId: req.body.id,
        }).then(((dbWatchlist) => {
            res.json(dbWatchlist);
        }));
    });


    //Delete request to remove developer from watchlist
    app.delete("/api/watchlist", (req, res) => {
        db.User_Watchlist.destroy({
            where:{
                UserId: req.body.userID,
                DeveloperId: req.body.id
            }
        }).then((dbWatchlist) => {
            res.json(dbWatchlist);
        });
    });
};