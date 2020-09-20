const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  title: String,
  movieTitle: String,
  description: String,
}, {
  timestamps: true,
})

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
