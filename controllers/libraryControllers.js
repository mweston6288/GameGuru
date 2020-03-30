const express = require("express");
const router = express.Router();
const db = require("../models/");
const isAuthenticated = require("../config/middleware/isAuthenticated");
router.get("/library", isAuthenticated, (req, res) => {
    db.User_Library.getLibrary(req.user.id, (err, data) => {
        const hbsObject = {
            games: data
        };
        res.render("library", hbsObject);

    });
});

module.exports = router;