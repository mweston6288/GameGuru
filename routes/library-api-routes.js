
// Requiring our models
const db = require("../models");
//Routes
module.exports = (app) => {
    //Get Request for all Libraries
    app.get("/api/library/:id", (req, res) => {
        db.User_Library.findAll({
            where: {
                userId: req.query.id
            }
        }).then((dblibrary) => {
            res.json(dblibrary);
        });
    });
    //Get request to find library by the UserId and GameId
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
    //Post request to add game to user library
    app.post("/api/library", (req, res) => {
        db.User_Library.create({
            UserId: req.body.userID,
            GameId: req.body.id,
        }).then(((dblibrary) => {
            res.json(dblibrary);
        }));
    });
    //Delete Request to Remove game from Library
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