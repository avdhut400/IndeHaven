const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Listing = require('../models/listing');
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");


const Payment = require("../models/booking");




router.post("/complete", isLoggedIn, async (req, res) => {
    const { listingId, fullName, email, phone, amount, duration } = req.body;
  
    try {
      const listing = await Listing.findById(listingId);
      if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
      }
  
      const payment = new Payment({
        listing: listing._id,
        user: req.user._id,
        fullName,
        email,
        phone,
        amount,
        duration,
      });
  
      await payment.save();

      
      console.log("Payment saved:", payment);
  
      req.flash("success", "Payment successful!");
      res.redirect(`/listings/${listing._id}`);
    } catch (err) {
      console.error("Payment error:", err.message);
      req.flash("error", "Payment failed.");
      res.redirect("/listings");
    }
  });
  

module.exports = router;
