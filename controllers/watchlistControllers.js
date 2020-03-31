const express = require("express");
const router = express.Router();
const db = require("../models/");
const isAuthenticated = require("../config/middleware/isAuthenticated");
router.get("/watchlist", isAuthenticated, (req, res) => {
    db.User_Watchlist.getWatchlist(req.user.id, (err, data) => {
        const hbsObject = {
            devs: data
        };
        res.render("watchlist", hbsObject);
    });
});

module.exports = router;