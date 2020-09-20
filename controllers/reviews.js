const Review = require("../models/review");
const Comment = require("../models/comment");
const moment = require("moment")

module.exports = function (app) {
  app.get("/", (req, res) => {
    Review.find()
      .then((reviews) => {
        res.render("reviews-index", { reviews: reviews });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.get("/reviews/new", (req, res) => {
    res.render("reviews-new", { title: "New Review" });
  });

  app.post("/reviews", (req, res) => {
    Review.create(req.body)
      .then((review) => {
        res.redirect(`/reviews/${review._id}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  app.get("/reviews/:id", (req, res) => {
    Review.findById(req.params.id)
      .then((review) => {
        let createdAt = review.createdAt;
        createdAt = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
        review.createdAtFormatted = createdAt;

        Comment.find({ reviewId: req.params.id }).then((comments) => {
          comments.reverse();
          res.render("reviews-show", { review: review, comments: comments });
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  app.get("/reviews/:id/edit", (req, res) => {
    Review.findById(req.params.id).then((review) => {
      res.render("reviews-edit", { review: review, title: "Edit Review" });
    });
  });

  app.put("/reviews/:id", (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
      .then((review) => {
        res.redirect(`/reviews/${review._id}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  app.delete("/reviews/:id", (req, res) => {
    console.log("Delete review");
    Review.findByIdAndDelete(req.params.id)
      .then((review) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
};
