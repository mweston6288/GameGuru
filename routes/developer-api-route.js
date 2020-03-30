const db = require("../models");

module.exports = (app) => {
    app.get("https://api.rawg.io/api/developers", (req, res) => {
        db.Developer.findAll({
        }).then((dbDeveloper) => {
            res.json(dbDeveloper);
        });
    });
    app.get("https://api.rawg.io/api/developers/:id", (req, res) => {
        db.Developer.findOne({
            where:  {
                name: req.params.name
            },
        }).then((dbDeveloper) => {
            res.json(dbDeveloper);
        });
    });
    app.post("/api/user/developer", (req, res) => {
        db.Developer.create({
            DeveloperId: req.body.id,
        }).then((dbDeveloper) => {
            res.json(dbDeveloper);
        }).catch((err) => {
            console.log(err);
        });
    });
};