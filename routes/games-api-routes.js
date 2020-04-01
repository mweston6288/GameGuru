//Requires our Models
const db = require("../models");
//Routes
module.exports = (app) => {
    //GEt Request for all games
    app.get("https://api.rawg.io/api/games", (req, res) => {
        db.Games.findAll({
        }).then((dbGames) => {
            res.json(dbGames);
        });
    });
    //GEt Request for 1 Game
    app.get("https://api.rawg.io/api/games/:name", (req, res) => {
        db.Games.findOne({
            where:  {
                name: req.params.name
            },
        }).then((dbGames) => {
            res.json(dbGames);
        });
    });
    //Post Request to add GAme Id to DB
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