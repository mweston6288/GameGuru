const db = require("../models");

module.exports = (app) => {
    app.get("https://api.rawg.io/api/games", (req, res) => {
        db.Games.findAll({
        }).then((dbGames) => {
            res.json(dbGames);
        });
    });
    app.get("https://api.rawg.io/api/games/:name", (req, res) => {
        db.Games.findOne({
            where:  {
                name: req.params.name
            },
        }).then((dbGames) => {
            res.json(dbGames);
        });
    });
    app.post("/api/user/game", (req, res) => {
        //console.log("Game Data:");
        console.log(req.body);
        db.Games.create({
            gameID: req.body.gameID,
            plaformID: req.body.plaformID,
            storeID: req.body.storeID,
            developergameID: req.body.developergameID,
            genresID: req.body.genresID,
            tagID: req.body.tagID,
            publishergameID: req.body.publishergameID,
            userID: req.body.userID,
        }).then(function(dbGames) {
            res.json(dbGames);
        });
    });
};