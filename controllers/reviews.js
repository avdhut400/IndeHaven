const Listing =require("../models/listing");
const Review =require("../models/reviews");

module.exports.createReview =async(req,res)=>{
    console.log(req.params._id);
    let listing=await Listing.findById(req.params.id);
    let newReview =new Review(req.body.review);
    newReview.author =req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);

    
    //listing.reviews.push(newReview._id);  //ooooo
    await newReview.save();
    
    await listing.save();

    console.log("new review saved");
    req.flash("success","New Review created");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview=async (req,res)=>{
    let { id,reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull : {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`)
};