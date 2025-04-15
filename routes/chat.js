const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const { isLoggedIn } = require("../middleware"); 


router.get("/chat/:listingId", isLoggedIn, async (req, res) => {
    const { listingId } = req.params;
    try {
        const listing = await Listing.findById(listingId).populate("owner");

        if (!listing) {
            req.flash("error", "Listing not found.");
            return res.redirect("/listings");
        }

        res.render("listing/chat", {
            listing,
            user: req.user, 
        });
    } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong.");
        res.redirect("/listings");
    }
});

module.exports = router;
