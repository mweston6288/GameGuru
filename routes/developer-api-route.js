// Requiring our models
const db = require("../models");
//Routes
module.exports = (app) => {
    //GEt Request for all Developers
    app.get("https://api.rawg.io/api/developers", (req, res) => {
        db.Developer.findAll({
        }).then((dbDeveloper) => {
            res.json(dbDeveloper);
        });
    });
    //Get Request for 1 Developer
    app.get("https://api.rawg.io/api/developers/:id", (req, res) => {
        db.Developer.findOne({
            where:  {
                name: req.params.name
            },
        }).then((dbDeveloper) => {
            res.json(dbDeveloper);
        });
    });
    //Post request to add Developer to DB
    app.post("/api/developer", (req, res) => {
        db.Developer.create({
            id: req.body.id,
        }).then((dbDeveloper) => {
            res.json(dbDeveloper);
        }).catch((err) => {
            console.log(err);
        });
    });
};