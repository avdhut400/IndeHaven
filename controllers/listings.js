const Listing = require("../models/listing");
const mongoose = require("mongoose");


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listing/index.ejs", { allistings: allListings });
};


module.exports.renderNewForm = (req, res) => {
    res.render("listing/new.ejs");
};

module.exports.ShowListing = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" }
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    let isOwner = false;
    if (req.user && listing.owner && listing.owner._id.equals(req.user._id)) {
        isOwner = true;
    }

    res.render("listing/show.ejs", { listing, currUser: req.user, isOwner });
};


module.exports.creatingListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, "..", filename);

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash("error", "Invalid listing ID!");
            return res.redirect("/listings");
        }

        const listing = await Listing.findById(id)
            .populate({ path: "owner", select: "username" })
            .populate("reviews");

        if (!listing) {
            req.flash("error", "Listing does not exist!");
            return res.redirect("/listings");
        }

        let originalImageUrl = listing.image.url;
        originalImageUrl.replace("/uploads", "/uploads/h_300,w_250");

        res.render("listing/edit.ejs", { listing, originalImageUrl });
    } catch (error) {
        console.error(" Error fetching listing:", error);
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
};


module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);

    listing.set(req.body.listing);

    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await listing.save();

    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};


