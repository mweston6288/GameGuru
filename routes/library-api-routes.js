const db = require("../models");

module.exports = (app) => {
    app.get("/api/library/:id", (req, res) => {
        db.User_Library.findAll({
            where: {
                userId: req.query.id
            }
        }).then((dblibrary) => {
            res.json(dblibrary);
        });
    });

    app.get("/api/library", (req, res) => {
        db.User_Library.findOne({
            where: {
                UserId: req.query.UserId,
                GameId: req.query.GameId
            },
        }).then((dblibrary) => {
            res.json(dblibrary);
        });
    });

    app.post("/api/library", (req, res) => {
        db.User_Library.create({
            UserId: req.body.userID,
            GameId: req.body.id,
        }).then(((dblibrary) => {
            res.json(dblibrary);
        }));
    });

    app.delete("/api/library/:id", (req, res) => {
        db.User_Library.destroy({
            where:{
                UserId: req.body.userID,
                GameId: req.body.id},
        }).then((dbLibrary) => {
            res.json(dbLibrary);
        });
    });
};