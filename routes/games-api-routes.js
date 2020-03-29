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
        db.Games.create({
            id: req.body.id,
        }).then((dbGames) => {
            res.json(dbGames);
        }).catch((err) => {
            console.log(err);
        });
    });
};