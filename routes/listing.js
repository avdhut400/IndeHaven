const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");


const Booking = require('../models/booking');

















const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.creatingListing)
    );


router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
    .get(wrapAsync(listingController.ShowListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));








router.get("/:id/payment", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("owner");

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    res.render("listing/payment", { listing }); 
});








router.post('/complete', async (req, res) => {
    const { listingId, amount, fullName, email, phone, duration } = req.body;
  
    try {
      const listing = await Listing.findById(listingId);
      if (!listing) {
        return res.status(404).send("Listing not found");
      }
  
      const booking = new Booking({
        listing: listing._id,
        fullName,
        email,
        phone,
        duration,
        amountPaid: amount
      });
  
      await booking.save();
  
      res.redirect(`/thankyou?bookingId=${booking._id}`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong!");
    }
  });
  







  










module.exports = router;
