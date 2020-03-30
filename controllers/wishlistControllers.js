const express = require("express");
const router = express.Router();
const db = require("../models/");
const isAuthenticated = require("../config/middleware/isAuthenticated");
router.get("/wishlist", isAuthenticated, (req,res)=>{
    db.User_Wishlist.getWishlist(req.user.id, (err, data)=>{
        const hbsObject = {
            games: data
        };
        res.render("wishlist", hbsObject);

    });
});

module.exports = router;