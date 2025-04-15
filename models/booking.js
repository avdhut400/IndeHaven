// models/payment.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const paymentSchema = new mongoose.Schema({
//   listing: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Listing",
//     required: true
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   fullName: String,
//   email: String,
//   phone: String,
//   amount: Number,
//   duration: String, // format: "2025-04-10 to 2025-04-12"
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });



const paymentSchema = new mongoose.Schema({
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    fullName: String,
    email: String,
    phone: String,
    amount: Number,
    duration: String,
  });
  














module.exports = mongoose.model("Payment", paymentSchema);
